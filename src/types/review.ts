export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  reviewerName: string;
  isVerified: boolean;
  comment: string;
  created: string;
}
