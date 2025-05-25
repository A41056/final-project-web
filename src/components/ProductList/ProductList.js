import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Pagination } from "antd";
import { catalogApi } from "@/config/api";
import { icons } from "../../assets/icons";
import ProductCard from "../ProductCard";
const ProductList = ({ slug, filters }) => {
    const [page, setPage] = useState(1);
    const pageSize = 9;
    const { data, isLoading } = catalogApi.useGet(`/products/category-slug/${slug}`, {
        pageNumber: page,
        pageSize,
        ...filters,
    }, {
        queryKey: ["products-by-slug", slug, page, filters],
        enabled: !!slug,
    });
    const products = data?.products || [];
    const totalProducts = data?.totalItems || 0;
    const productCardData = products.map((product) => ({
        id: product.id,
        img: product.imageFiles[0] || "/placeholder.png",
        name: product.name,
        rating: product.averageRating,
        price: product.variants[0]?.price || 0,
        originalPrice: product.variants[0]?.price < 100
            ? (product.variants[0]?.price * 1.25).toFixed(2)
            : undefined,
        discountPercent: product.variants[0]?.price < 100 ? "20" : undefined,
    }));
    return (_jsxs("div", { className: "flex-1 p-7.5", children: [_jsx("div", { className: "flex justify-between items-center mb-4", children: _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsxs("p", { className: "text-base", children: ["Showing ", (page - 1) * pageSize + 1, "-", Math.min(page * pageSize, totalProducts), " of ", totalProducts, " ", "Products"] }), _jsx("p", { className: "text-base", children: "Sort by:" }), _jsxs(Button, { className: "bg-gray-100 rounded-full flex items-center gap-2 px-4 py-2 h-10 border-none outline-none", children: [_jsx("span", { className: "text-sm", children: "Latest" }), _jsx("img", { src: icons.downArrow, alt: "Dropdown", className: "w-3 h-3" })] })] }) }), isLoading ? (_jsx("p", { className: "text-center text-gray-500", children: "Loading products..." })) : productCardData.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "No products found." })) : (_jsx("div", { className: "product-list grid grid-cols-3 gap-7.5 my-12", children: productCardData.map((product) => (_jsx(ProductCard, { id: product.id, img: product.img, name: product.name, rating: 5, price: Number(product.price), originalPrice: product.originalPrice
                        ? Number(product.originalPrice)
                        : undefined, discountPercent: product.discountPercent
                        ? Number(product.discountPercent)
                        : undefined }, product.id))) })), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(Button, { className: "border border-gray-200 rounded-lg px-3.5 py-2 flex items-center gap-1.5", disabled: page === 1, onClick: () => setPage(page - 1), children: [_jsx("span", { children: "\u2190" }), " Previous"] }), _jsx(Pagination, { current: page, pageSize: pageSize, total: totalProducts, onChange: (p) => setPage(p), showSizeChanger: false, className: "flex items-center gap-2", itemRender: (page, type, originalElement) => {
                            if (type === "page") {
                                return (_jsx("span", { className: `w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer ${page === page ? "bg-gray-200 font-bold" : "bg-white"}`, children: page }));
                            }
                            if (type === "jump-next" || type === "jump-prev") {
                                return _jsx("span", { className: "px-2", children: "..." });
                            }
                            return originalElement;
                        } }), _jsxs(Button, { className: "border border-gray-200 rounded-lg px-3.5 py-2 flex items-center gap-1.5", disabled: page * pageSize >= totalProducts, onClick: () => setPage(page + 1), children: ["Next ", _jsx("span", { children: "\u2192" })] })] })] }));
};
export default ProductList;
