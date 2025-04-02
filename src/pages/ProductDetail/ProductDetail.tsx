import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchWithAuth } from "@/config/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import ProductDetails from "@/components/ProductDetail/ProductDetail";

const CATALOG_API_URL =
  import.meta.env.CATALOG_API_URL || "http://localhost:6009";

interface GetProductByIdResponse {
  product: Product;
}

interface ProductResponse {
  products: Product[];
  totalItems: number;
}

interface ProductCardData {
  id: string;
  img: string;
  name: string;
  rating: number;
  price: string;
  originalPrice?: string;
  discountPercent?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useQuery<GetProductByIdResponse, Error>(
    ["product", id],
    async () => {
      if (!id) throw new Error("Product ID is required");
      const url = new URL(`${CATALOG_API_URL}/products/${id}`);
      return fetchWithAuth(url.toString());
    },
    {
      enabled: !!id,
    }
  );

  const {
    data: relatedProductsData,
    isLoading: relatedLoading,
    error: relatedError,
  } = useQuery<ProductResponse, Error>(
    ["relatedProducts", id],
    async () => {
      const url = new URL(`${CATALOG_API_URL}/products`);
      const params = {
        pageNumber: 1,
        pageSize: 4,
        isActive: true,
      };
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
      return fetchWithAuth(url.toString());
    },
    {
      enabled: !!id,
    }
  );

  const product = productData?.product;

  const transformProductData = (
    products: Product[] | undefined
  ): ProductCardData[] => {
    if (!Array.isArray(products)) {
      console.error("Related products is not an array:", products);
      return [];
    }
    return products
      .filter((p) => p.id !== id)
      .slice(0, 2)
      .map((p) => {
        const prices = p.variants.map((v) => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange =
          prices.length > 1 ? `${minPrice} - ${maxPrice}` : `${minPrice}`;

        return {
          id: p.id,
          img: p.imageFiles[0] || "",
          name: p.name,
          rating: p.averageRating || 0,
          price: priceRange,
        };
      });
  };

  const relatedProducts = transformProductData(relatedProductsData?.products);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart`);
  };

  if (productLoading) return <div>Loading product details...</div>;
  if (productError)
    return <div>Error loading product: {productError.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container-detail">
      <hr />

      <ul className="navigate-group">
        <li>
          <a href="/home" className="hover:text-black">
            Home
          </a>
          <span className="mx-2 text-gray-500"></span>
        </li>
        <li>
          <a href="#" className="hover:text-black">
            Shop
          </a>
          <span className="mx-2 text-gray-500"></span>
        </li>
        <li>
          <a href="#" className="hover:text-black">
            Men
          </a>
          <span className="mx-2 text-gray-500"></span>
        </li>
        <li>
          <a href="#" className="hover:text-black">
            T-shirts
          </a>
        </li>
      </ul>

      <ProductDetails
        product={product}
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
        handleAddToCart={handleAddToCart}
      />

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "details" ? "active" : ""}`}
          onClick={() => handleTabClick("details")}
        >
          Product Details
        </button>
        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => handleTabClick("reviews")}
        >
          Rating & Reviews
        </button>
        <button
          className={`tab-button ${activeTab === "faqs" ? "active" : ""}`}
          onClick={() => handleTabClick("faqs")}
        >
          FAQs
        </button>
      </div>

      <div className="tab-content">
        <div
          className={`tab-panel ${activeTab === "details" ? "active" : ""}`}
          id="details"
        >
          <p>{product.description || "Thông tin chi tiết về sản phẩm..."}</p>
        </div>
        <div
          className={`tab-panel ${activeTab === "reviews" ? "active" : ""}`}
          id="reviews"
        >
          <div className="all-review-buttons">
            <div className="all-review-title">
              <p style={{ fontSize: "24px", fontWeight: 700 }}>
                All Reviews{" "}
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#00000099",
                  }}
                >
                  (451)
                </span>
              </p>
            </div>
            <div className="all-review-button">
              <div className="filter-button">
                <img src="/images/filter.png" alt="Filter" />
              </div>
              <div className="filter-latest">
                Latest
                <img
                  src="/images/down-arrow.png"
                  alt="Dropdown"
                  style={{
                    width: "16px",
                    height: "16px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="write-review-button">Write a Review</div>
            </div>
          </div>
          <div id="reviews-container">
            <ReviewCard
              rating={5}
              reviewerName="John Doe"
              isVerified={true}
              content="Great product, highly recommend!"
            />
          </div>
          <div className="load-more">
            <button>
              <p>Load More Reviews</p>
            </button>
          </div>
        </div>
        <div
          className={`tab-panel ${activeTab === "faqs" ? "active" : ""}`}
          id="faqs"
        >
          <p>Các câu hỏi thường gặp...</p>
        </div>
      </div>

      <div className="you-might-also-like-group">
        <p
          style={{
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "57.6px",
            textAlign: "center",
          }}
        >
          You might also like
        </p>
        <div id="you-might-also-like">
          {relatedLoading ? (
            <p>Loading related products...</p>
          ) : relatedError ? (
            <p>Error loading related products: {relatedError.message}</p>
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
    </div>
  );
};

export default ProductDetail;
