export interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'text' | 'photo' | 'video';
  photos?: string[];
}

export interface Memorial {
  id?: string;
  petName: string;
  petType: string;
  dateOfBirth?: string;
  dateOfPassing: string;
  photos: string[];
  memories: Memory[];
  isPublic: boolean;
  createdAt: Date;
}