import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "@/components/ProductList/ProductList";
const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState({});
    const query = searchParams.get("q") || "";
    return (_jsx("div", { className: "font-satoshi", children: _jsx("div", { className: "px-25 py-5", children: _jsx("div", { className: "container flex flex-row items-start justify-start gap-6 py-5 max-w-full", children: _jsx("div", { className: "w-full md:w-3/4", children: _jsx(ProductList, { endpoint: "/products/search", filters: { query, ...filters }, searchMode: true }) }) }) }) }));
};
export default SearchResultPage;
