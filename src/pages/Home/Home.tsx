import React from "react";
import { icons } from "@/assets/icons";
import { logo } from "@/assets/logo";
import ProductCard, { ProductCardData } from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import { fetchWithAuth } from "@/config/api";
import { useQuery } from "react-query";
import { Product } from "@/types/product";

interface ProductResponse {
  products: Product[];
  totalItems: number;
}

const CATALOG_API_URL =
  import.meta.env.CATALOG_API_URL || "http://localhost:6009";

export const Home = () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Fetch New Arrivals
  const { data: newArrivalData, isLoading: newArrivalLoading } = useQuery<
    ProductResponse,
    Error
  >({
    queryKey: ["newArrivals", { pageNumber: 1, pageSize: 4 }],
    queryFn: async () => {
      const url = new URL(`${CATALOG_API_URL}/products`);
      const params = {
        pageNumber: 1,
        pageSize: 4,
        isActive: true,
        createdFrom: oneMonthAgo.toISOString(),
      };
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
      return fetchWithAuth(url.toString());
    },
  });

  // Fetch Top Selling
  const { data: topSellingData, isLoading: topSellingLoading } = useQuery<
    ProductResponse,
    Error
  >({
    queryKey: ["topSelling", { pageNumber: 1, pageSize: 4 }],
    queryFn: async () => {
      const url = new URL(`${CATALOG_API_URL}/products/top-hot`);
      const params = { pageNumber: 1, pageSize: 4 };
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
      return fetchWithAuth(url.toString());
    },
  });

  const transformProductData = (products: Product[] | undefined): ProductCardData[] => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return [];
    }
    return products.map((p) => {
      const prices = p.variants.map((v) => v.price);
      const discountPrices = p.variants.map((v) => v.discountPrice);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const minDiscountPrice = Math.min(...discountPrices);

      const priceRange =
        prices.length > 1
          ? `${minPrice.toLocaleString("en-US")} - ${maxPrice.toLocaleString("en-US")}`
          : `${minPrice.toLocaleString("en-US")}`;

      const discountPriceRange =
        discountPrices.length > 1
          ? `${minDiscountPrice.toLocaleString("en-US")}`
          : `${minDiscountPrice.toLocaleString("en-US")}`;

      const originalPrice = maxPrice;  // Chọn giá gốc cao nhất
      const discountPrice = minDiscountPrice; // Chọn giá giảm thấp nhất

      // Tính tỷ lệ giảm giá
      const discountPercent = originalPrice && discountPrice ? ((originalPrice - discountPrice) / originalPrice) * 100 : 0;

      return {
        id: p.id,
        img: p.imageFiles[0] || "",
        name: p.name,
        rating: p.averageRating || 0,
        price: minPrice.toString(),  // Chuyển giá thành string
        originalPrice,  // Giá cao nhất làm giá gốc
        discountPercent: Math.round(discountPercent),  // Tỷ lệ giảm giá
      };
    });
  };

  const newArrivalProducts = transformProductData(newArrivalData?.products);
  const topSelling = transformProductData(topSellingData?.products);

  return (
    <div>
      <div className="slider">
        <p className="big_text">
          FIND CLOTHES
          <br />
          THAT MATCHES
          <br />
          YOUR STYLE
        </p>
        <p className="small_text">
          Browse through our diverse range of meticulously crafted garments,
          designed <br />
          to bring out your individuality and cater to your sense of style.
        </p>
        <div className="shop_now">
          <button>
            <p className="text-amber-50!">Shop Now</p>
          </button>
        </div>

        <div className="numbers">
          <div className="brands">
            <p className="intro">200+</p>
            <p className="small_intro">International Brands</p>
          </div>
          <hr />
          <div className="high-quality-products">
            <p className="intro">2,000+</p>
            <p className="small_intro">High-Quality Products</p>
          </div>
          <hr />
          <div className="happy-customer">
            <p className="intro">30,000+</p>
            <p className="small_intro">Happy Customers</p>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="wrapper_container">
          <img src={logo.versace} alt="versace" />
        </div>
        <div className="wrapper_container">
          <img src={logo.zara} alt="zara" />
        </div>
        <div className="wrapper_container">
          <img src={logo.gucci} alt="gucci" />
        </div>
        <div className="wrapper_container">
          <img src={logo.prada} alt="prada" />
        </div>
        <div className="wrapper_container">
          <img src={logo.calvinKlein} alt="calvin klein" />
        </div>
      </div>

      <div className="wrapper_1">
        <div className="wrapper_2">
          <div className="wrapper_title">NEW ARRIVALS</div>
          <div className="product-list" id="new-arrivals">
            {newArrivalLoading ? (
              <p>Loading new arrivals...</p>
            ) : (
              newArrivalProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  id={product.id}
                  img={product.img}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                  originalPrice={Number(product.originalPrice)}
                  discountPercent={Number(product.discountPercent)}
                />
              ))
            )}
          </div>
        </div>
        <hr className="break-wrapper" />
        <div className="wrapper_2">
          <div className="wrapper_title">TOP SELLING</div>
          <div className="product-list" id="top-selling">
            {topSellingLoading ? (
              <p>Loading top selling...</p>
            ) : (
              topSelling.map((product, index) => (
                <ProductCard
                  key={index}
                  id={product.id}
                  img={product.img}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                  originalPrice={Number(product.originalPrice)}
                  discountPercent={Number(product.discountPercent)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="wrapper_4">
        <p className="title">BROWSE BY DRESS STYLE</p>
        <div className="grid row-1">
          <div className="grid-item casual">Casual</div>
          <div className="grid-item formal">Formal</div>
        </div>
        <div className="grid row-2">
          <div className="grid-item party">Party</div>
          <div className="grid-item gym">Gym</div>
        </div>
      </div>

      <div className="wrapper_5">
        <p>OUR HAPPY CUSTOMERS</p>
        <div className="arrows">
          <button className="arrow">
            <img src={icons.leftArrow} alt="" />
          </button>
          <button className="arrow">
            <img src={icons.rightArrow} alt="" />
          </button>
        </div>
      </div>

      <div className="wrapper_6">
        <div className="reviews">
          <ReviewCard
            rating={5}
            reviewerName="Sarah M."
            isVerified={true}
            comment="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
            created= "01/01/2025"
          />
          <ReviewCard
            rating={5}
            reviewerName="Alex K."
            isVerified={true}
            comment="Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
            created= "01/01/2025"
          />
          <ReviewCard
            rating={5}
            reviewerName="James L."
            isVerified={true}
            comment="As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
            created = "01/01/2025"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
