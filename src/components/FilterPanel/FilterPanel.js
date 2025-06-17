import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Slider, Spin } from "antd";
import { icons } from "../../assets/icons";
import { catalogApi } from "@/config/api";
const FilterPanel = ({ categorySlug, onFilterChange }) => {
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [selectedProperties, setSelectedProperties] = useState({});
    const [openSections, setOpenSections] = useState({
        price: true,
    });
    const { data, isLoading } = catalogApi.useGet("/products/filter-options", { categorySlug }, {
        onSuccess: (data) => {
            setPriceRange([data.minPrice, data.maxPrice]);
            const initOpenSections = { price: true };
            Object.keys(data.properties).forEach((key) => {
                initOpenSections[key] = false;
            });
            setOpenSections(initOpenSections);
        },
    });
    const toggleSection = (key) => {
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    const handleApplyFilters = () => {
        onFilterChange({
            priceMin: priceRange[0],
            priceMax: priceRange[1],
            properties: selectedProperties,
        });
    };
    if (isLoading || !data)
        return _jsx(Spin, {});
    const { tags, minPrice, maxPrice, properties } = data;
    return (_jsxs("div", { className: "filter", children: [_jsxs("div", { className: "filter-title", children: [_jsx("p", { className: "filter-heading", children: "Filters" }), _jsx("div", { className: "filter-image", children: _jsx("img", { src: icons.filter, alt: "Filter" }) })] }), _jsx("hr", {}), _jsx("hr", {}), _jsxs("div", { className: "filter-section", children: [_jsxs("div", { className: "filter-section-title", style: { cursor: "pointer" }, onClick: () => toggleSection("price"), children: [_jsx("p", { className: "filter-heading", children: "Price" }), _jsx("div", { className: "filter-image", style: {
                                    transform: openSections.price ? "rotate(0deg)" : "rotate(-90deg)",
                                    transition: "transform 0.3s",
                                }, children: _jsx("img", { src: icons.upArrow, alt: "Toggle" }) })] }), openSections.price && (_jsxs("div", { className: "price-slider-container", children: [_jsx("div", { className: "price-slider", children: _jsx(Slider, { range: true, min: minPrice, max: maxPrice, value: priceRange, onChange: (value) => setPriceRange(value) }) }), _jsxs("div", { className: "price-values", children: [_jsxs("span", { children: ["$", priceRange[0]] }), _jsxs("span", { children: ["$", priceRange[1]] })] })] }))] }), _jsx("hr", {}), Object.entries(properties).map(([key, values]) => (_jsxs("div", { className: "filter-section", children: [_jsxs("div", { className: "filter-section-title", style: { cursor: "pointer" }, onClick: () => toggleSection(key), children: [_jsx("p", { className: "filter-heading", children: key }), _jsx("div", { className: "filter-image", style: {
                                    transform: openSections[key] ? "rotate(0deg)" : "rotate(-90deg)",
                                    transition: "transform 0.3s",
                                }, children: _jsx("img", { src: icons.upArrow, alt: "Toggle" }) })] }), openSections[key] && (_jsx("div", { className: "size-items", children: values.map((val) => {
                            const isSelected = selectedProperties[key] === val;
                            return (_jsx("div", { className: `size-item ${isSelected ? "selected" : ""}`, style: {
                                    cursor: "pointer",
                                    userSelect: "none",
                                    padding: "4px 12px",
                                    borderRadius: 8,
                                    marginBottom: 6,
                                    backgroundColor: isSelected ? "#000" : "#f0f0f0",
                                    color: isSelected ? "#fff" : "#000",
                                    transition: "background-color 0.3s, color 0.3s",
                                    display: "inline-block",
                                }, onClick: () => {
                                    setSelectedProperties((prev) => {
                                        if (prev[key] === val) {
                                            const newProps = { ...prev };
                                            delete newProps[key];
                                            return newProps;
                                        }
                                        return { ...prev, [key]: val };
                                    });
                                }, children: _jsx("p", { style: { margin: 0 }, children: val }) }, val));
                        }) })), _jsx("hr", {})] }, key))), _jsx("button", { className: "apply-filter", onClick: handleApplyFilters, children: _jsx("p", { children: "Apply Filter" }) })] }));
};
export default FilterPanel;
