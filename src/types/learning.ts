export interface LearningSection {
  id: string;
  number: string;
  title: string;
  level: 'Makroskopis' | 'Submikroskopis' | 'Simbolik';
  description: string;
  keyTakeaway: string;
}

export interface ModuleItem {
  id: number;
  code: string;
  title: string;
  description: string;
  isAvailable: boolean;
  statusBadge: string;
  upcomingNote?: string;
  sections?: LearningSection[];
}

