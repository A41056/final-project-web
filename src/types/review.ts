export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  reviewerName: string;
  isVerified: boolean;
  comment: string;
  created: string;
}
