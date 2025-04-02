import React, { useState } from "react";
import { Product } from "@/types/product";
import { icons } from "@/assets/icons";

interface ProductDetailsProps {
  product: Product;
  quantity: number;
  handleQuantityChange: (delta: number) => void;
  handleAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  quantity,
  handleQuantityChange,
  handleAddToCart,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.variants[0].properties.find((p) => p.type === "Color")?.value ||
      null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.variants[0].properties.find((p) => p.type === "Size")?.value || null
  );

  const handleVariantSelect = (type: string, value: string) => {
    if (type === "Color") {
      setSelectedColor(value);
    } else if (type === "Size") {
      setSelectedSize(value);
    }

    const matchedVariant = product.variants.find((variant) =>
      variant.properties.every(
        (prop) =>
          (prop.type === "Color" &&
            prop.value === (type === "Color" ? value : selectedColor)) ||
          (prop.type === "Size" &&
            prop.value === (type === "Size" ? value : selectedSize))
      )
    );

    if (matchedVariant) {
      setSelectedVariant(matchedVariant);
    }
  };

  const uniqueColors = Array.from(
    new Set(
      product.variants.map(
        (v) => v.properties.find((p) => p.type === "Color")?.value
      )
    )
  ).filter(Boolean) as string[];

  const availableSizes = Array.from(
    new Set(
      product.variants
        .filter((v) =>
          v.properties.some(
            (p) => p.type === "Color" && p.value === selectedColor
          )
        )
        .map((v) => v.properties.find((p) => p.type === "Size")?.value)
    )
  ).filter(Boolean) as string[];

  // Tính tổng giá dựa trên variant và số lượng
  const totalPrice = selectedVariant.price * quantity;

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="box1">
          <img
            src={product.imageFiles[1] || "/images/product-image-1.png"}
            alt="Image 1"
          />
        </div>
        <div className="box2">
          <img
            src={product.imageFiles[2] || "/images/product-image-2.png"}
            alt="Image 2"
          />
        </div>
        <div className="big-box">
          <img
            src={
              selectedVariant.properties.find((p) => p.type === "Color")
                ?.image ||
              product.imageFiles[0] ||
              "/images/product-image-4.png"
            }
            alt="Main Image"
          />
        </div>
        <div className="box3">
          <img
            src={product.imageFiles[3] || "/images/product-image-3.png"}
            alt="Image 3"
          />
        </div>
      </div>

      <div className="product-detail">
        <p className="title">{product.name}</p>
        <div className="rating">Rating: {product.averageRating || 0}</div>
        <div className="price">
          Price: {(selectedVariant.price * quantity).toLocaleString("en-US")}{" "}
          VND
        </div>
        <p className="description">{product.description}</p>
        <div className="select-colors">
          <p style={{ color: "#00000099" }}>Select Colors</p>
          <div className="colors-group">
            {uniqueColors.map((color) => (
              <div
                key={color}
                className={`color ${selectedColor === color ? "selected" : ""}`}
                style={{
                  backgroundColor: color,
                  border: "1px solid #000",
                  ...(selectedColor === color && { border: "2px solid #000" }),
                }}
                onClick={() => handleVariantSelect("Color", color)}
              />
            ))}
          </div>
        </div>
        <div className="choose-size">
          <p style={{ color: "#00000099" }}>Choose Size</p>
          <div className="sizes">
            {availableSizes.map((size) => (
              <div
                key={size}
                className={`size ${selectedSize === size ? "selected" : ""}`}
                onClick={() => handleVariantSelect("Size", size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="total-price">
          <p>Total Price: {totalPrice.toLocaleString("en-US")} VND</p>
        </div>
        <div className="add-quantity-group">
          <div className="add-quantity">
            <button
              className="minus-button"
              onClick={() => handleQuantityChange(-1)}
            >
              <img src={icons.minus} alt="Decrease" />
            </button>
            <div className="quantity-number">{quantity}</div>
            <button
              className="add-button"
              onClick={() => handleQuantityChange(1)}
            >
              <img src={icons.add} alt="Increase" />
            </button>
          </div>
          <button className="add-to-card" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
