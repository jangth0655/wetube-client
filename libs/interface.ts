export interface User {
  _id: string;
  email: string;
  username: string;
  passwor: string;
  name: string;
  location: string;
  avatarId: string;
  videos: Video[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
}

export interface Video {
  _id: string;
  url: string;
  title: string;
  description: string;
  createAt: Date;
  hashtags: string;
  meta: {
    views: number;
    rating: number;
  };
}
