import React from "react";
import { Button, InputNumber } from "antd";
import { CartItem as CartItemType } from "@/stores/cartStore";
import { catalogApi } from "@/config/api";
import { GetProductByIdResponse } from "@/pages/ProductDetail/ProductDetail";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const { data: productData, isLoading } = catalogApi.useGet<GetProductByIdResponse>(
    `/products/${item.productId}`
  );

  const product = productData?.product;
  const variantImage = item.variant?.properties?.find((prop) => prop.image)?.image;
  const image = variantImage || product?.imageFiles?.[0] || "https://via.placeholder.com/128";

  return (
    <div className="flex flex-col md:flex-row items-center border-b border-gray-300 py-4 gap-6">
      {/* Image */}
      <div className="flex-shrink-0">
        {isLoading ? (
          <div className="w-32 h-32 bg-gray-300 animate-pulse rounded" />
        ) : (
          <img
            src={image}
            alt={item.productName}
            className="rounded-lg shadow"
            style={{
              width: "128px",
              height: "128px",
              objectFit: "cover",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <h3 className="text-lg font-semibold truncate">{item.productName}</h3>
        <div className="text-sm text-gray-600 mt-1">
          {item.variant?.properties?.length
            ? item.variant.properties.map((prop) => (
                <span key={`${prop.type}-${prop.value}`} className="mr-3">
                  <strong>{prop.type}:</strong> {prop.value}
                </span>
              ))
            : "No variant selected"}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-4">
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) => onQuantityChange(item.productId, value || 1)}
            className="w-20"
            size="middle"
          />
          <span className="text-lg font-semibold">
            ${(item.price * item.quantity).toLocaleString()}
          </span>
          <Button
            type="link"
            danger
            onClick={() => onRemove(item.productId)}
            className="text-red-600 p-0 text-base"
          >
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;