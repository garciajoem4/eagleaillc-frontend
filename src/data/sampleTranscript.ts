// Sample transcript data based on output_aug.json structure
export interface TranscriptData {
  file_name: string;
  file_path: string;
  duration_seconds: number;
  date_uploaded: string;
  sample_rate: number;
  is_longform: boolean;
  was_stereo: boolean;
  full_transcription?: string;
  segments?: TranscriptSegment[];
}

export interface TranscriptSegment {
  segments_id: number;
  start: number;
  end: number;
  text: string;
  speaker?: string;
  confidence?: number;
}

export const sampleTranscriptData: TranscriptData = {
  file_name: "audio.wav",
  file_path: "audio.wav",
  duration_seconds: 900,
  date_uploaded: '',
  sample_rate: 16000,
  is_longform: true,
  was_stereo: false,
  full_transcription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  segments: [
    {
      segments_id: 0,
      start: 34.4,
      end: 38.800000000000004,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 1,
      start: 39.12,
      end: 42.0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 2,
      start: 46.800000000000004,
      end: 49.04,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 3,
      start: 64.0,
      end: 65.12,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 4,
      start: 72.08,
      end: 73.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 5,
      start: 75.84,
      end: 78.16,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 6,
      start: 79.92,
      end: 80.64,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 7,
      start: 80.8,
      end: 81.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 8,
      start: 82.08,
      end: 83.04,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 9,
      start: 83.28,
      end: 83.68,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 10,
      start: 86.48,
      end: 87.60000000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 11,
      start: 88.88,
      end: 93.04,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 12,
      start: 93.44,
      end: 93.84,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 13,
      start: 94.88,
      end: 96.4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 14,
      start: 97.68,
      end: 99.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 15,
      start: 100.0,
      end: 100.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 16,
      start: 101.60000000000001,
      end: 102.88,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 17,
      start: 103.84,
      end: 105.44,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 18,
      start: 106.88,
      end: 108.0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 19,
      start: 108.56,
      end: 110.4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 20,
      start: 110.88,
      end: 111.68,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 21,
      start: 112.16,
      end: 112.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 22,
      start: 113.60000000000001,
      end: 113.92,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 23,
      start: 114.96000000000001,
      end: 115.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 24,
      start: 115.84,
      end: 116.16,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 25,
      start: 117.04,
      end: 118.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 26,
      start: 118.32000000000001,
      end: 118.72,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 27,
      start: 118.88,
      end: 119.12,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 28,
      start: 122.64,
      end: 123.12,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 29,
      start: 123.44,
      end: 123.68,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 30,
      start: 124.0,
      end: 124.4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 31,
      start: 128.16,
      end: 132.0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 32,
      start: 132.08,
      end: 133.6,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 33,
      start: 133.92000000000002,
      end: 134.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 34,
      start: 136.32,
      end: 136.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 35,
      start: 136.64000000000001,
      end: 140.32,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 36,
      start: 140.56,
      end: 143.6,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 37,
      start: 143.92000000000002,
      end: 146.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 38,
      start: 146.56,
      end: 147.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 39,
      start: 148.4,
      end: 149.68,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 40,
      start: 150.0,
      end: 154.8,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 41,
      start: 155.6,
      end: 157.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 42,
      start: 159.36,
      end: 160.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 43,
      start: 160.8,
      end: 161.12,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 44,
      start: 163.04,
      end: 163.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 45,
      start: 163.76,
      end: 164.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 46,
      start: 164.48,
      end: 166.88,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 47,
      start: 167.92000000000002,
      end: 168.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 48,
      start: 168.72,
      end: 170.16,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 49,
      start: 172.56,
      end: 178.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 50,
      start: 178.48,
      end: 179.44,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 51,
      start: 179.76,
      end: 180.96,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 52,
      start: 181.76,
      end: 182.96,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 53,
      start: 183.20000000000002,
      end: 189.04,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 54,
      start: 191.44,
      end: 193.92000000000002,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 55,
      start: 194.88,
      end: 197.52,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 56,
      start: 197.68,
      end: 198.48000000000002,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 57,
      start: 199.04,
      end: 200.16,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 58,
      start: 200.56,
      end: 201.20000000000002,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 59,
      start: 203.44,
      end: 205.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 60,
      start: 205.52,
      end: 210.64000000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 61,
      start: 210.8,
      end: 214.72,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 62,
      start: 214.8,
      end: 219.20000000000002,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 63,
      start: 219.52,
      end: 219.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 64,
      start: 220.64000000000001,
      end: 221.36,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 65,
      start: 221.6,
      end: 222.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 66,
      start: 225.28,
      end: 226.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 67,
      start: 227.36,
      end: 228.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 68,
      start: 229.92000000000002,
      end: 230.88,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 69,
      start: 231.12,
      end: 232.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 70,
      start: 232.32,
      end: 233.44,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 71,
      start: 233.6,
      end: 234.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 72,
      start: 234.8,
      end: 242.8,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 73,
      start: 244.72,
      end: 247.76000000000002,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 74,
      start: 248.88,
      end: 251.36,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 75,
      start: 256.8,
      end: 257.2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 76,
      start: 257.44,
      end: 258.4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 77,
      start: 266.8,
      end: 268.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 78,
      start: 268.8,
      end: 270.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 79,
      start: 273.2,
      end: 274.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 80,
      start: 274.48,
      end: 275.2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 81,
      start: 278.48,
      end: 279.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 82,
      start: 280.0,
      end: 280.8,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 83,
      start: 281.44,
      end: 282.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 84,
      start: 282.88,
      end: 284.64,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 85,
      start: 285.92,
      end: 288.64,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 86,
      start: 288.88,
      end: 292.72,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 87,
      start: 295.52,
      end: 296.72,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 88,
      start: 297.2,
      end: 298.32,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 89,
      start: 300.4,
      end: 319.36,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 90,
      start: 321.12,
      end: 326.88,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 91,
      start: 328.4,
      end: 331.04,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 92,
      start: 332.64,
      end: 334.0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 93,
      start: 335.84000000000003,
      end: 340.72,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 94,
      start: 344.88,
      end: 345.12,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 95,
      start: 345.92,
      end: 346.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 96,
      start: 346.56,
      end: 346.8,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 97,
      start: 347.52,
      end: 348.0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 98,
      start: 349.04,
      end: 349.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 99,
      start: 354.0,
      end: 354.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 100,
      start: 355.36,
      end: 362.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 101,
      start: 362.8,
      end: 364.96000000000004,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 102,
      start: 365.28,
      end: 370.64,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 103,
      start: 370.88,
      end: 372.72,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 104,
      start: 373.12,
      end: 373.6,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 105,
      start: 374.24,
      end: 374.8,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 106,
      start: 375.76,
      end: 380.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 107,
      start: 381.12,
      end: 383.92,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 108,
      start: 384.08,
      end: 387.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 109,
      start: 387.92,
      end: 390.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 110,
      start: 390.56,
      end: 391.84000000000003,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 111,
      start: 395.04,
      end: 397.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 112,
      start: 397.92,
      end: 400.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 113,
      start: 400.88,
      end: 401.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 114,
      start: 401.76,
      end: 402.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 115,
      start: 403.44,
      end: 403.68,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 116,
      start: 403.84000000000003,
      end: 416.4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 117,
      start: 416.72,
      end: 422.32,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 118,
      start: 422.48,
      end: 423.2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 119,
      start: 423.36,
      end: 423.92,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 120,
      start: 424.8,
      end: 425.12,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 121,
      start: 428.0,
      end: 428.4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 122,
      start: 428.48,
      end: 429.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 123,
      start: 430.0,
      end: 432.96000000000004,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 124,
      start: 433.52,
      end: 433.84000000000003,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 125,
      start: 433.92,
      end: 441.68,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 126,
      start: 442.8,
      end: 454.08000000000004,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 127,
      start: 455.28,
      end: 459.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 128,
      start: 460.8,
      end: 463.44,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 129,
      start: 464.8,
      end: 470.64,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 130,
      start: 472.0,
      end: 476.08000000000004,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 131,
      start: 476.32,
      end: 480.88,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 132,
      start: 481.76,
      end: 489.92,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 133,
      start: 491.52,
      end: 495.03999999999996,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 134,
      start: 495.68,
      end: 500.96000000000004,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 135,
      start: 501.6,
      end: 505.52,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 136,
      start: 506.0,
      end: 508.72,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 137,
      start: 509.03999999999996,
      end: 513.84,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 138,
      start: 514.72,
      end: 518.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 139,
      start: 519.04,
      end: 520.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 140,
      start: 521.28,
      end: 526.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 141,
      start: 527.12,
      end: 528.72,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 142,
      start: 528.88,
      end: 529.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 143,
      start: 530.64,
      end: 533.44,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 144,
      start: 533.84,
      end: 541.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 145,
      start: 542.72,
      end: 550.8,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 146,
      start: 551.36,
      end: 553.44,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 147,
      start: 553.6800000000001,
      end: 555.6800000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 148,
      start: 556.8,
      end: 562.0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 149,
      start: 563.84,
      end: 564.4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 150,
      start: 565.2,
      end: 571.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 151,
      start: 571.9200000000001,
      end: 572.96,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 152,
      start: 573.76,
      end: 575.12,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 153,
      start: 575.76,
      end: 582.88,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 154,
      start: 584.1600000000001,
      end: 594.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 155,
      start: 595.44,
      end: 598.0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 156,
      start: 602.0,
      end: 608.16,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 157,
      start: 609.12,
      end: 618.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 158,
      start: 619.04,
      end: 619.44,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 159,
      start: 619.76,
      end: 621.84,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 160,
      start: 623.12,
      end: 644.96,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 161,
      start: 645.2,
      end: 654.64,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 162,
      start: 654.96,
      end: 658.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 163,
      start: 658.8,
      end: 665.2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 164,
      start: 665.6800000000001,
      end: 671.36,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 165,
      start: 671.6800000000001,
      end: 680.8,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 166,
      start: 681.12,
      end: 687.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 167,
      start: 687.84,
      end: 691.6800000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 168,
      start: 691.92,
      end: 694.8,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 169,
      start: 696.08,
      end: 696.96,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 170,
      start: 697.04,
      end: 699.44,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 171,
      start: 700.32,
      end: 701.6,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 172,
      start: 702.56,
      end: 711.2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 173,
      start: 711.84,
      end: 731.52,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 174,
      start: 732.0,
      end: 733.36,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 175,
      start: 733.52,
      end: 734.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 176,
      start: 735.28,
      end: 736.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 177,
      start: 736.64,
      end: 738.08,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 178,
      start: 738.96,
      end: 752.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 179,
      start: 753.6,
      end: 761.52,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 180,
      start: 762.4,
      end: 777.6800000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 181,
      start: 779.04,
      end: 787.52,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 182,
      start: 787.76,
      end: 795.04,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 183,
      start: 797.04,
      end: 806.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 184,
      start: 807.2,
      end: 816.0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 185,
      start: 820.64,
      end: 824.16,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 186,
      start: 824.4,
      end: 825.2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 187,
      start: 825.52,
      end: 826.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 188,
      start: 827.04,
      end: 831.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 189,
      start: 831.6,
      end: 831.76,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 190,
      start: 832.0,
      end: 847.2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 191,
      start: 848.16,
      end: 862.56,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 192,
      start: 863.04,
      end: 865.36,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 193,
      start: 865.52,
      end: 866.1600000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 194,
      start: 866.4,
      end: 869.28,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 195,
      start: 869.6,
      end: 869.9200000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 196,
      start: 870.1600000000001,
      end: 870.3199999999999,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 197,
      start: 872.24,
      end: 874.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 198,
      start: 874.96,
      end: 878.24,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 199,
      start: 884.56,
      end: 885.9200000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 200,
      start: 886.0799999999999,
      end: 886.96,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 201,
      start: 887.12,
      end: 888.48,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 202,
      start: 888.72,
      end: 889.6,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      segments_id: 203,
      start: 889.6800000000001,
      end: 893.6800000000001,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    }
  ]
};
