import React from "react";
import Slider from "react-slick";
import "../../assets/css/globalStyle.css";

interface ProductImagesProps {
  allImages: string[];
  selectedImage: string;
  onImageClick: (image: string) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({
  allImages,
  selectedImage,
  onImageClick,
}) => {
  const carouselSettings = {
    slidesToShow: Math.min(allImages.length, 3),
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    dots: false,
    vertical: false,
    centerMode: false,
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-1/2">
      <div className="flex-1 max-w-[700px]">
        <img
          src={selectedImage}
          alt="Main product"
          className="w-full max-h-[700px] object-contain bg-[#f0eeed]"
        />
      </div>
      <div className="w-full">
        <Slider {...carouselSettings} className="horizontal-slider">
          {allImages.map((img, index) => (
            <div key={index} className="p-2 flex justify-center">
              <img
                src={img}
                alt={`Product ${index + 1}`}
                className={`w-20 h-20 object-cover bg-[#f0eeed] cursor-pointer ${
                  selectedImage === img ? "border-2 border-black" : ""
                }`}
                onClick={() => onImageClick(img)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImages;
