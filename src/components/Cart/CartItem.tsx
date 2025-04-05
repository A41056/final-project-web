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
  const image = product?.imageFiles[0] || "https://via.placeholder.com/80";

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 py-4 gap-4">
      <div className="flex items-center gap-4 w-full md:w-1/2">
        {isLoading ? (
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 animate-pulse rounded" />
        ) : (
          <img
            src={image}
            alt={item.productName}
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
          />
        )}
        <div className="flex flex-col">
          <h3 className="text-sm md:text-base font-medium">{item.productName}</h3>
          <div className="text-xs md:text-sm text-gray-600">
            {item.variant?.properties?.map((prop) => (
              <span key={prop.type}>
                {prop.type}: {prop.value}{" "}
              </span>
            )) || "No variant selected"}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full md:w-1/2 gap-4">
        <span className="text-sm md:text-base font-semibold">
          ${(item.price / 100).toFixed(2)}
        </span>
        <InputNumber
          min={1}
          value={item.quantity}
          onChange={(value) => onQuantityChange(item.productId, value || 1)}
          className="w-16 md:w-20"
        />
        <span className="text-sm md:text-base font-semibold">
          ${((item.price * item.quantity) / 100).toFixed(2)}
        </span>
        <Button
          type="link"
          danger
          onClick={() => onRemove(item.productId)}
          className="text-red-500 p-0"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;