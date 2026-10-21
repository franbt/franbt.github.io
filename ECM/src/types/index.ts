export type ChapterId = 
  | 'cover-foreword'
  | 'language-exchange'
  | 'vocational-pathways'
  | 'civic-spaces'
  | 'activity-directory';

export type ViewMode = 'spread' | 'single';

export interface HubNode {
  id: string;
  num: number;
  name: string;
  subtitle: string;
  location: string;
  ward: string;
  transit: string;
  focus: string;
  schedule: string;
  isOpenNow: boolean;
  xPercent: number; // For map positioning
  yPercent: number;
  badgeColorClass: string;
}

export interface VocationalTrack {
  id: string;
  trackNum: string;
  category: string;
  duration: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  syllabus: {
    week: string;
    topic: string;
    deliverable: string;
  }[];
}

export interface ExchangeModule {
  id: string;
  modNum: string;
  title: string;
  schedule: string;
  description: string;
  location: string;
  badgeColorClass: string;
  features: string[];
}

export interface DirectoryProgram {
  id: string;
  title: string;
  category: 'Language' | 'Vocational' | 'Civic Space' | 'Mutual Aid' | 'Youth & Senior';
  district: string;
  schedule: string;
  venue: string;
  transit: string;
  description: string;
  isAccessible: boolean;
  isFree: boolean;
}

export interface BookingSubmission {
  id: string;
  hubId: string;
  hubName: string;
  tier: 'Tier A (Multi-purpose Studio)' | 'Tier B (Teaching Kitchen)' | 'Tier C (Assembly Hall)';
  collectiveName: string;
  applicantName: string;
  applicantEmail: string;
  estimatedGuests: number;
  eventDate: string;
  timeSlot: string;
  principlesAgreed: boolean;
  badgeCode: string;
  createdAt: string;
}

export interface TandemSubmission {
  id: string;
  fullName: string;
  email: string;
  nativeTongue: string;
  learningLanguage: string;
  district: string;
  preferredVenue: string;
  hasChildcareNeed: boolean;
  hasAccessibilityNeed: boolean;
  badgeCode: string;
  createdAt: string;
}
