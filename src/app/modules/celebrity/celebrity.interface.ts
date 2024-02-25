export type TCelebrity = {
  celebrity_name: string;
  booking_price: number;
  meeting_price?: number;
  early_response: boolean;
  imgUrl?: string;
  videoUrl?: string;
  verified: boolean;
  hashtag: string[];
  rating: number;
  isDeleted: boolean;
};
