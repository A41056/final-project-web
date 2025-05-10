import React from "react";
import ReviewTab from "../ReviewTab/ReviewTab";

interface ProductTabsProps {
  productId: string;
  description: string;
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  productId,
  description,
  activeTab,
  onTabClick,
}) => {
  return (
    <>
      <div className="tabs flex gap-4 justify-around border-b-2 border-gray-300 w-full my-10">
        <button
          className={`tab-button px-5 py-3 text-base text-gray-600 border-b-2 border-transparent transition-all duration-300 ${
            activeTab === "details" ? "text-black border-black" : ""
          }`}
          onClick={() => onTabClick("details")}
        >
          Product Details
        </button>
        <button
          className={`tab-button px-5 py-3 text-base text-gray-600 border-b-2 border-transparent transition-all duration-300 ${
            activeTab === "reviews" ? "text-black border-black" : ""
          }`}
          onClick={() => onTabClick("reviews")}
        >
          Rating & Reviews
        </button>
        <button
          className={`tab-button px-5 py-3 text-base text-gray-600 border-b-2 border-transparent transition-all duration-300 ${
            activeTab === "faqs" ? "text-black border-black" : ""
          }`}
          onClick={() => onTabClick("faqs")}
        >
          FAQs
        </button>
      </div>

      <div className="tab-content mt-4 w-full mb-8 min-h-[400px] relative">
        <div
          className={`tab-panel w-full transition-opacity duration-300 ${
            activeTab === "details" ? "opacity-100" : "opacity-0 absolute"
          }`}
        >
          <p>{description || "Thông tin chi tiết về sản phẩm..."}</p>
        </div>
        <div
          className={`tab-panel w-full transition-opacity duration-300 ${
            activeTab === "reviews" ? "opacity-100" : "opacity-0 absolute"
          }`}
        >
          <ReviewTab productId={productId} />
        </div>
        <div
          className={`tab-panel w-full transition-opacity duration-300 ${
            activeTab === "faqs" ? "opacity-100" : "opacity-0 absolute"
          }`}
        >
          <p>Các câu hỏi thường gặp...</p>
        </div>
      </div>
    </>
  );
};

export default ProductTabs;
