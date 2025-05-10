import React, { useEffect } from "react";
import { icons } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { CartResponse, useCartStore } from "@/stores/cartStore";
import { basketApi, catalogApi } from "@/config/api";
import { UserInfo } from "@/types/user";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { itemCount, mergeCart, hasMergedServerCart } = useCartStore();
  const userString = localStorage.getItem("user");
  const user: UserInfo | null = userString ? JSON.parse(userString) : null;

  const { data: cartData } = basketApi.useGet<CartResponse>(
    user?.id ? `/basket/${user.id}` : "",
    { enabled: !!user?.id }
  );

  useEffect(() => {
    if (isAuthenticated && cartData?.cart && !hasMergedServerCart) {
      mergeCart(cartData.cart);
    }
  }, [isAuthenticated, cartData, mergeCart, hasMergedServerCart]);

  type CategoryDto = {
    id: string;
    name: string;
    slug?: string;
    subcategories: CategoryDto[];
  };

  const { data: categoryTree } =
    catalogApi.useGet<CategoryDto[]>("/categories/tree");

  const renderCategoryMenu = (categories: CategoryDto[]) => (
    <ul className="dropdown-menu">
      {categories.map((cat) => (
        <li key={cat.id} className="dropdown-item">
          <Link to={`/category/${cat.id}`}>{cat.name}</Link>
          {cat.subcategories?.length > 0 &&
            renderCategoryMenu(cat.subcategories)}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {!isAuthenticated && (
        <aside className="promo-bar">
          <p>Sign up and get 20% off to your first order.</p>
          <Link
            to="/register"
            aria-label="Go to register"
            className="text-white"
          >
            Sign Up Now
          </Link>
        </aside>
      )}
      <header>
        <nav>
          <ul className="nav_group">
            <li className="logo">
              <Link to="/" aria-label="Go to homepage">
                SHOP.CO
              </Link>
            </li>
            <li className="nav_links">
              <ul>
                <li className="dropdown">
                  <span>
                    Shop
                    <img src={icons.downArrow} alt="Expand shop menu" />
                  </span>
                  {categoryTree && renderCategoryMenu(categoryTree)}
                </li>
              </ul>
            </li>
            <li className="search">
              <form>
                <button type="submit">
                  <img src={icons.search} alt="Search" />
                </button>
                <input
                  type="text"
                  id="search"
                  name="q"
                  placeholder="Search for products..."
                />
              </form>
            </li>
            <li className="user_actions">
              <Link to="/cart" aria-label="View Cart" className="relative">
                <img src={icons.cart} alt="Cart" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <Link to="/account" aria-label="View Account">
                <img src={icons.person} alt="User Account" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
