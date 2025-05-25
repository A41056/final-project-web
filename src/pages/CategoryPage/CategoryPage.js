import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import ProductList from "@/components/ProductList/ProductList";
const CategoryPage = () => {
    const { slug } = useParams();
    const [filters, setFilters] = useState({});
    return (_jsx("div", { className: "font-satoshi", children: _jsx("div", { className: "px-25 py-5", children: _jsxs("div", { className: "flex gap-7.5", children: [slug && (_jsx(FilterPanel, { categorySlug: slug, onFilterChange: setFilters })), slug && _jsx(ProductList, { slug: slug, filters: filters })] }) }) }));
};
export default CategoryPage;
