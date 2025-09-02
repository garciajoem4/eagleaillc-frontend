# Upload Feature Documentation

## Overview
The upload feature allows users to add recordings to their library through multiple methods:

### 📁 File Upload
- **Supported formats**: MP3, MP4, MOV, AVI, WMV, FLV, WebM
- **File size limit**: 500MB per file
- **Multiple files**: Supported
- **Drag & drop**: Enabled
- **Progress tracking**: Real-time upload progress

### 🔗 URL Import
- Import recordings directly from URLs
- Supports direct links to audio/video files
- Automatic metadata extraction

### 🔍 Context7 Integration
- Query documentation and code repositories
- Convert Context7 responses into searchable recordings
- Access to project-specific documentation

## Technical Implementation

### Components Created:

1. **`useFileUpload` Hook** (`/src/hooks/useFileUpload.ts`)
   - Handles file validation, upload progress, and state management
   - Supports multiple files and error handling
   - Configurable file types and size limits

2. **`FileUpload` Component** (`/src/components/ui/file-upload.tsx`)
   - Drag-and-drop interface
   - File type validation with visual feedback
   - Progress bars and status indicators
   - Retry mechanism for failed uploads

3. **`UploadModal` Component** (`/src/components/ui/upload-modal.tsx`)
   - Tabbed interface for different upload methods
   - Integration with Context7 service
   - Form validation and submission handling

4. **`Context7Service`** (`/src/services/context7Service.ts`)
   - API integration with Context7 MCP server
   - Project search and documentation queries
   - Connection testing and error handling

### Context7 MCP Server
- **URL**: `http://localhost:3001/mcp`
- **Methods**: search, query, info, ping
- **Transport**: HTTP with SSE support

## Usage

### Starting the Development Environment:
```bash
# Start React app
npm start

# Start Context7 MCP server (separate terminal)
context7-mcp --transport http --port 3001
```

### Upload Process:
1. Click "📤 Upload Recording" button
2. Choose upload method:
   - **File Upload**: Drag files or click to browse
   - **URL Import**: Paste direct file URL
   - **Context7**: Query documentation
3. Monitor upload progress
4. Files automatically appear in recordings list

### File Validation:
- File type checking (audio/video only)
- Size limit enforcement (500MB)
- Error messages for invalid files
- Retry mechanism for failed uploads

## Integration Points

### Recordings Page Updates:
- Upload button opens modal
- New recordings added to state
- Real-time list updates
- Improved file management

### State Management:
- Uses React hooks for local state
- File upload progress tracking
- Error handling and user feedback
- Integration with existing recording data

## Future Enhancements
- Cloud storage integration (AWS S3, Google Cloud)
- Audio/video transcription services
- Batch processing capabilities
- Advanced metadata extraction
- AI-powered content analysis
