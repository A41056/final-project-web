import React from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { catalogApi } from "@/config/api";
import { Category } from "@/types/category";
interface GetCategoryPathResponse {
  path: Category[];
}

interface BreadcrumbProps {
  categoryId?: string; // For category pages
  product?: {
    id: string;
    name: string;
    categoryIds: string[];
  }; // For product pages
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categoryId, product }) => {
  const {
    data: pathCategories,
    isLoading,
    error,
  } = catalogApi.useGet<GetCategoryPathResponse, Category[]>(
    `/categories/${categoryId || product?.categoryIds?.[0]}/path`,
    {},
    {
      queryKey: ["categoryPath", categoryId || product?.categoryIds?.[0]],
      select: (data) => data.path,
      enabled: !!(categoryId || product?.categoryIds?.[0]),
      staleTime: 5 * 60 * 1000,
    }
  );

  const breadcrumbItems = [
    { name: "Home", path: "/home" },
    { name: "Shop", path: "/shop" },
  ];

  if (isLoading) {
    breadcrumbItems.push({ name: "Loading...", path: "#" });
  } else if (error) {
    breadcrumbItems.push({ name: "Error loading path", path: "#" });
  } else if (pathCategories && pathCategories.length > 0) {
    const filteredPath = pathCategories.filter((cat) => cat.name !== "Shop");
    breadcrumbItems.push(
      ...filteredPath.map((cat) => ({
        name: cat.name,
        path: `/shop/${cat.slug}`,
      }))
    );
  }

  if (product) {
    breadcrumbItems.push({
      name: product.name,
      path: `/products/${product.id}`,
    });
  }

  return (
    <ul className="navigate-group flex self-start gap-7 text-gray-600 cursor-pointer py-5">
      {breadcrumbItems.map((item, index) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className="hover:text-black text-gray-600 no-underline"
          >
            {item.name}
          </Link>
          {index < breadcrumbItems.length - 1 && (
            <span className="mx-2">/</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
