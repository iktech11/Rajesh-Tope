export type Language = 'mr' | 'en' | 'hi';

export interface Milestone {
  id: string;
  year: string;
  title: {
    mr: string;
    en: string;
    hi: string;
  };
  role: {
    mr: string;
    en: string;
    hi: string;
  };
  description: {
    mr: string;
    en: string;
    hi: string;
  };
  highlights?: {
    mr: string[];
    en: string[];
    hi: string[];
  };
  category: 'election' | 'ministry' | 'assembly' | 'leadership';
  image?: string;
}

export interface Portfolio {
  id: string;
  department: {
    mr: string;
    en: string;
    hi: string;
  };
  tenure: string;
  designation: {
    mr: string;
    en: string;
    hi: string;
  };
  description: {
    mr: string;
    en: string;
    hi: string;
  };
  keyInitiatives: {
    mr: string[];
    en: string[];
    hi: string[];
  };
  iconName: string;
}

export interface DevelopmentProject {
  id: string;
  title: {
    mr: string;
    en: string;
    hi: string;
  };
  category: 'roads' | 'water' | 'education' | 'health' | 'agriculture' | 'rural' | 'facilities' | 'social';
  village: string;
  taluka: string;
  year: string;
  status: 'Completed' | 'Ongoing' | 'Sanctioned';
  description: {
    mr: string;
    en: string;
    hi: string;
  };
  impact?: {
    mr: string;
    en: string;
    hi: string;
  };
  officialRef?: string;
}

export interface PublicConnectSubmission {
  id: string;
  refNo: string;
  fullName: string;
  mobile: string;
  village: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Under Review' | 'Action Taken' | 'Closed';
  adminNotes?: string;
}
