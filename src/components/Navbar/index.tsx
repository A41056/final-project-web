import React from "react";
import { icons } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {/* Promo Bar */}
      {!isAuthenticated && (
        <aside className="promo-bar">
          <p>Sign up and get 20% off to your first order.</p>
          <Link
            to="/register"
            aria-label="Go to register"
            className="text-white !important"
          >
            Sign Up Now
          </Link>
        </aside>
      )}
      {/* Header/Navbar */}
      <header>
        <nav>
          <ul className="nav_group">
            {/* Logo */}
            <li className="logo">
              <Link to="/" aria-label="Go to homepage">
                SHOP.CO
              </Link>
            </li>

            {/* Navigation Links */}
            <li className="nav_links">
              <ul>
                <li className="dropdown">
                  <Link to="#">
                    Shop
                    <img src={icons.downArrow} alt="Expand shop menu" />
                  </Link>
                </li>
                <li>
                  <Link to="#">On Sale</Link>
                </li>
                <li>
                  <Link to="#">New Arrivals</Link>
                </li>
                <li>
                  <Link to="#">Brands</Link>
                </li>
              </ul>
            </li>

            {/* Search Form */}
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

            {/* User Actions */}
            <li className="user_actions">
              <Link to="/cart" aria-label="View Cart">
                <img src={icons.cart} alt="Cart" />
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
