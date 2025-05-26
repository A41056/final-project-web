import React from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons";

interface ProductCardProps {
  id: string;
  img: string;
  name: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  img,
  name,
  rating,
  price,
  originalPrice,
  discountPercent
}) => {
  const navigate = useNavigate();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
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
