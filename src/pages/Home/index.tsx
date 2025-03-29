import React from "react";
import { useQuery } from "react-query";
import { getTopHotProducts } from "@/services/productServices";
import { getReviewsByProductId } from "@/services/reviewServices";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { Review } from "@/types/review";

interface ProductWithRating extends Product {
  rating: number;
}

const Home = () => {
  // Lấy top hot products
  const { data: topHotProducts, isLoading: topHotLoading } = useQuery(
    ["topHotProducts"],
    () => getTopHotProducts(1, 4), // Lấy 4 sản phẩm
    {
      select: (products) => products,
    }
  );

  // Hàm tính rating trung bình
  const calculateAverageRating = (reviews: Review[]): number => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / reviews.length).toFixed(1));
  };

  // Lấy rating cho từng sản phẩm
  const { data: topHotProductsWithRating, isLoading: ratingLoading } = useQuery(
    ["topHotProductsWithRating", topHotProducts],
    async () => {
      if (!topHotProducts) return [];
      const productsWithRating = await Promise.all(
        topHotProducts.map(async (product) => {
          const reviews = await getReviewsByProductId(product.id);
          const rating = calculateAverageRating(reviews);
          return { ...product, rating };
        })
      );
      return productsWithRating;
    },
    {
      enabled: !!topHotProducts, // Chỉ chạy khi topHotProducts có giá trị
    }
  );

  return (
    <div>
      {/* Các phần khác của Home giữ nguyên */}
      <div className="wrapper_1">
        <div className="wrapper_2">
          <div className="wrapper_title">TOP HOT PRODUCTS</div>
          <div className="product-list" id="top-hot">
            {topHotLoading || ratingLoading ? (
              <p>Loading...</p>
            ) : (
              topHotProductsWithRating?.map((product) => (
                <ProductCard
                  key={product.id}
                  img={product.imageFiles[0]} // Ảnh đầu tiên
                  name={product.name}
                  rating={product.rating}
                  price={product.variants[0]?.price.toString() || "0"} // Giá từ variant đầu tiên
                />
              ))
            )}
          </div>
        </div>
        <div className="wrapper_3">
          <button className="view-all-button">
            <p>View All</p>
          </button>
        </div>
      </div>
      {/* Các phần khác của Home */}
    </div>
  );
};

export default Home;
