import React from "react";
import ProductCard from "@/components/ProductCard";
import { catalogApi } from "@/config/api";
import { Product } from "@/types/product";
import { ProductCardData } from "@/types/product";

interface RelatedProductsProps {
  productId: string;
}

const mapProductToCardData = (product: Product): ProductCardData => ({
  id: product.id.toString(),
  img: product.imageFiles?.[0] || "",
  name: product.name,
  rating: product.averageRating || 0,
  price: String(product.variants?.[0]?.price || 0),
  originalPrice: product.variants?.[0]?.price || 0,
  discountPercent: 0,
});

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
  const { data, isLoading, error } = catalogApi.useGet<{
    products: Product[];
    totalItems: number;
  }>(`/products/${productId}/related`);

  const relatedProducts: ProductCardData[] = React.useMemo(() => {
    if (!data?.products) return [];
    return data.products.map(mapProductToCardData);
  }, [data]);

  return (
    <div className="you-might-also-like-group w-full">
      <p className="text-5xl font-bold text-center mb-6">You might also like</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <p className="text-center">Loading related products...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            Error loading related products: {(error as Error).message}
          </p>
        ) : (
          relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              img={product.img}
              name={product.name}
              rating={product.rating}
              price={Number(product.price)}
              originalPrice={Number(product.originalPrice)}
              discountPercent={Number(product.discountPercent)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;