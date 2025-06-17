import React, { useEffect, useState } from "react";
import { icons } from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { type CartResponse, useCartStore } from "@/stores/cartStore";
import { basketApi, catalogApi } from "@/config/api";
import type { UserInfo } from "@/types/user";
import { Dropdown, Menu } from "antd";

type CategoryDto = {
  id: string;
  name: string;
  slug?: string;
  subcategories: CategoryDto[];
};

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { itemCount, mergeCart, hasMergedServerCart } = useCartStore();
  const userString = localStorage.getItem("user");
  const user: UserInfo | null = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();

  const { data: cartData } = basketApi.useGet<CartResponse>(
    user?.id ? `/basket/${user.id}` : "",
    { enabled: !!user?.id }
  );

  useEffect(() => {
    if (isAuthenticated && cartData?.cart && !hasMergedServerCart) {
      mergeCart(cartData.cart);
    }
  }, [isAuthenticated, cartData, mergeCart, hasMergedServerCart]);

  const { data: categoryTree } =
    catalogApi.useGet<CategoryDto[]>("/categories/tree");

  const renderCategoryMenuItems = (
    categories: CategoryDto[]
  ): Parameters<typeof Menu>[0]["items"] =>
    categories.map((cat) => ({
      key: cat.id,
      label: <Link to={`/category/${cat.slug}`}>{cat.name}</Link>,
      children: cat.subcategories?.length
        ? renderCategoryMenuItems(cat.subcategories)
        : undefined,
    }));

  const categoryMenuItems = categoryTree?.[0]
    ? renderCategoryMenuItems(categoryTree[0].subcategories)
    : [];

  const categoryMenu = (
    <Menu items={categoryMenuItems} mode="vertical" selectable={false} />
  );

  // ------ Thêm chức năng SEARCH -------
  const [searchValue, setSearchValue] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // Gọi API search khi submit, để Chế dễ debug hoặc lấy suggestion sau này
  const {
    data: searchResult,
    isLoading: isSearching,
    refetch: refetchSearch,
  } = catalogApi.useGet<{ products: any[]; totalItems: number }>(
    "/products/search",
    { query: searchValue },
    {
      enabled: false, // Chỉ gọi khi submit
      queryKey: ["search-products", searchValue],
    }
  );

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setSearchSubmitted(true);
    // Gọi API search (có thể xử lý kết quả ở đây, hoặc chỉ redirect)
    await refetchSearch();
    // Sau khi search thành công, redirect tới trang search (searchValue sẽ tự động lên URL)
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    // Nếu muốn show popup suggestion thay vì chuyển trang, thì xử lý searchResult ở đây
  };
  // -----------------------------------

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
        <nav className="navbar">
          <ul className="nav_group">
            <li className="logo">
              <Link to="/" aria-label="Go to homepage">
                SHOP.CO
              </Link>
            </li>
            <li className="nav_links">
              <ul>
                {categoryTree?.[0] && (
                  <li className="dropdown">
                    <Dropdown
                      overlay={categoryMenu}
                      trigger={["hover"]}
                      placement="bottomLeft"
                      arrow
                      overlayClassName="category-dropdown-menu"
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {categoryTree[0].name}
                        <img
                          src={icons.downArrow}
                          alt="Expand shop menu"
                          style={{
                            marginLeft: 6,
                            width: 12,
                            height: 12,
                            userSelect: "none",
                          }}
                        />
                      </span>
                    </Dropdown>
                  </li>
                )}
              </ul>
            </li>
            <li className="search">
              <form onSubmit={handleSearchSubmit}>
                <button type="submit">
                  <img src={icons.search} alt="Search" />
                </button>
                <input
                  type="text"
                  id="search"
                  name="q"
                  placeholder="Search for products..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  autoComplete="off"
                />
                {/* Nếu muốn show kết quả nhanh có thể hiển thị searchResult ở đây */}
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
