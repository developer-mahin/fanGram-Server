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

export type TVideoUrl = {
  name?: string;
  path?: string;
};

export type TCelebrity = {
  id?: string;
  celebrityName: string;
  bookingPrice: number;
  meetingPrice?: number;
  addonCost?: TAddonCost;
  offers?: TOffer;
  featured: boolean;
  faq?: TFaq[];
  responseIn: string;
  earlyResponse: boolean;
  imgUrl?: string;
  videoUrl?: TVideoUrl[];
  verified: boolean;
  hashtag: string[];
  rating: number;
  isDeleted: boolean;
};
