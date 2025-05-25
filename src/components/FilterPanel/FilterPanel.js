import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Slider, Spin } from "antd";
import { icons } from "../../assets/icons";
import { catalogApi } from "@/config/api";
const FilterPanel = ({ categorySlug, onFilterChange }) => {
    const [priceRange, setPriceRange] = useState([0, 0]);
    const { data, isLoading } = catalogApi.useGet("/products/filter-options", { categorySlug }, {
        onSuccess: (data) => {
            setPriceRange([data.minPrice, data.maxPrice]);
        },
    });
    const handleApplyFilters = () => {
        console.log("FilterPanel Apply Filter");
        onFilterChange({
            priceMin: priceRange[0],
            priceMax: priceRange[1],
        });
    };
    if (isLoading || !data)
        return _jsx(Spin, {});
    const { tags, minPrice, maxPrice, properties } = data;
    return (_jsxs("div", { className: "filter", children: [_jsxs("div", { className: "filter-title", children: [_jsx("p", { className: "filter-heading", children: "Filters" }), _jsx("div", { className: "filter-image", children: _jsx("img", { src: icons.filter, alt: "Filter" }) })] }), _jsx("hr", {}), _jsx("div", { className: "filter-by-type", children: tags.map((tag) => (_jsxs("div", { className: "t-shirt-type", children: [_jsx("p", { children: tag }), _jsx("div", { className: "type-image", children: _jsx("img", { src: icons.rightNav, alt: "Nav" }) })] }, tag))) }), _jsx("hr", {}), _jsxs("div", { className: "filter-section", children: [_jsxs("div", { className: "filter-section-title", children: [_jsx("p", { className: "filter-heading", children: "Price" }), _jsx("div", { className: "filter-image", children: _jsx("img", { src: icons.upArrow, alt: "Toggle" }) })] }), _jsxs("div", { className: "price-slider-container", children: [_jsx("div", { className: "price-slider", children: _jsx(Slider, { range: true, min: minPrice, max: maxPrice, value: priceRange, onChange: (value) => setPriceRange(value) }) }), _jsxs("div", { className: "price-values", children: [_jsxs("span", { children: ["$", priceRange[0]] }), _jsxs("span", { children: ["$", priceRange[1]] })] })] })] }), _jsx("hr", {}), Object.entries(properties).map(([key, values]) => (_jsxs("div", { className: "filter-section", children: [_jsxs("div", { className: "filter-section-title", children: [_jsx("p", { className: "filter-heading", children: key }), _jsx("div", { className: "filter-image", children: _jsx("img", { src: icons.upArrow, alt: "Toggle" }) })] }), _jsx("div", { className: "size-items", children: values.map((val) => (_jsx("div", { className: "size-item", children: _jsx("p", { children: val }) }, val))) }), _jsx("hr", {})] }, key))), _jsx("button", { className: "apply-filter", onClick: handleApplyFilters, children: _jsx("p", { children: "Apply Filter" }) })] }));
};
export default FilterPanel;
