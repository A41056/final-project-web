import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { icons } from "@/assets/icons";
import { logo } from "@/assets/logo";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import { fetchWithAuth } from "@/config/api"; // Import fetchWithAuth từ api.ts
import { useQuery } from "react-query";
const CATALOG_API_URL = import.meta.env.CATALOG_API_URL || "http://localhost:6009";
export const Home = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    // Fetch New Arrivals
    const { data: newArrivalData, isLoading: newArrivalLoading } = useQuery({
        queryKey: ["newArrivals", { pageNumber: 1, pageSize: 4 }],
        queryFn: async () => {
            const url = new URL(`${CATALOG_API_URL}/products`);
            const params = {
                pageNumber: 1,
                pageSize: 4,
                isActive: true,
                createdFrom: oneMonthAgo.toISOString(),
            };
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, value.toString());
                }
            });
            return fetchWithAuth(url.toString());
        },
    });
    // Fetch Top Selling
    const { data: topSellingData, isLoading: topSellingLoading } = useQuery({
        queryKey: ["topSelling", { pageNumber: 1, pageSize: 4 }],
        queryFn: async () => {
            const url = new URL(`${CATALOG_API_URL}/products/top-hot`);
            const params = { pageNumber: 1, pageSize: 4 };
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, value.toString());
                }
            });
            return fetchWithAuth(url.toString());
        },
    });
    const transformProductData = (products) => {
        if (!Array.isArray(products)) {
            console.error("Products is not an array:", products);
            return []; // Trả về mảng rỗng nếu không phải mảng
        }
        return products.map((p) => {
            const prices = p.variants.map((v) => v.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const priceRange = prices.length > 1
                ? `${minPrice.toLocaleString("en-US")} - ${maxPrice.toLocaleString("en-US")}`
                : `${minPrice.toLocaleString("en-US")}`;
            return {
                id: p.id,
                img: p.imageFiles[0] || "",
                name: p.name,
                rating: p.averageRating || 0,
                price: priceRange,
            };
        });
    };
    const newArrivalProducts = transformProductData(newArrivalData?.products);
    const topSelling = transformProductData(topSellingData?.products);
    return (_jsxs("div", { children: [_jsxs("div", { className: "slider", children: [_jsxs("p", { className: "big_text", children: ["FIND CLOTHES", _jsx("br", {}), "THAT MATCHES", _jsx("br", {}), "YOUR STYLE"] }), _jsxs("p", { className: "small_text", children: ["Browse through our diverse range of meticulously crafted garments, designed ", _jsx("br", {}), "to bring out your individuality and cater to your sense of style."] }), _jsx("div", { className: "shop_now", children: _jsx("button", { children: _jsx("p", { className: "text-amber-50!", children: "Shop Now" }) }) }), _jsxs("div", { className: "numbers", children: [_jsxs("div", { className: "brands", children: [_jsx("p", { className: "intro", children: "200+" }), _jsx("p", { className: "small_intro", children: "International Brands" })] }), _jsx("hr", {}), _jsxs("div", { className: "high-quality-products", children: [_jsx("p", { className: "intro", children: "2,000+" }), _jsx("p", { className: "small_intro", children: "High-Quality Products" })] }), _jsx("hr", {}), _jsxs("div", { className: "happy-customer", children: [_jsx("p", { className: "intro", children: "30,000+" }), _jsx("p", { className: "small_intro", children: "Happy Customers" })] })] })] }), _jsxs("div", { className: "wrapper", children: [_jsx("div", { className: "wrapper_container", children: _jsx("img", { src: logo.versace, alt: "versace" }) }), _jsx("div", { className: "wrapper_container", children: _jsx("img", { src: logo.zara, alt: "zara" }) }), _jsx("div", { className: "wrapper_container", children: _jsx("img", { src: logo.gucci, alt: "gucci" }) }), _jsx("div", { className: "wrapper_container", children: _jsx("img", { src: logo.prada, alt: "prada" }) }), _jsx("div", { className: "wrapper_container", children: _jsx("img", { src: logo.calvinKlein, alt: "calvin klein" }) })] }), _jsxs("div", { className: "wrapper_1", children: [_jsxs("div", { className: "wrapper_2", children: [_jsx("div", { className: "wrapper_title", children: "NEW ARRIVALS" }), _jsx("div", { className: "product-list", id: "new-arrivals", children: newArrivalLoading ? (_jsx("p", { children: "Loading new arrivals..." })) : (newArrivalProducts.map((product, index) => (_jsx(ProductCard, { id: product.id, img: product.img, name: product.name, rating: product.rating, price: Number(product.price), originalPrice: Number(product.originalPrice), discountPercent: Number(product.discountPercent) }, index)))) })] }), _jsx("div", { className: "wrapper_3", children: _jsx("button", { className: "view-all-button", children: _jsx("p", { children: "View All" }) }) }), _jsx("hr", { className: "break-wrapper" }), _jsxs("div", { className: "wrapper_2", children: [_jsx("div", { className: "wrapper_title", children: "TOP SELLING" }), _jsx("div", { className: "product-list", id: "top-selling", children: topSellingLoading ? (_jsx("p", { children: "Loading top selling..." })) : (topSelling.map((product, index) => (_jsx(ProductCard, { id: product.id, img: product.img, name: product.name, rating: product.rating, price: Number(product.price), originalPrice: Number(product.originalPrice), discountPercent: Number(product.discountPercent) }, index)))) })] }), _jsx("div", { className: "wrapper_3", children: _jsx("button", { className: "view-all-button", children: _jsx("p", { children: "View All" }) }) })] }), _jsxs("div", { className: "wrapper_4", children: [_jsx("p", { className: "title", children: "BROWSE BY DRESS STYLE" }), _jsxs("div", { className: "grid row-1", children: [_jsx("div", { className: "grid-item casual", children: "Casual" }), _jsx("div", { className: "grid-item formal", children: "Formal" })] }), _jsxs("div", { className: "grid row-2", children: [_jsx("div", { className: "grid-item party", children: "Party" }), _jsx("div", { className: "grid-item gym", children: "Gym" })] })] }), _jsxs("div", { className: "wrapper_5", children: [_jsx("p", { children: "OUR HAPPY CUSTOMERS" }), _jsxs("div", { className: "arrows", children: [_jsx("button", { className: "arrow", children: _jsx("img", { src: icons.leftArrow, alt: "" }) }), _jsx("button", { className: "arrow", children: _jsx("img", { src: icons.rightArrow, alt: "" }) })] })] }), _jsx("div", { className: "wrapper_6", children: _jsxs("div", { className: "reviews", children: [_jsx(ReviewCard, { rating: 5, reviewerName: "Sarah M.", isVerified: true, comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.", created: "01/01/2025" }), _jsx(ReviewCard, { rating: 5, reviewerName: "Alex K.", isVerified: true, comment: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.", created: "01/01/2025" }), _jsx(ReviewCard, { rating: 5, reviewerName: "James L.", isVerified: true, comment: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.", created: "01/01/2025" })] }) })] }));
};
export default Home;
