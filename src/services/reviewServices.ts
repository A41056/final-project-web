import { reviewApi } from "@/config/api";
import { Review } from "@/types/review";

export const getReviewsByProductId = async (
  productId: string
): Promise<Review[]> => {
  const response = await reviewApi.getReviewsByProductId(productId);
  return response.reviews;
};
