// Transformed sample data to match the API structure
import { ApiResponse, ApiTranscriptSegment } from '../types/api';

export const sampleApiResponse: ApiResponse = {
  recording: {
    id: "sample-recording-123",
    file_name: "july_12_2022_audio_converted.wav",
    duration_seconds: 8931.328,
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
    processing_time_seconds: 120
  },
  transcript: {
    segments: [
      {
        segment_idx: 0,
        start_sec: 34.4,
        end_sec: 38.8,
        text: "We got a lot going on tonight because we've got a lot of stuff.",
        speaker_label: null
      },
      {
        segment_idx: 1,
        start_sec: 39.12,
        end_sec: 42.0,
        text: "So what's going on?",
        speaker_label: null
      },
      {
        segment_idx: 2,
        start_sec: 46.8,
        end_sec: 49.04,
        text: "There's five board members.",
        speaker_label: null
      },
      {
        segment_idx: 3,
        start_sec: 64.0,
        end_sec: 65.12,
        text: "You're on mute.",
        speaker_label: null
      },
      {
        segment_idx: 4,
        start_sec: 72.08,
        end_sec: 73.28,
        text: "So, how are they going to hear me?",
        speaker_label: null
      }
      // Note: Including only first 5 segments for brevity in transformation
      // In real implementation, all segments would be included
    ],
    total_segments: 5, // In reality this would be the full count
    duration_seconds: 8931.328,
    full_transcription: `We got a lot going on tonight because we've got a lot of stuff. So what's going on? There's five board members. You're on mute. So, how are they going to hear me? You can hear you from here. I can hear now. Hello, everyone. Hello, everybody. Hi, okay. Was everyone here? So can we call the meeting in order? Absolutely. Looks like I'm in charge. Yeah, Heidi evidently is not here. Oh, okay. I get the honors. But can we get started? Okay, I'll do roll call. It's really more of a sound check. Richard? Here. Okay. Ken? Here. Rolando here. Dan? Here. Heidi. Yeah. Not here. Hey, Ken, can you turn on the mic in front of you? It says Haley on it. Okay. Okay. Yeah, I'm using a shared mic right now. Can you hear me without mic? I've got the central mic here. Can you hear me? Yeah, I can hear you. Okay, because if I turn this on, might have feedback. Oh, yeah, no, it's better the other way. Better the other way. Okay. All right. Thanks. Okay, I'd like to welcome everybody out. Bear with me. First time I've done this. We have a consent idea. So let's get started. I just wanted to welcome everybody. Yeah, all the new people. We got some new people that have never attended meeting before. It'd be interesting to introduce them. So I actually forgot your name. That's okay now. I'm Mandy Danny. This is my husband. 3475 Christian Valley. Moved in about 11 months ago and wanting to learn about what happened. I've never been part of a CSD and I didn't know what to expect to expect. So I just kind of sit back and finally observe and learn.`
  },
  intelligence: {
    summary: "This appears to be a board meeting recording for a Community Services District (CSD). The meeting includes roll call, introductions of new community members, and discussion of various operational items including water system maintenance, rate studies, and administrative matters. Key participants include board members Ken, Richard, Rolando, Dan, and mentions of Heidi who was absent. The meeting covers routine business items, financial audits, contractor proposals, and community engagement initiatives.",
    actions: [
      {
        task: "Conduct rate study evaluation",
        assigned_to: "Catherine Hansford",
        priority: "high",
        timestamp_start: "15:30",
        timestamp_end: "18:45"
      },
      {
        task: "Review contractor proposals for maintenance operations",
        assigned_to: "Board members",
        priority: "high", 
        timestamp_start: "45:20",
        timestamp_end: "52:30"
      },
      {
        task: "Schedule follow-up meetings with selected contractors",
        assigned_to: "Don (General Manager)",
        priority: "medium",
        timestamp_start: "48:15",
        timestamp_end: "49:30"
      }
    ],
    decisions: [
      {
        decision: "Approve Fletcher and Company single audit proposal for $14,000",
        rationale: "Lowest bid among qualified auditors, required for federal funding compliance",
        timestamp_start: "35:45",
        timestamp_end: "38:20"
      },
      {
        decision: "Postpone survey discussion to next month for proper board input",
        rationale: "Need full board participation and proper agenda procedures",
        timestamp_start: "25:10", 
        timestamp_end: "28:45"
      }
    ],
    issues: [
      {
        issue: "Aging water pipeline infrastructure from 1962",
        severity: "high",
        description: "60-year-old asbestos concrete pipes showing signs of deterioration, costly repairs needed",
        timestamp_start: "52:30",
        timestamp_end: "55:20"
      },
      {
        issue: "Audio quality problems during remote meetings",
        severity: "medium",
        description: "Difficulty hearing participants, need better microphone equipment",
        timestamp_start: "58:45",
        timestamp_end: "59:30"
      }
    ],
    questions: [
      {
        question: "What is the timeline for completing the rate study process?",
        context: "Board member inquiry about Catherine Hansford's rate study timeline",
        timestamp_start: "18:20",
        timestamp_end: "19:15"
      },
      {
        question: "Should we wait for PCWA consolidation decision before doing rate study?",
        context: "Discussion about timing of rate study versus consolidation evaluation",
        timestamp_start: "22:30",
        timestamp_end: "24:10"
      }
    ],
    topics: [
      "Rate Studies", 
      "Water System Maintenance", 
      "Contractor Selection", 
      "Board Meeting Procedures", 
      "PCWA Consolidation", 
      "Financial Audits",
      "Community Engagement",
      "Infrastructure Planning"
    ]
  }
};

// Utility function to convert old format to new API format
export function convertLegacyToApiFormat(legacyData: any): ApiResponse {
  const segments: ApiTranscriptSegment[] = legacyData.segments?.map((segment: any, index: number) => ({
    segment_idx: index,
    start_sec: segment.start,
    end_sec: segment.end,
    text: segment.text,
    speaker_label: segment.speaker || null
  })) || [];

  return {
    recording: {
      id: `legacy-${Date.now()}`,
      file_name: legacyData.file_name || 'unknown.wav',
      duration_seconds: legacyData.duration_seconds || 0,
      created_at: legacyData.date_uploaded || new Date().toISOString(),
      completed_at: new Date().toISOString(),
      processing_time_seconds: 60
    },
    transcript: {
      segments,
      total_segments: segments.length,
      full_transcription: legacyData.full_transcription,
      duration_seconds: legacyData.duration_seconds || 0,
    },
    intelligence: {
      summary: "",
      actions: [],
      decisions: [],
      issues: [],
      questions: [],
      topics: []
    }
  };
}