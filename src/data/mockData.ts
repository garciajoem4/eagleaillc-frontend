import { Recording } from '../types';

export const mockRecordings: Recording[] = [
  {
    id: '1',
    name: 'Weekly Team Meeting',
    dateUploaded: new Date('2024-01-15').toISOString(),
    duration: 45,
    overview: 'Discussion of project progress and upcoming milestones',
    transcript: 'Welcome everyone to our weekly team meeting...',
    intelligence: {
      keyTopics: ['Project Updates', 'Timeline', 'Budget'],
      sentiment: 'Positive',
      actionItems: ['Review budget proposal', 'Schedule client meeting']
    },
    exports: ['PDF', 'DOCX']
  },
  {
    id: '2',
    name: 'Client Presentation',
    dateUploaded: new Date('2024-01-18').toISOString(),
    duration: 120,
    overview: 'Product demonstration for potential client',
    transcript: 'Good morning, thank you for joining us today...',
    intelligence: {
      keyTopics: ['Product Demo', 'Pricing', 'Features'],
      sentiment: 'Neutral',
      actionItems: ['Send pricing proposal', 'Follow up next week']
    },
    exports: ['PDF']
  },
  {
    id: '3',
    name: 'Training Session',
    dateUploaded: new Date('2024-01-22').toISOString(),
    duration: 90,
    overview: 'New employee onboarding and system training',
    transcript: 'Welcome to the company training session...',
    intelligence: {
      keyTopics: ['Onboarding', 'System Training', 'Policies'],
      sentiment: 'Positive',
      actionItems: ['Complete training modules', 'Set up accounts']
    },
    exports: ['PDF', 'DOCX', 'TXT']
  },
  {
    id: '4',
    name: 'Board Meeting Q4',
    dateUploaded: new Date('2024-01-25').toISOString(),
    duration: 180,
    overview: 'Quarterly board meeting discussing financials and strategy',
    transcript: 'Good afternoon board members...',
    intelligence: {
      keyTopics: ['Financial Review', 'Strategy', 'Q1 Planning'],
      sentiment: 'Professional',
      actionItems: ['Approve budget', 'Review strategic plan']
    },
    exports: ['PDF']
  },
  {
    id: '5',
    name: 'Developer Standup',
    dateUploaded: new Date('2024-01-28').toISOString(),
    duration: 30,
    overview: 'Daily development team standup meeting',
    transcript: 'Good morning team, let\'s start with yesterday\'s progress...',
    intelligence: {
      keyTopics: ['Sprint Progress', 'Blockers', 'Code Review'],
      sentiment: 'Positive',
      actionItems: ['Fix deployment issue', 'Review PR #123']
    },
    exports: ['TXT']
  }
];
