import React from "react";
import { icons } from "../../assets/icons";

interface ProductCardProps {
  img: string;
  name: string;
  rating: number;
  price: string | number;
  originalPrice?: string | number;
  discountPercent?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  img,
  name,
  rating,
  price,
  originalPrice,
  discountPercent,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={img} alt={name} />
      </div>

      <p className="product-name">{name}</p>

      <div className="product-rating">
        <div className="stars">
          {Array(fullStars)
            .fill(null)
            .map((_, index) => (
              <img key={`full-${index}`} src={icons.star} alt="full star" />
            ))}
          {hasHalfStar && (
            <img key="half" src={icons.halfStar} alt="half star" />
          )}
        </div>
        <span>{rating} / 5</span>
      </div>

      <div className="product-pricing">
        <span className="discount-price">${price}</span>
        {originalPrice && discountPercent && (
          <>
            <span className="original-price">${originalPrice}</span>
            <div className="discount-wrapper">
              <span className="discount-percent">-{discountPercent}%</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
