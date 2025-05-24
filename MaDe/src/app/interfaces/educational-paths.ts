export interface EducationalPathsData {
  data: EducationalPath[];
  meta?: {
    total_count: number;
    filter_count: number;
  };
}

export interface EducationalPath {
  id: string;
  name: string;
  description: string;
  sort?: number;
  created_at?: string;
  updated_at?: string;
  user_created?: string;
  user_updated?: string;
  school?: string;
  details?: string;
  requirements?: string;
  outcomes?: string;
  links?: EducationalLink[];
}

export interface EducationalLink {
  url: string;
  name: string;
}
