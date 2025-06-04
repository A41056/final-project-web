import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { catalogApi } from "@/config/api";
const mapProductToCardData = (product) => ({
    id: product.id.toString(),
    img: product.imageFiles?.[0] || "",
    name: product.name,
    rating: product.averageRating || 0,
    price: String(product.variants?.[0]?.price || 0),
    originalPrice: product.variants?.[0]?.price || 0,
    discountPercent: 0,
});
const RelatedProducts = ({ productId }) => {
    const { data, isLoading, error } = catalogApi.useGet(`/products/${productId}/related`);
    const relatedProducts = React.useMemo(() => {
        if (!data?.products)
            return [];
        return data.products.map(mapProductToCardData);
    }, [data]);
    return (_jsxs("div", { className: "you-might-also-like-group w-full", children: [_jsx("p", { className: "text-5xl font-bold text-center mb-6", children: "You might also like" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: isLoading ? (_jsx("p", { className: "text-center", children: "Loading related products..." })) : error ? (_jsxs("p", { className: "text-center text-red-500", children: ["Error loading related products: ", error.message] })) : (relatedProducts.map((product) => (_jsx(ProductCard, { id: product.id, img: product.img, name: product.name, rating: product.rating, price: Number(product.price), originalPrice: Number(product.originalPrice), discountPercent: Number(product.discountPercent) }, product.id)))) })] }));
};
export default RelatedProducts;
