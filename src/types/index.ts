export interface FlashCard {
  id: number;
  front: string;
  back: string;
}

export interface StudySet {
  id: number;
  title: string;
  description: string;
  cards: FlashCard[];
  author: string;
  studyCount: number;
  likes: number;
  isLiked: boolean;
}

export interface Friend {
  id: number;
  name: string;
  username: string;
  avatar: string;
  studySets: number;
  status: 'online' | 'offline';
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
}
