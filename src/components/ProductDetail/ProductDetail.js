import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { icons } from "@/assets/icons";
const ProductDetails = ({ product, quantity, handleQuantityChange, handleAddToCart, }) => {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [selectedColor, setSelectedColor] = useState(product.variants[0].properties.find((p) => p.type === "Color")?.value ||
        null);
    const [selectedSize, setSelectedSize] = useState(product.variants[0].properties.find((p) => p.type === "Size")?.value || null);
    const handleVariantSelect = (type, value) => {
        if (type === "Color") {
            setSelectedColor(value);
        }
        else if (type === "Size") {
            setSelectedSize(value);
        }
        const matchedVariant = product.variants.find((variant) => variant.properties.every((prop) => (prop.type === "Color" &&
            prop.value === (type === "Color" ? value : selectedColor)) ||
            (prop.type === "Size" &&
                prop.value === (type === "Size" ? value : selectedSize))));
        if (matchedVariant) {
            setSelectedVariant(matchedVariant);
        }
    };
    const uniqueColors = Array.from(new Set(product.variants.map((v) => v.properties.find((p) => p.type === "Color")?.value))).filter(Boolean);
    const availableSizes = Array.from(new Set(product.variants
        .filter((v) => v.properties.some((p) => p.type === "Color" && p.value === selectedColor))
        .map((v) => v.properties.find((p) => p.type === "Size")?.value))).filter(Boolean);
    const totalPrice = selectedVariant.price * quantity;
    return (_jsxs("div", { className: "product-details", children: [_jsxs("div", { className: "product-images", children: [_jsx("div", { className: "box1", children: _jsx("img", { src: product.imageFiles[1] || "/images/product-image-1.png", alt: "Image 1" }) }), _jsx("div", { className: "box2", children: _jsx("img", { src: product.imageFiles[2] || "/images/product-image-2.png", alt: "Image 2" }) }), _jsx("div", { className: "big-box", children: _jsx("img", { src: selectedVariant.properties.find((p) => p.type === "Color")
                                ?.image ||
                                product.imageFiles[0] ||
                                "/images/product-image-4.png", alt: "Main Image" }) }), _jsx("div", { className: "box3", children: _jsx("img", { src: product.imageFiles[3] || "/images/product-image-3.png", alt: "Image 3" }) })] }), _jsxs("div", { className: "product-detail", children: [_jsx("p", { className: "title", children: product.name }), _jsxs("div", { className: "rating", children: ["Rating: ", product.averageRating || 0] }), _jsxs("div", { className: "price", children: ["Price: ", (selectedVariant.price * quantity).toLocaleString("en-US"), " ", "VND"] }), _jsx("p", { className: "description", children: product.description }), _jsxs("div", { className: "select-colors", children: [_jsx("p", { style: { color: "#00000099" }, children: "Select Colors" }), _jsx("div", { className: "colors-group", children: uniqueColors.map((color) => (_jsx("div", { className: `color ${selectedColor === color ? "selected" : ""}`, style: {
                                        backgroundColor: color,
                                        border: "1px solid #000",
                                        ...(selectedColor === color && { border: "2px solid #000" }),
                                    }, onClick: () => handleVariantSelect("Color", color) }, color))) })] }), _jsxs("div", { className: "choose-size", children: [_jsx("p", { style: { color: "#00000099" }, children: "Choose Size" }), _jsx("div", { className: "sizes", children: availableSizes.map((size) => (_jsx("div", { className: `size ${selectedSize === size ? "selected" : ""}`, onClick: () => handleVariantSelect("Size", size), children: size }, size))) })] }), _jsx("div", { className: "total-price", children: _jsxs("p", { children: ["Total Price: ", totalPrice.toLocaleString("en-US"), " VND"] }) }), _jsxs("div", { className: "add-quantity-group", children: [_jsxs("div", { className: "add-quantity", children: [_jsx("button", { className: "minus-button", onClick: () => handleQuantityChange(-1), children: _jsx("img", { src: icons.minus, alt: "Decrease" }) }), _jsx("div", { className: "quantity-number", children: quantity }), _jsx("button", { className: "add-button", onClick: () => handleQuantityChange(1), children: _jsx("img", { src: icons.add, alt: "Increase" }) })] }), _jsx("button", { className: "add-to-card", onClick: handleAddToCart, children: "Add to Cart" })] })] })] }));
};
export default ProductDetails;
