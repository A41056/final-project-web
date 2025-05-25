import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Slider from "react-slick";
import "../../assets/css/globalStyle.css";
const ProductImages = ({ allImages, selectedImage, onImageClick, }) => {
    const carouselSettings = {
        slidesToShow: Math.min(allImages.length, 3),
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        dots: false,
        vertical: false,
        centerMode: false,
    };
    return (_jsxs("div", { className: "flex flex-col gap-4 w-full md:w-1/2", children: [_jsx("div", { className: "flex-1 max-w-[700px]", children: _jsx("img", { src: selectedImage, alt: "Main product", className: "w-full max-h-[700px] object-contain bg-[#f0eeed]" }) }), _jsx("div", { className: "w-full", children: _jsx(Slider, { ...carouselSettings, className: "horizontal-slider", children: allImages.map((img, index) => (_jsx("div", { className: "p-2 flex justify-center", children: _jsx("img", { src: img, alt: `Product ${index + 1}`, className: `w-20 h-20 object-cover bg-[#f0eeed] cursor-pointer ${selectedImage === img ? "border-2 border-black" : ""}`, onClick: () => onImageClick(img) }) }, index))) }) })] }));
};
export default ProductImages;
