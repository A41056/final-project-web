import React, { useState } from "react";
import { Button, Pagination } from "antd";
import { useQuery } from "react-query";
import { catalogApi } from "@/config/api";
import { GetProductsResponse, Product, ProductCardData } from "@/types/product";
import { icons } from "../../assets/icons";
import ProductCard from "../ProductCard";

interface ProductListProps {
  slug: string;
}

const ProductList: React.FC<ProductListProps> = ({ slug }) => {
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const { data, isLoading } = catalogApi.useGet<GetProductsResponse>(
    `/products/category-slug/${slug}`,
    {
      pageNumber: page,
      pageSize,
    },
    {
      queryKey: ["products-by-slug", slug, page],
      enabled: !!slug,
    }
  );

  const products = data?.products || [];
  const totalProducts = data?.totalItems || 0;

  const productCardData = products.map((product: Product) => ({
    id: product.id,
    img: product.imageFiles[0] || "/placeholder.png",
    name: product.name,
    rating: product.averageRating,
    price: product.variants[0]?.price || 0,
    originalPrice:
      product.variants[0]?.price < 100
        ? (product.variants[0]?.price * 1.25).toFixed(2)
        : undefined,
    discountPercent: product.variants[0]?.price < 100 ? "20" : undefined,
  }));

  return (
    <div className="flex-1 p-7.5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2.5">
          <p className="text-base">
            Showing {(page - 1) * pageSize + 1}-
            {Math.min(page * pageSize, totalProducts)} of {totalProducts}{" "}
            Products
          </p>
          <p className="text-base">Sort by:</p>
          <Button className="bg-gray-100 rounded-full flex items-center gap-2 px-4 py-2 h-10 border-none outline-none">
            <span className="text-sm">Latest</span>
            <img src={icons.downArrow} alt="Dropdown" className="w-3 h-3" />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : productCardData.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="product-list grid grid-cols-3 gap-7.5 my-12">
          {productCardData.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              img={product.img}
              name={product.name}
              rating={5}
              price={Number(product.price)}
              originalPrice={
                product.originalPrice
                  ? Number(product.originalPrice)
                  : undefined
              }
              discountPercent={
                product.discountPercent
                  ? Number(product.discountPercent)
                  : undefined
              }
            />
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <Button
          className="border border-gray-200 rounded-lg px-3.5 py-2 flex items-center gap-1.5"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <span>←</span> Previous
        </Button>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalProducts}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
          className="flex items-center gap-2"
          itemRender={(page, type, originalElement) => {
            if (type === "page") {
              return (
                <span
                  className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer ${
                    page === page ? "bg-gray-200 font-bold" : "bg-white"
                  }`}
                >
                  {page}
                </span>
              );
            }
            if (type === "jump-next" || type === "jump-prev") {
              return <span className="px-2">...</span>;
            }
            return originalElement;
          }}
        />
        <Button
          className="border border-gray-200 rounded-lg px-3.5 py-2 flex items-center gap-1.5"
          disabled={page * pageSize >= totalProducts}
          onClick={() => setPage(page + 1)}
        >
          Next <span>→</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
