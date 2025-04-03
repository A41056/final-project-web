import React from "react";

interface ProductActionsProps {
  variants: Array<{
    properties: Array<{ type: string; value: string; image: string | null }>;
    price: number;
    stockCount: number;
  }>;
  selectedVariant: { [key: string]: string };
  quantity: number;
  onQuantityChange: (delta: number) => void;
  onAddToCart: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  variants,
  selectedVariant,
  quantity,
  onQuantityChange,
  onAddToCart,
}) => {
  const getTotalPrice = () => {
    const selectedVar = variants.find((v) =>
      v.properties.every((prop) => selectedVariant[prop.type] === prop.value)
    );
    const price = selectedVar ? selectedVar.price : variants[0]?.price || 0;
    return (price * quantity).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="total-price text-xl font-semibold">
        Total Price: ${getTotalPrice()}
      </div>
      <div className="add-quantity-group flex items-center justify-start gap-8 self-end w-full">
        <div className="add-quantity flex items-center justify-between w-40 h-12 bg-gray-200 rounded-full px-5">
          <button
            className="minus-button w-6 h-6 flex items-center justify-center bg-gray-200 border-none cursor-pointer"
            onClick={() => onQuantityChange(-1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="add-button w-6 h-6 flex items-center justify-center bg-gray-200 border-none cursor-pointer"
            onClick={() => onQuantityChange(1)}
          >
            +
          </button>
        </div>
        <button
          className="add-to-card bg-black text-white w-96 h-12 rounded-full px-12 cursor-pointer"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
