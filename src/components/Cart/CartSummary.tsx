// CartSummary.tsx
import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice, onCheckout }) => {
  return (
    <div className="flex flex-col items-end gap-3 p-3 md:p-4 bg-gray-100 rounded-lg w-full md:w-1/3">
      <div className="w-full">
        <div className="flex justify-between text-xs md:text-sm">
          <span>Items ({totalItems}):</span>
          <span>${(totalPrice / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs md:text-sm mt-1">
          <span>Shipping:</span>
          <span className="text-gray-500">TBD</span>
        </div>
        <hr className="my-3 border-t border-gray-300" />
        <div className="flex justify-between text-base md:text-lg font-semibold">
          <span>Total:</span>
          <span>${(totalPrice)}</span>
        </div>
      </div>
      <Button
        type="primary"
        size="middle"
        className="w-full md:w-auto bg-black border-none"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;