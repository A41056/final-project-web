import React from "react";
import ProductCard from "@/components/ProductCard";
import { ProductCardData } from "@/types/product";

interface RelatedProductsProps {
  relatedProducts: ProductCardData[];
  isLoading: boolean;
  error: Error | null;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
  isLoading,
  error,
}) => {
  return (
    <div className="you-might-also-like-group w-full">
      <p className="text-5xl font-bold text-center mb-6">You might also like</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <p className="text-center">Loading related products...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            Error loading related products: {error.message}
          </p>
        ) : (
          relatedProducts.map((product, index) => (
            <ProductCard
              key={index}
              id={product.id}
              img={product.img}
              name={product.name}
              rating={product.rating}
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercent={product.discountPercent}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
