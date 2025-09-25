// Audio Storage Service
// Handles local storage of audio files using IndexedDB for better performance with large files

interface StoredAudio {
  id: string;
  fileName: string;
  blob: Blob;
  mimeType: string;
  size: number;
  uploadDate: Date;
  lastAccessed: Date;
  metadata?: {
    duration?: number;
    transcriptId?: string;
    processed?: boolean;
  };
}

interface AudioStorageConfig {
  dbName: string;
  dbVersion: number;
  storeName: string;
  maxStorageSize: number; // in bytes
  maxRetentionDays: number;
}

class AudioStorageService {
  private config: AudioStorageConfig;
  private db: IDBDatabase | null = null;

  constructor(config?: Partial<AudioStorageConfig>) {
    this.config = {
      dbName: 'SynaptiVoiceAudioStorage',
      dbVersion: 1,
      storeName: 'audioFiles',
      maxStorageSize: 2 * 1024 * 1024 * 1024, // 2GB
      maxRetentionDays: 30,
      ...config,
    };
  }

  /**
   * Initialize the IndexedDB database
   */
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.dbName, this.config.dbVersion);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(this.config.storeName)) {
          const store = db.createObjectStore(this.config.storeName, { keyPath: 'id' });
          store.createIndex('fileName', 'fileName', { unique: false });
          store.createIndex('uploadDate', 'uploadDate', { unique: false });
          store.createIndex('lastAccessed', 'lastAccessed', { unique: false });
        }
      };
    });
  }

  /**
   * Store audio file locally
   */
  async storeAudio(
    id: string,
    file: File | Blob,
    fileName: string,
    metadata?: StoredAudio['metadata']
  ): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    // Check storage limits before storing
    await this.cleanupOldFiles();

    const storedAudio: StoredAudio = {
      id,
      fileName,
      blob: file,
      mimeType: file.type,
      size: file.size,
      uploadDate: new Date(),
      lastAccessed: new Date(),
      metadata,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.config.storeName], 'readwrite');
      const store = transaction.objectStore(this.config.storeName);
      const request = store.put(storedAudio);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to store audio file'));
    });
  }

  /**
   * Retrieve audio file from local storage
   */
  async getAudio(id: string): Promise<StoredAudio | null> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.config.storeName], 'readonly');
      const store = transaction.objectStore(this.config.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          // Update last accessed time
          this.updateLastAccessed(id);
          resolve(result);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => reject(new Error('Failed to retrieve audio file'));
    });
  }

  /**
   * Check if audio file exists locally
   */
  async hasAudio(id: string): Promise<boolean> {
    const audio = await this.getAudio(id);
    return audio !== null;
  }

  /**
   * Delete audio file from local storage
   */
  async deleteAudio(id: string): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.config.storeName], 'readwrite');
      const store = transaction.objectStore(this.config.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete audio file'));
    });
  }

  /**
   * Get all stored audio files metadata
   */
  async getAllAudioMetadata(): Promise<Omit<StoredAudio, 'blob'>[]> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.config.storeName], 'readonly');
      const store = transaction.objectStore(this.config.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result.map(({ blob, ...metadata }) => metadata);
        resolve(results);
      };

      request.onerror = () => reject(new Error('Failed to retrieve audio metadata'));
    });
  }

  /**
   * Get storage usage statistics
   */
  async getStorageStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    availableSpace: number;
    utilizationPercentage: number;
  }> {
    const metadata = await this.getAllAudioMetadata();
    const totalFiles = metadata.length;
    const totalSize = metadata.reduce((sum, audio) => sum + audio.size, 0);
    const availableSpace = this.config.maxStorageSize - totalSize;
    const utilizationPercentage = (totalSize / this.config.maxStorageSize) * 100;

    return {
      totalFiles,
      totalSize,
      availableSpace,
      utilizationPercentage,
    };
  }

  /**
   * Create blob URL for audio playback
   */
  async createAudioUrl(id: string): Promise<string | null> {
    const storedAudio = await this.getAudio(id);
    if (storedAudio) {
      return URL.createObjectURL(storedAudio.blob);
    }
    return null;
  }

  /**
   * Clean up old files based on retention policy
   */
  private async cleanupOldFiles(): Promise<void> {
    const metadata = await this.getAllAudioMetadata();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.config.maxRetentionDays);

    // Delete files older than retention period
    const filesToDelete = metadata.filter(
      audio => new Date(audio.lastAccessed) < cutoffDate
    );

    for (const file of filesToDelete) {
      await this.deleteAudio(file.id);
    }

    // If still over storage limit, delete least recently accessed files
    const stats = await this.getStorageStats();
    if (stats.totalSize > this.config.maxStorageSize) {
      const remainingFiles = await this.getAllAudioMetadata();
      const sortedByAccess = remainingFiles.sort(
        (a, b) => new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime()
      );

      let currentSize = stats.totalSize;
      for (const file of sortedByAccess) {
        if (currentSize <= this.config.maxStorageSize * 0.8) break; // Keep 20% buffer
        await this.deleteAudio(file.id);
        currentSize -= file.size;
      }
    }
  }

  /**
   * Update last accessed time for a file
   */
  private async updateLastAccessed(id: string): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction([this.config.storeName], 'readwrite');
    const store = transaction.objectStore(this.config.storeName);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const audio = getRequest.result;
      if (audio) {
        audio.lastAccessed = new Date();
        store.put(audio);
      }
    };
  }

  /**
   * Clear all stored audio files
   */
  async clearAll(): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.config.storeName], 'readwrite');
      const store = transaction.objectStore(this.config.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to clear audio storage'));
    });
  }
}

// Export singleton instance
export const audioStorageService = new AudioStorageService();
export type { StoredAudio, AudioStorageConfig };