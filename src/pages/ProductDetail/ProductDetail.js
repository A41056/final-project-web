import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchWithAuth, basketApi } from "@/config/api";
import ProductImages from "@/components/ProductImages/ProductImages";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import ProductActions from "@/components/ProductActions/ProductActions";
import ProductTabs from "@/components/ProductTabs/ProductTabs";
import RelatedProducts from "@/components/RelatedProduct/RelatedProduct";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
const CATALOG_API_URL = import.meta.env.CATALOG_API_URL || "http://localhost:6009";
const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    if (!userData)
        return null;
    try {
        return JSON.parse(userData);
    }
    catch {
        return null;
    }
};
const ProductDetail = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedVariant, setSelectedVariant] = useState({});
    const { addItem } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const { data: productData, isLoading: productLoading, error: productError, } = useQuery(["product", id], async () => {
        if (!id)
            throw new Error("Product ID is required");
        const url = new URL(`${CATALOG_API_URL}/products/${id}`);
        return fetchWithAuth(url.toString());
    }, { enabled: !!id });
    const { data: relatedProductsData, isLoading: relatedLoading, error: relatedError, } = useQuery(["relatedProducts", id], async () => {
        const url = new URL(`${CATALOG_API_URL}/products`);
        const params = { pageNumber: 1, pageSize: 4, isActive: true };
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value.toString());
            }
        });
        return fetchWithAuth(url.toString());
    }, { enabled: !!id });
    const { mutate: syncCartWithServer, isLoading: isSyncingCart } = basketApi.usePost();
    const product = productData?.product;
    const allImages = product
        ? (() => {
            const variantImages = Array.from(new Set(product.variants
                .map((v) => v.properties[0]?.image)
                .filter((img) => !!img)));
            return variantImages.length > 0 ? variantImages : product.imageFiles;
        })()
        : [];
    useEffect(() => {
        if (product && !selectedImage) {
            const defaultImage = product.imageFiles[0] || "";
            setSelectedImage(defaultImage);
            const variantFromUrl = {};
            searchParams.forEach((value, key) => {
                variantFromUrl[key] = value;
            });
            setSelectedVariant(variantFromUrl);
            const matchedVariant = product.variants.find((v) => v.properties.every((prop) => variantFromUrl[prop.type] === prop.value));
            if (matchedVariant) {
                const variantImage = matchedVariant.properties[0]?.image;
                setSelectedImage(variantImage || defaultImage);
            }
        }
        else if (product) {
            const variantFromUrl = {};
            searchParams.forEach((value, key) => {
                variantFromUrl[key] = value;
            });
            setSelectedVariant(variantFromUrl);
        }
    }, [product, searchParams]);
    const handleImageClick = (image) => {
        setSelectedImage(image);
        if (!product || product.imageFiles.includes(image))
            return;
        let matchedProp;
        for (const variant of product.variants) {
            if (variant.properties[0]?.image === image) {
                matchedProp = variant.properties[0];
                break;
            }
        }
        if (matchedProp) {
            const newVariant = {
                ...selectedVariant,
                [matchedProp.type]: matchedProp.value,
            };
            setSelectedVariant(newVariant);
            setSearchParams(newVariant);
            const matchedVariant = product.variants.find((v) => v.properties.every((prop) => newVariant[prop.type] === prop.value));
            if (matchedVariant) {
                const variantImage = matchedVariant.properties[0]?.image;
                if (variantImage)
                    setSelectedImage(variantImage);
            }
        }
        else {
            console.warn("No property found for image:", image);
        }
    };
    const handleVariantChange = (type, value) => {
        const newVariant = { ...selectedVariant, [type]: value };
        setSelectedVariant(newVariant);
        if (product) {
            const matchedVariant = product.variants.find((v) => v.properties.every((prop) => newVariant[prop.type] === prop.value));
            if (matchedVariant) {
                const variantImage = matchedVariant.properties[0]?.image;
                if (variantImage)
                    setSelectedImage(variantImage);
            }
        }
        setSearchParams(newVariant);
    };
    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };
    const handleAddToCart = () => {
        if (!product || !id)
            return;
        const selectedVar = product.variants.find((v) => v.properties.every((prop) => selectedVariant[prop.type] === prop.value)) || product.variants[0];
        const cartItem = {
            productId: id,
            productName: product.name,
            quantity,
            price: selectedVar.price,
            variant: selectedVar, // Include the full variant
        };
        addItem(cartItem);
        const user = getUserFromLocalStorage();
        if (isAuthenticated && user?.id) {
            const requestData = {
                cart: {
                    userId: user.id,
                    items: [cartItem],
                },
            };
            syncCartWithServer({ endpoint: "/basket", data: requestData }, {
                onSuccess: () => {
                    console.log(`Synced ${quantity} of ${product.name} to server cart for user ${user.id}`);
                },
                onError: (error) => {
                    console.error("Error syncing cart with server:", error instanceof Error ? error.message : String(error));
                },
            });
        }
        else {
            console.log(`Added ${quantity} of ${product.name} to local cart (user not logged in)`);
        }
        setQuantity(1);
    };
    const transformProductData = (products) => {
        if (!Array.isArray(products)) {
            console.error("Related products is not an array:", products);
            return [];
        }
        return products
            .filter((p) => p.id !== id)
            .slice(0, 2)
            .map((p) => {
            const prices = p.variants.map((v) => v.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const priceRange = prices.length > 1 ? `${minPrice} - ${maxPrice}` : `${minPrice}`;
            return {
                id: p.id,
                img: p.imageFiles[0] || "",
                name: p.name,
                rating: p.averageRating || 0,
                price: priceRange,
            };
        });
    };
    if (productLoading)
        return _jsx("div", { className: "text-center", children: "Loading product details..." });
    if (productError)
        return (_jsxs("div", { className: "text-center text-red-500", children: ["Error loading product: ", productError.message] }));
    if (!product)
        return _jsx("div", { className: "text-center", children: "Product not found" });
    return (_jsxs("div", { className: "container-detail flex flex-col items-center justify-center px-4 md:px-24 py-5 gap-2.5 max-w-full", children: [_jsx("hr", { className: "my-4 border-t border-gray-200 w-full" }), _jsx(Breadcrumb, { product: {
                    id: product.id,
                    name: product.name,
                    categoryIds: product.categoryIds || [],
                } }), _jsxs("div", { className: "product-details flex flex-col md:flex-row items-start justify-start gap-7 mb-8 w-full", children: [_jsx(ProductImages, { allImages: allImages, selectedImage: selectedImage, onImageClick: handleImageClick }), _jsxs("div", { className: "product-detail flex-1 min-h-[700px] flex flex-col justify-between w-full md:w-1/2", children: [_jsx(ProductInfo, { name: product.name, description: product.description, variants: product.variants, selectedVariant: selectedVariant, onVariantChange: handleVariantChange }), _jsx(ProductActions, { variants: product.variants, selectedVariant: selectedVariant, quantity: quantity, onQuantityChange: handleQuantityChange, onAddToCart: handleAddToCart, isAddingToCart: isSyncingCart })] })] }), _jsx(ProductTabs, { productId: product.id, description: product.description, activeTab: activeTab, onTabClick: setActiveTab }), _jsx(RelatedProducts, { productId: id })] }));
};
export default ProductDetail;
