import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { catalogApi } from "@/config/api";
const Breadcrumb = ({ categoryId, product }) => {
    const { data: pathCategories, isLoading, error, } = catalogApi.useGet(`/categories/${categoryId || product?.categoryIds?.[0]}/path`, {}, {
        queryKey: ["categoryPath", categoryId || product?.categoryIds?.[0]],
        select: (data) => data.path,
        enabled: !!(categoryId || product?.categoryIds?.[0]),
        staleTime: 5 * 60 * 1000,
    });
    const breadcrumbItems = [
        { name: "Home", path: "/home" },
        { name: "Shop", path: "/shop" },
    ];
    if (isLoading) {
        breadcrumbItems.push({ name: "Loading...", path: "#" });
    }
    else if (error) {
        breadcrumbItems.push({ name: "Error loading path", path: "#" });
    }
    else if (pathCategories && pathCategories.length > 0) {
        const filteredPath = pathCategories.filter((cat) => cat.name !== "Shop");
        breadcrumbItems.push(...filteredPath.map((cat) => ({
            name: cat.name,
            path: `/shop/${cat.slug}`,
        })));
    }
    if (product) {
        breadcrumbItems.push({
            name: product.name,
            path: `/products/${product.id}`,
        });
    }
    return (_jsx("ul", { className: "navigate-group flex self-start gap-7 text-gray-600 cursor-pointer py-5", children: breadcrumbItems.map((item, index) => (_jsxs("li", { children: [_jsx(Link, { to: item.path, className: "hover:text-black text-gray-600 no-underline", children: item.name }), index < breadcrumbItems.length - 1 && (_jsx("span", { className: "mx-2", children: "/" }))] }, item.path))) }));
};
export default Breadcrumb;
