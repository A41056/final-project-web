import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProductCard from "@/components/ProductCard";
const RelatedProducts = ({ relatedProducts, isLoading, error, }) => {
    return (_jsxs("div", { className: "you-might-also-like-group w-full", children: [_jsx("p", { className: "text-5xl font-bold text-center mb-6", children: "You might also like" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: isLoading ? (_jsx("p", { className: "text-center", children: "Loading related products..." })) : error ? (_jsxs("p", { className: "text-center text-red-500", children: ["Error loading related products: ", error.message] })) : (relatedProducts.map((product, index) => (_jsx(ProductCard, { id: product.id, img: product.img, name: product.name, rating: product.rating, price: Number(product.price), originalPrice: Number(product.originalPrice), discountPercent: Number(product.discountPercent) }, index)))) })] }));
};
export default RelatedProducts;
