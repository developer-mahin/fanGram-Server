export type TAddonCost = {
  remove_logo?: number;
  hd_video?: number;
};

export type TOffer = {
  freeDm?: boolean;
  discount?: number;
  couponCode?: string;
  dmDiscount?: number;
};

export type TFaq = {
  question: string;
  answer: string;
  isDeleted?: boolean;
};

export type TCelebrity = {
  celebrityName: string;
  bookingPrice: number;
  meetingPrice?: number;
  addonCost?: TAddonCost;
  offers?: TOffer;
  featured: boolean;
  faq: TFaq[];
  responseIn: string;
  imgUrl?: string;
  videoUrl?: string;
  verified: boolean;
  hashtag: string[];
  rating: number;
  isDeleted: boolean;
};
