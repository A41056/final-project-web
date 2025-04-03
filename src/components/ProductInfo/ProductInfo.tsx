import React from "react";

interface ProductInfoProps {
  name: string;
  description: string;
  variants: Array<{
    properties: Array<{ type: string; value: string; image: string | null }>;
    price: number;
    stockCount: number;
  }>;
  selectedVariant: { [key: string]: string };
  onVariantChange: (type: string, value: string) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  variants,
  selectedVariant,
  onVariantChange,
}) => {
  return (
    <div className="pt-6">
      <h1 className="title text-4xl font-bold mb-4">{name}</h1>
      <p className="description text-gray-600 mb-6">{description}</p>

      {variants[0]?.properties.map((prop) => (
        <div key={prop.type} className="mb-4 mt-6">
          <label className="block font-medium mb-2">{prop.type}</label>
          <div className="sizes flex items-center justify-start gap-4 flex-wrap">
            {Array.from(
              new Set(
                variants.map(
                  (v) => v.properties.find((p) => p.type === prop.type)?.value
                )
              )
            ).map((value) => (
              <div
                key={value}
                className={`px-6 py-3 rounded-full cursor-pointer bg-gray-200 text-gray-600 font-normal text-base border-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] ${
                  selectedVariant[prop.type] === value
                    ? "bg-black text-white border-black"
                    : "border-transparent"
                }`}
                onClick={() => onVariantChange(prop.type, value || "")}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductInfo;
