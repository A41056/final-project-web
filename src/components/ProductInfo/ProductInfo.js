import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ProductInfo = ({ name, description, variants, selectedVariant, onVariantChange, }) => {
    return (_jsxs("div", { className: "pt-6", children: [_jsx("h1", { className: "title text-4xl font-bold mb-4", children: name }), _jsx("p", { className: "description text-gray-600 mb-6", children: description }), variants[0]?.properties.map((prop) => (_jsxs("div", { className: "mb-4 mt-6", children: [_jsx("label", { className: "block font-medium mb-2", children: prop.type }), _jsx("div", { className: "sizes flex items-center justify-start gap-4 flex-wrap", children: Array.from(new Set(variants.map((v) => v.properties.find((p) => p.type === prop.type)?.value))).map((value) => (_jsx("div", { className: `px-6 py-3 rounded-full cursor-pointer bg-gray-200 text-gray-600 font-normal text-base border-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] ${selectedVariant[prop.type] === value
                                ? "bg-black text-white border-black"
                                : "border-transparent"}`, onClick: () => onVariantChange(prop.type, value || ""), children: value }, value))) })] }, prop.type)))] }));
};
export default ProductInfo;
