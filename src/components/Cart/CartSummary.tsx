import React from "react";
import { Button } from "antd";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice, onCheckout }) => {
  return (
    <div className="flex flex-col items-stretch gap-6 p-6 bg-gray-100 rounded-xl shadow-md w-full md:w-96">
      <div className="flex justify-between text-base font-medium">
        <span>Số sản phẩm:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between text-base font-medium">
        <span>Thành tiền:</span>
        <span className="text-green-700 font-bold text-xl">
          ${totalPrice.toLocaleString()}
        </span>
      </div>
      <Button
        type="primary"
        size="large"
        className="bg-black border-none hover:bg-gray-900"
        onClick={onCheckout}
      >
        Tiến hành thanh toán
      </Button>
    </div>
  );
};

export default CartSummary;