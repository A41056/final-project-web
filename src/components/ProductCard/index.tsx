import React from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons";

export interface ProductCardData {
  id: string;
  img: string;
  name: string;
  rating: number;
  price: string;
  discountPrice?: number;
  discountPercent?: number;
}

interface ProductCardProps {
  id: string;
  img: string;
  name: string;
  rating: number;
  price: string;
  discountPrice?: number;
  discountPercent?: number;
}

const formatCurrency = (value: number | string) => {
  if (typeof value === "string") value = parseFloat(value);
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  img,
  name,
  rating,
  price,
  discountPrice,
  discountPercent,
}) => {
  const navigate = useNavigate();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const calculatedDiscountPercent =
    discountPrice && Number(price) > discountPrice
      ? ((Number(price) - discountPrice) / Number(price)) * 100
      : discountPercent || 0;

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

      <div className="product-pricing">
        {discountPrice && Number(price) > discountPrice && (
          <span
            className="original-price"
            style={{ textDecoration: "line-through", color: "#888" }}
          >
            {formatCurrency(price)}
          </span>
        )}

        <span
          className="discount-price"
          style={{
            opacity: discountPrice && Number(price) > discountPrice ? 1 : 0.5,
          }}
        >
          {formatCurrency(discountPrice || price)}{" "}
        </span>

        {discountPrice && Number(price) > discountPrice && (
          <div className="discount-wrapper">
            <span className="discount-percent" style={{ color: "red" }}>
              -{Math.round(calculatedDiscountPercent)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
