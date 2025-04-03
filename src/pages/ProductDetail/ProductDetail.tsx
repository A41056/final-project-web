import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchWithAuth } from "@/config/api";
import ProductImages from "@/components/ProductImages/ProductImages";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import ProductActions from "@/components/ProductActions/ProductActions";
import ProductTabs from "@/components/ProductTabs/ProductTabs";
import RelatedProducts from "@/components/RelatedProduct/RelatedProduct";
import { ProductCardData } from "@/types/product";

const CATALOG_API_URL =
  import.meta.env.CATALOG_API_URL || "http://localhost:6009";

interface GetProductByIdResponse {
  product: {
    id: string;
    name: string;
    description: string;
    imageFiles: string[];
    variants: Array<{
      properties: Array<{ type: string; value: string; image: string | null }>;
      price: number;
      stockCount: number;
    }>;
    averageRating: number;
  };
}

interface ProductResponse {
  products: Array<{
    id: string;
    name: string;
    imageFiles: string[];
    variants: Array<{ price: number }>;
    averageRating: number;
  }>;
  totalItems: number;
}

interface VariantSelection {
  [key: string]: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<VariantSelection>({});

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useQuery<GetProductByIdResponse, Error>(
    ["product", id],
    async () => {
      if (!id) throw new Error("Product ID is required");
      const url = new URL(`${CATALOG_API_URL}/products/${id}`);
      return fetchWithAuth(url.toString());
    },
    { enabled: !!id }
  );

  const {
    data: relatedProductsData,
    isLoading: relatedLoading,
    error: relatedError,
  } = useQuery<ProductResponse, Error>(
    ["relatedProducts", id],
    async () => {
      const url = new URL(`${CATALOG_API_URL}/products`);
      const params = { pageNumber: 1, pageSize: 4, isActive: true };
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
      return fetchWithAuth(url.toString());
    },
    { enabled: !!id }
  );

  const product = productData?.product;

  const allImages = product
    ? (() => {
        const variantImages = Array.from(
          new Set(
            product.variants
              .map((v) => v.properties.find((p) => p.type === "Color")?.image)
              .filter((img): img is string => !!img)
          )
        );
        return variantImages.length > 0 ? variantImages : product.imageFiles;
      })()
    : [];

  useEffect(() => {
    if (product && !selectedImage) {
      const defaultImage = product.imageFiles[0] || "";
      setSelectedImage(defaultImage);

      const variantFromUrl: VariantSelection = {};
      searchParams.forEach((value, key) => {
        variantFromUrl[key] = value;
      });
      setSelectedVariant(variantFromUrl);

      const matchedVariant = product.variants.find((v) =>
        v.properties.every((prop) => variantFromUrl[prop.type] === prop.value)
      );
      if (matchedVariant) {
        const variantImage = matchedVariant.properties.find(
          (prop) => prop.image
        )?.image;
        setSelectedImage(variantImage || defaultImage);
      }
    } else if (product) {
      const variantFromUrl: VariantSelection = {};
      searchParams.forEach((value, key) => {
        variantFromUrl[key] = value;
      });
      setSelectedVariant(variantFromUrl);
    }
  }, [product, searchParams]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);

    if (!product || product.imageFiles.includes(image)) return;

    let matchedProp;
    for (const variant of product.variants) {
      matchedProp = variant.properties.find((prop) => prop.image === image);
      if (matchedProp) break;
    }

    if (matchedProp) {
      const newVariant = {
        ...selectedVariant,
        [matchedProp.type]: matchedProp.value,
      };
      setSelectedVariant(newVariant);
      setSearchParams(newVariant);

      const matchedVariant = product.variants.find((v) =>
        v.properties.every((prop) => newVariant[prop.type] === prop.value)
      );
      if (matchedVariant) {
        const variantImage = matchedVariant.properties.find(
          (prop) => prop.image
        )?.image;
        if (variantImage) setSelectedImage(variantImage);
      }
    } else {
      console.warn("No property found for image:", image);
    }
  };

  const handleVariantChange = (type: string, value: string) => {
    const newVariant = { ...selectedVariant, [type]: value };
    setSelectedVariant(newVariant);

    if (product) {
      const matchedVariant = product.variants.find((v) =>
        v.properties.every((prop) => newVariant[prop.type] === prop.value)
      );
      if (matchedVariant) {
        const variantImage = matchedVariant.properties.find(
          (prop) => prop.image
        )?.image;
        if (variantImage) setSelectedImage(variantImage);
      }
    }

    setSearchParams(newVariant);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product?.name} to cart`);
  };

  const transformProductData = (
    products: ProductResponse["products"] | undefined
  ): ProductCardData[] => {
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
        const priceRange =
          prices.length > 1 ? `${minPrice} - ${maxPrice}` : `${minPrice}`;
        return {
          id: p.id,
          img: p.imageFiles[0] || "",
          name: p.name,
          rating: p.averageRating || 0,
          price: priceRange,
        };
      });
  };

  const relatedProducts = transformProductData(relatedProductsData?.products);

  if (productLoading)
    return <div className="text-center">Loading product details...</div>;
  if (productError)
    return (
      <div className="text-center text-red-500">
        Error loading product: {productError.message}
      </div>
    );
  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div className="container-detail flex flex-col items-center justify-center px-4 md:px-24 py-5 gap-2.5 max-w-full">
      <hr className="my-4 border-t border-gray-200 w-full" />

      <ul className="navigate-group flex self-start gap-7 text-gray-600 cursor-pointer py-5">
        <li>
          <a
            href="/home"
            className="hover:text-black text-gray-600 no-underline"
          >
            Home
          </a>
          <span className="mx-2">/</span>
        </li>
        <li>
          <a href="#" className="hover:text-black text-gray-600 no-underline">
            Shop
          </a>
          <span className="mx-2">/</span>
        </li>
        <li>
          <a href="#" className="hover:text-black text-gray-600 no-underline">
            Men
          </a>
          <span className="mx-2">/</span>
        </li>
        <li>
          <a href="#" className="hover:text-black text-gray-600 no-underline">
            T-shirts
          </a>
        </li>
      </ul>

      <div className="product-details flex flex-col md:flex-row items-start justify-start gap-7 mb-8 w-full">
        <ProductImages
          allImages={allImages}
          selectedImage={selectedImage}
          onImageClick={handleImageClick}
        />
        <div className="product-detail flex-1 min-h-[700px] flex flex-col justify-between w-full md:w-1/2">
          <ProductInfo
            name={product.name}
            description={product.description}
            variants={product.variants}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
          />
          <ProductActions
            variants={product.variants}
            selectedVariant={selectedVariant}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      <ProductTabs
        description={product.description}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      <RelatedProducts
        relatedProducts={relatedProducts}
        isLoading={relatedLoading}
        error={relatedError}
      />
    </div>
  );
};

export default ProductDetail;
