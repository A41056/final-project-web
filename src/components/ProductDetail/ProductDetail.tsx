import React from "react";
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
            src={product.imageFiles[0] || "/images/product-image-4.png"}
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
          Price:{" "}
          {Math.min(...product.variants.map((v) => v.price)).toLocaleString(
            "en-US"
          )}{" "}
          VND
        </div>
        <p className="description">{product.description}</p>
        <hr />
        <div className="select-colors">
          <p style={{ color: "#00000099" }}>Select Colors</p>
          <div className="colors-group">
            {product.variants
              .filter(
                (v, index, self) =>
                  index ===
                  self.findIndex((t) =>
                    t.properties.some(
                      (p) =>
                        p.type === "Color" &&
                        p.value ===
                          v.properties.find((p) => p.type === "Color")?.value
                    )
                  )
              )
              .map((variant) => {
                const colorProp = variant.properties.find(
                  (p) => p.type === "Color"
                );
                return (
                  <div
                    key={colorProp?.value}
                    className="color"
                    style={{ backgroundColor: colorProp?.value || "#000" }}
                  />
                );
              })}
          </div>
        </div>
        <hr />
        <div className="choose-size">
          <p style={{ color: "#00000099" }}>Choose Size</p>
          <div className="sizes">
            {product.variants
              .filter(
                (v, index, self) =>
                  index ===
                  self.findIndex((t) =>
                    t.properties.some(
                      (p) =>
                        p.type === "Size" &&
                        p.value ===
                          v.properties.find((p) => p.type === "Size")?.value
                    )
                  )
              )
              .map((variant) => {
                const sizeProp = variant.properties.find(
                  (p) => p.type === "Size"
                );
                return (
                  <div key={sizeProp?.value} className="size">
                    {sizeProp?.value}
                  </div>
                );
              })}
          </div>
        </div>
        <hr />
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
