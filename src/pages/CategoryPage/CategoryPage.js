import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import ProductList from "@/components/ProductList/ProductList";
const CategoryPage = () => {
    const { slug } = useParams();
    const [filters, setFilters] = useState({});
    return (_jsx("div", { className: "font-satoshi", children: _jsx("div", { className: "px-25 py-5", children: _jsxs("div", { className: "container flex flex-row items-start justify-start gap-6 py-5 max-w-full", children: [slug && (_jsx("div", { className: "w-full md:w-1/4", children: _jsx(FilterPanel, { categorySlug: slug, onFilterChange: setFilters }) })), slug && (_jsx("div", { className: "w-full md:w-3/4", children: _jsx(ProductList, { slug: slug, filters: filters }) }))] }) }) }));
};
export default CategoryPage;
