// CartBreadcrumb.tsx
import React from "react";
import { Link } from "react-router-dom";

const CartBreadcrumb: React.FC = () => {
  return (
    <ul className="flex self-start gap-2 md:gap-4 text-gray-600 cursor-pointer py-3 text-xs md:text-sm">
      <li>
        <Link to="/home" className="hover:text-black text-gray-600 no-underline">
          Home
        </Link>
        <span className="mx-1">/</span>
      </li>
      <li>
        <Link to="/shop" className="hover:text-black text-gray-600 no-underline">
          Shop
        </Link>
        <span className="mx-1">/</span>
      </li>
      <li className="text-black">Cart</li>
    </ul>
  );
};

export default CartBreadcrumb;