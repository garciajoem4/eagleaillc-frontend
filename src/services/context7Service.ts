interface Context7Config {
  serverUrl: string;
  apiKey?: string;
}

interface Context7QueryResponse {
  content: string;
  sources: string[];
  confidence: number;
}

interface Context7Project {
  id: string;
  name: string;
  description: string;
  path: string;
}

class Context7Service {
  private config: Context7Config;

  constructor(config: Context7Config) {
    this.config = config;
  }

  /**
   * Search for projects in Context7
   */
  async searchProjects(searchTerm: string): Promise<Context7Project[]> {
    try {
      const response = await fetch(`${this.config.serverUrl}/mcp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify({
          method: 'search',
          params: {
            query: searchTerm
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Context7 search failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Context7 search error:', error);
      return [];
    }
  }

  /**
   * Query a specific project or general documentation
   */
  async query(projectIdentifier: string, query: string): Promise<Context7QueryResponse> {
    try {
      const response = await fetch(`${this.config.serverUrl}/mcp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify({
          method: 'query',
          params: {
            projectIdentifier,
            query,
            maxTokens: 5000
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Context7 query failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result || { content: '', sources: [], confidence: 0 };
    } catch (error) {
      console.error('Context7 query error:', error);
      throw error;
    }
  }

  /**
   * Get information about a specific project
   */
  async getProjectInfo(projectIdentifier: string): Promise<Context7Project | null> {
    try {
      const response = await fetch(`${this.config.serverUrl}/mcp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify({
          method: 'info',
          params: {
            projectIdentifier
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Context7 project info failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result || null;
    } catch (error) {
      console.error('Context7 project info error:', error);
      return null;
    }
  }

  /**
   * Test connection to Context7 server
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.serverUrl}/mcp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify({
          method: 'ping'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Context7 connection test failed:', error);
      return false;
    }
  }
}

// Create a singleton instance
const context7Service = new Context7Service({
  serverUrl: 'http://localhost:3001', // Default Context7 MCP server URL
  // apiKey can be added if required
});

export { Context7Service, context7Service };
export type { Context7Config, Context7QueryResponse, Context7Project };
