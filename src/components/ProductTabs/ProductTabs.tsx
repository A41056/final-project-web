import React from "react";
import ReviewCard from "@/components/ReviewCard";

interface ProductTabsProps {
  description: string;
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
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

      <div className="tab-content mt-4 w-full mb-8">
        <div
          className={`tab-panel ${
            activeTab === "details" ? "block" : "hidden"
          } w-full`}
        >
          <p>{description || "Thông tin chi tiết về sản phẩm..."}</p>
        </div>
        <div
          className={`tab-panel ${
            activeTab === "reviews" ? "block" : "hidden"
          } w-full`}
        >
          <div className="all-review-buttons flex items-center justify-between w-full mb-4">
            <p className="text-2xl font-bold">
              All Reviews{" "}
              <span className="text-base font-normal text-gray-600">(451)</span>
            </p>
            <div className="all-review-button flex items-center justify-between gap-2.5">
              <div className="filter-button w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center p-4">
                <img
                  src="/images/filter.png"
                  alt="Filter"
                  className="w-6 h-6 object-cover"
                />
              </div>
              <div className="filter-latest w-32 h-12 bg-gray-200 rounded-full flex items-center justify-center px-5">
                Latest
                <img
                  src="/images/down-arrow.png"
                  alt="Dropdown"
                  className="w-4 h-4 ml-2"
                />
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-full cursor-pointer">
                Write a Review
              </div>
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
          <div className="text-center mt-4">
            <button className="px-4 py-2 bg-gray-100 rounded-full">
              Load More Reviews
            </button>
          </div>
        </div>
        <div
          className={`tab-panel ${
            activeTab === "faqs" ? "block" : "hidden"
          } w-full`}
        >
          <p>Các câu hỏi thường gặp...</p>
        </div>
      </div>
    </>
  );
};

export default ProductTabs;
