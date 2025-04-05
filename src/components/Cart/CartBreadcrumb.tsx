import React from "react";
import { Link } from "react-router-dom";

const CartBreadcrumb: React.FC = () => {
  return (
    <ul className="flex self-start gap-2 md:gap-7 text-gray-600 cursor-pointer py-5 text-sm md:text-base">
      <li>
        <Link to="/home" className="hover:text-black text-gray-600 no-underline">
          Home
        </Link>
        <span className="mx-1 md:mx-2">/</span>
      </li>
      <li>
        <Link to="/shop" className="hover:text-black text-gray-600 no-underline">
          Shop
        </Link>
        <span className="mx-1 md:mx-2">/</span>
      </li>
      <li className="text-black">Cart</li>
    </ul>
  );
};

export default CartBreadcrumb;