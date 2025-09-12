import { useCallback } from 'react';
import { DetailedIntelligence } from '../types';

interface TranscriptData {
  full_transcription?: string;
  segments?: Array<{
    start: number;
    end: number;
    text: string;
    speaker?: string;
  }>;
  duration_seconds: number;
  file_name: string;
}

export const useRecordingUtils = (
  sampleTranscriptData: TranscriptData,
  detailedIntelligence: DetailedIntelligence | null
) => {
  // Utility functions for timestamp handling
  const parseTimestampToSeconds = useCallback((timestamp: string): number => {
    const parts = timestamp.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const seconds = parseFloat(parts[2]);
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  }, []);

  const isItemActiveAtTime = useCallback((startTimestamp: string, endTimestamp: string, currentTime: number): boolean => {
    const startTime = parseTimestampToSeconds(startTimestamp);
    const endTime = parseTimestampToSeconds(endTimestamp);
    return currentTime >= startTime && currentTime <= endTime;
  }, [parseTimestampToSeconds]);

  // Export utility functions
  const downloadFile = useCallback((content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const formatTimestamp = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Export functions for transcript
  const exportTranscriptData = useCallback((type: 'full-segments' | 'full-only' | 'segments-only', format: 'pdf' | 'json' | 'csv' | 'txt') => {
    const timestamp = new Date().toISOString().split('T')[0];
    let content = '';
    let fileName = `transcript-${type}-${timestamp}`;
    let mimeType = 'text/plain';

    if (format === 'json') {
      let data: any = {};
      
      if (type === 'full-segments') {
        data = {
          full_transcription: sampleTranscriptData.full_transcription,
          segments: sampleTranscriptData.segments,
          duration_seconds: sampleTranscriptData.duration_seconds,
          file_name: sampleTranscriptData.file_name
        };
      } else if (type === 'full-only') {
        data = {
          full_transcription: sampleTranscriptData.full_transcription,
          duration_seconds: sampleTranscriptData.duration_seconds,
          file_name: sampleTranscriptData.file_name
        };
      } else if (type === 'segments-only') {
        data = {
          segments: sampleTranscriptData.segments,
          duration_seconds: sampleTranscriptData.duration_seconds,
          file_name: sampleTranscriptData.file_name
        };
      }
      
      content = JSON.stringify(data, null, 2);
      fileName += '.json';
      mimeType = 'application/json';
    } else if (format === 'csv') {
      if (type === 'segments-only' || type === 'full-segments') {
        content = 'Start Time,End Time,Speaker,Text\n';
        sampleTranscriptData.segments?.forEach(segment => {
          const startTime = formatTimestamp(segment.start);
          const endTime = formatTimestamp(segment.end);
          const text = segment.text.replace(/"/g, '""'); // Escape quotes
          content += `"${startTime}","${endTime}","${segment.speaker || 'Unknown'}","${text}"\n`;
        });
      } else {
        content = 'Content\n';
        content += `"${sampleTranscriptData.full_transcription?.replace(/"/g, '""') || 'No transcript available'}"`;
      }
      fileName += '.csv';
      mimeType = 'text/csv';
    } else if (format === 'txt') {
      if (type === 'full-segments') {
        content = `Transcript: ${sampleTranscriptData.file_name}\n`;
        content += `Duration: ${Math.floor(sampleTranscriptData.duration_seconds / 60)}m ${Math.floor(sampleTranscriptData.duration_seconds % 60)}s\n\n`;
        content += '=== FULL TRANSCRIPTION ===\n\n';
        content += sampleTranscriptData.full_transcription || 'No transcript available';
        content += '\n\n=== SEGMENTS ===\n\n';
        sampleTranscriptData.segments?.forEach(segment => {
          content += `[${formatTimestamp(segment.start)} - ${formatTimestamp(segment.end)}] ${segment.speaker || 'Unknown'}: ${segment.text}\n\n`;
        });
      } else if (type === 'full-only') {
        content = `Transcript: ${sampleTranscriptData.file_name}\n`;
        content += `Duration: ${Math.floor(sampleTranscriptData.duration_seconds / 60)}m ${Math.floor(sampleTranscriptData.duration_seconds % 60)}s\n\n`;
        content += sampleTranscriptData.full_transcription || 'No transcript available';
      } else if (type === 'segments-only') {
        content = `Transcript Segments: ${sampleTranscriptData.file_name}\n`;
        content += `Duration: ${Math.floor(sampleTranscriptData.duration_seconds / 60)}m ${Math.floor(sampleTranscriptData.duration_seconds % 60)}s\n\n`;
        sampleTranscriptData.segments?.forEach(segment => {
          content += `[${formatTimestamp(segment.start)} - ${formatTimestamp(segment.end)}] ${segment.speaker || 'Unknown'}: ${segment.text}\n\n`;
        });
      }
      fileName += '.txt';
    } else if (format === 'pdf') {
      // For now, we'll generate HTML content that can be printed as PDF
      let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Transcript Export</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
    .timestamp { color: #666; font-size: 0.9em; }
    .speaker { font-weight: bold; color: #333; }
    .segment { margin-bottom: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Transcript: ${sampleTranscriptData.file_name}</h1>
    <p>Duration: ${Math.floor(sampleTranscriptData.duration_seconds / 60)}m ${Math.floor(sampleTranscriptData.duration_seconds % 60)}s</p>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
  </div>`;

      if (type === 'full-segments') {
        htmlContent += '<h2>Full Transcription</h2>';
        htmlContent += `<p>${sampleTranscriptData.full_transcription || 'No transcript available'}</p>`;
        htmlContent += '<h2>Segments</h2>';
        sampleTranscriptData.segments?.forEach(segment => {
          htmlContent += `<div class="segment">
            <span class="timestamp">[${formatTimestamp(segment.start)} - ${formatTimestamp(segment.end)}]</span>
            <span class="speaker">${segment.speaker || 'Unknown'}:</span>
            ${segment.text}
          </div>`;
        });
      } else if (type === 'full-only') {
        htmlContent += '<h2>Full Transcription</h2>';
        htmlContent += `<p>${sampleTranscriptData.full_transcription || 'No transcript available'}</p>`;
      } else if (type === 'segments-only') {
        htmlContent += '<h2>Segments</h2>';
        sampleTranscriptData.segments?.forEach(segment => {
          htmlContent += `<div class="segment">
            <span class="timestamp">[${formatTimestamp(segment.start)} - ${formatTimestamp(segment.end)}]</span>
            <span class="speaker">${segment.speaker || 'Unknown'}:</span>
            ${segment.text}
          </div>`;
        });
      }

      htmlContent += '</body></html>';
      content = htmlContent;
      fileName += '.html';
      mimeType = 'text/html';
    }

    downloadFile(content, fileName, mimeType);
  }, [downloadFile, formatTimestamp, sampleTranscriptData]);

  // Export functions for intelligence analysis
  const exportIntelligenceData = useCallback((type: 'all' | 'action-items' | 'decisions' | 'issues' | 'questions', format: 'pdf' | 'json' | 'csv' | 'txt') => {
    const timestamp = new Date().toISOString().split('T')[0];
    let content = '';
    let fileName = `intelligence-${type}-${timestamp}`;
    let mimeType = 'text/plain';

    const getData = () => {
      switch (type) {
        case 'all':
          return {
            action_items: detailedIntelligence?.action_items || [],
            decisions: detailedIntelligence?.decisions || [],
            issues: detailedIntelligence?.issues || [],
            questions: detailedIntelligence?.questions || [],
            executive_summary: detailedIntelligence?.executive_summary,
            key_topics: detailedIntelligence?.key_topics || []
          };
        case 'action-items':
          return detailedIntelligence?.action_items || [];
        case 'decisions':
          return detailedIntelligence?.decisions || [];
        case 'issues':
          return detailedIntelligence?.issues || [];
        case 'questions':
          return detailedIntelligence?.questions || [];
        default:
          return [];
      }
    };

    const data = getData();

    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      fileName += '.json';
      mimeType = 'application/json';
    } else if (format === 'csv') {
      if (type === 'all') {
        content = 'Type,Item,Timestamp,Additional Info\n';
        
        (data as any).action_items?.forEach((item: any) => {
          content += `"Action Item","${item.task?.replace(/"/g, '""')}","${item.timestamp_start}","Assigned: ${item.assigned_to || 'N/A'}"\n`;
        });
        
        (data as any).decisions?.forEach((item: any) => {
          content += `"Decision","${item.decision?.replace(/"/g, '""')}","${item.timestamp_start}","Confidence: ${item.confidence}"\n`;
        });
        
        (data as any).issues?.forEach((item: any) => {
          content += `"Issue","${item.issue?.replace(/"/g, '""')}","${item.timestamp_start}",""\n`;
        });
        
        (data as any).questions?.forEach((item: any) => {
          content += `"Question","${item.question?.replace(/"/g, '""')}","${item.timestamp_start}",""\n`;
        });
      } else {
        if (type === 'action-items') {
          content = 'Task,Assigned To,Deadline,Timestamp,Confidence\n';
          (data as any[]).forEach((item: any) => {
            content += `"${item.task?.replace(/"/g, '""')}","${item.assigned_to || ''}","${item.deadline || ''}","${item.timestamp_start}","${item.confidence}"\n`;
          });
        } else if (type === 'decisions') {
          content = 'Decision,Reason,Timestamp,Confidence\n';
          (data as any[]).forEach((item: any) => {
            content += `"${item.decision?.replace(/"/g, '""')}","${item.reason?.replace(/"/g, '""') || ''}","${item.timestamp_start}","${item.confidence}"\n`;
          });
        } else if (type === 'issues') {
          content = 'Issue,Timestamp\n';
          (data as any[]).forEach((item: any) => {
            content += `"${item.issue?.replace(/"/g, '""')}","${item.timestamp_start}"\n`;
          });
        } else if (type === 'questions') {
          content = 'Question,Timestamp\n';
          (data as any[]).forEach((item: any) => {
            content += `"${item.question?.replace(/"/g, '""')}","${item.timestamp_start}"\n`;
          });
        }
      }
      fileName += '.csv';
      mimeType = 'text/csv';
    } else if (format === 'txt') {
      content = `Intelligence Analysis Export\nGenerated: ${new Date().toLocaleDateString()}\n\n`;
      
      if (type === 'all') {
        content += '=== EXECUTIVE SUMMARY ===\n\n';
        content += (data as any).executive_summary || 'No summary available';
        content += '\n\n=== KEY TOPICS ===\n\n';
        (data as any).key_topics?.forEach((topic: string) => {
          content += `• ${topic}\n`;
        });
        
        content += '\n\n=== ACTION ITEMS ===\n\n';
        (data as any).action_items?.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.task}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n`;
          if (item.assigned_to) content += `   Assigned to: ${item.assigned_to}\n`;
          if (item.deadline) content += `   Deadline: ${item.deadline}\n`;
          content += `   Confidence: ${item.confidence}\n\n`;
        });
        
        content += '=== DECISIONS ===\n\n';
        (data as any).decisions?.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.decision}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n`;
          if (item.reason) content += `   Reason: ${item.reason}\n`;
          content += `   Confidence: ${item.confidence}\n\n`;
        });
        
        content += '=== ISSUES ===\n\n';
        (data as any).issues?.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.issue}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n\n`;
        });
        
        content += '=== QUESTIONS ===\n\n';
        (data as any).questions?.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.question}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n\n`;
        });
      } else {
        const typeLabel = type.replace('-', ' ').toUpperCase();
        content += `=== ${typeLabel} ===\n\n`;
        
        (data as any[]).forEach((item: any, index: number) => {
          const itemText = item.task || item.decision || item.issue || item.question;
          content += `${index + 1}. ${itemText}\n`;
          content += `   Timestamp: ${item.timestamp_start}\n`;
          if (item.assigned_to) content += `   Assigned to: ${item.assigned_to}\n`;
          if (item.reason) content += `   Reason: ${item.reason}\n`;
          if (item.confidence) content += `   Confidence: ${item.confidence}\n`;
          content += '\n';
        });
      }
      
      fileName += '.txt';
    } else if (format === 'pdf') {
      // Generate HTML for PDF conversion
      let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Intelligence Analysis Export</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
    .section { margin-bottom: 30px; }
    .item { margin-bottom: 15px; padding: 10px; border-left: 4px solid #007bff; background: #f8f9fa; }
    .timestamp { color: #666; font-size: 0.9em; }
    .confidence { font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Intelligence Analysis</h1>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
  </div>`;

      if (type === 'all') {
        htmlContent += '<div class="section"><h2>Executive Summary</h2>';
        htmlContent += `<p>${(data as any).executive_summary || 'No summary available'}</p></div>`;
        
        htmlContent += '<div class="section"><h2>Key Topics</h2><ul>';
        (data as any).key_topics?.forEach((topic: string) => {
          htmlContent += `<li>${topic}</li>`;
        });
        htmlContent += '</ul></div>';
        
        // Add other sections...
        ['action_items', 'decisions', 'issues', 'questions'].forEach(section => {
          const sectionData = (data as any)[section];
          const sectionTitle = section.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
          
          htmlContent += `<div class="section"><h2>${sectionTitle}</h2>`;
          sectionData?.forEach((item: any, index: number) => {
            const itemText = item.task || item.decision || item.issue || item.question;
            htmlContent += `<div class="item">
              <p><strong>${index + 1}.</strong> ${itemText}</p>
              <p class="timestamp">Timestamp: ${item.timestamp_start}</p>
              ${item.confidence ? `<p class="confidence">Confidence: ${item.confidence}</p>` : ''}
            </div>`;
          });
          htmlContent += '</div>';
        });
      } else {
        const typeLabel = type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        htmlContent += `<div class="section"><h2>${typeLabel}</h2>`;
        
        (data as any[]).forEach((item: any, index: number) => {
          const itemText = item.task || item.decision || item.issue || item.question;
          htmlContent += `<div class="item">
            <p><strong>${index + 1}.</strong> ${itemText}</p>
            <p class="timestamp">Timestamp: ${item.timestamp_start}</p>
            ${item.confidence ? `<p class="confidence">Confidence: ${item.confidence}</p>` : ''}
          </div>`;
        });
        htmlContent += '</div>';
      }

      htmlContent += '</body></html>';
      content = htmlContent;
      fileName += '.html';
      mimeType = 'text/html';
    }

    downloadFile(content, fileName, mimeType);
  }, [downloadFile, detailedIntelligence]);

  return {
    parseTimestampToSeconds,
    isItemActiveAtTime,
    downloadFile,
    formatTimestamp,
    exportTranscriptData,
    exportIntelligenceData
  };
};
