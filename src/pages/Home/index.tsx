import { icons } from "@/assets/icons";
import { logo } from "@/assets/logo";
import { newArrivalImages, topSellingImages } from "@/assets/productImages";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import React from "react";

const Home = () => {
  const products = {
    newArrivalProducts: [
      {
        img: newArrivalImages.newArrival1,
        name: "T-SHIRT WITH TAPE DETAILS",
        rating: 4.5,
        price: "120",
      },
      {
        img: newArrivalImages.newArrival2,
        name: "SKINNY FIT JEANS",
        rating: 3.5,
        price: "240",
        originalPrice: "260",
        discountPercent: "20",
      },
      {
        img: newArrivalImages.newArrival3,
        name: "CHECKERED SHIRT",
        rating: 4.5,
        price: "180",
      },
      {
        img: newArrivalImages.newArrival4,
        name: "SLEEVE STRIPED T-SHIRT",
        rating: 4.5,
        price: "130",
        originalPrice: "160",
        discountPercent: "30",
      },
    ],
    topSelling: [
      {
        img: topSellingImages.topSelling1,
        name: "VERTICAL STRIPED SHIRT",
        rating: 5.0,
        price: "212",
        originalPrice: "232",
        discountPercent: "20",
      },
      {
        img: topSellingImages.topSelling2,
        name: "COURAGE GRAPHIC T-SHIRT",
        rating: 4.0,
        price: "145",
      },
      {
        img: topSellingImages.topSelling3,
        name: "LOOSE FIT BERMUDA SHORTS",
        rating: 3.0,
        price: "80",
      },
      {
        img: topSellingImages.topSelling4,
        name: "FADED SKINNY JEANS",
        rating: 4.5,
        price: "210",
      },
    ],
  };

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
            {products.newArrivalProducts.map((product, index) => (
              <ProductCard
                key={index}
                img={product.img}
                name={product.name}
                rating={product.rating}
                price={product.price}
                originalPrice={product.originalPrice}
                discountPercent={product.discountPercent}
              />
            ))}
          </div>
        </div>
        <div className="wrapper_3">
          <button className="view-all-button">
            <p>View All</p>
          </button>
        </div>
        <hr className="break-wrapper" />
        <div className="wrapper_2">
          <div className="wrapper_title">TOP SELLING</div>
          <div className="product-list" id="top-selling">
            {products.topSelling.map((product, index) => (
              <ProductCard
                key={index}
                img={product.img}
                name={product.name}
                rating={product.rating}
                price={product.price}
                originalPrice={product.originalPrice}
                discountPercent={product.discountPercent}
              />
            ))}
          </div>
        </div>
        <div className="wrapper_3">
          <button className="view-all-button">
            <p>View All</p>
          </button>
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
            content="I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
          />
          <ReviewCard
            rating={5}
            reviewerName="Alex K."
            isVerified={true}
            content="Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
          />
          <ReviewCard
            rating={5}
            reviewerName="James L."
            isVerified={true}
            content="As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
