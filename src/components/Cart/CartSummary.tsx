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
    <div className="flex flex-col items-end gap-4 p-4 md:p-6 bg-gray-100 rounded-lg w-full md:w-1/3">
      <div className="w-full">
        <div className="flex justify-between text-sm md:text-base">
          <span>Items ({totalItems}):</span>
          <span>${(totalPrice / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm md:text-base mt-2">
          <span>Shipping:</span>
          <span className="text-gray-500">TBD</span>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-between text-lg md:text-xl font-semibold">
          <span>Total:</span>
          <span>${(totalPrice / 100).toFixed(2)}</span>
        </div>
      </div>
      <Button
        type="primary"
        size="large"
        className="w-full md:w-auto bg-black border-none"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;