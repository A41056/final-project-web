// CartItem.tsx
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
  // Prioritize variant-specific image if available
  const variantImage = item.variant?.properties?.find(prop => prop.image)?.image;
  const image = variantImage || product?.imageFiles?.[0] || "https://via.placeholder.com/32";

  return (
    <div className="flex items-start border-b border-gray-200 py-2 gap-2">
      {/* Image Section */}
      <div className="flex-shrink-0">
        {isLoading ? (
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
        ) : (
          <img
            src={image}
            alt={item.productName}
            className="w-8 h-8 object-cover rounded"
            style={{ width: "128px", height: "128px" }}
          />
        )}
      </div>

      {/* Product Details Section */}
      <div className="flex-1 flex flex-col gap-0.5">
        {/* Product Name and Variant */}
        <div className="flex flex-col">
          <h3 className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {item.productName}
          </h3>
          <div className="text-[10px] text-gray-600">
            {item.variant?.properties?.length > 0 ? (
              item.variant.properties.map((prop) => (
                <span key={`${prop.type}-${prop.value}`}>
                  {prop.type}: {prop.value}{" "}
                </span>
              ))
            ) : (
              <span>No variant selected</span>
            )}
          </div>
        </div>

        {/* Quantity, Price, and Remove */}
        <div className="flex items-center gap-2">
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) => onQuantityChange(item.productId, value || 1)}
            className="w-12"
            size="small"
          />
          <span className="text-xs font-semibold">
            ${((item.price * item.quantity) / 100).toFixed(2)}
          </span>
          <Button
            type="link"
            danger
            onClick={() => onRemove(item.productId)}
            className="text-red-500 p-0 text-[10px]"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;