import React, { useState } from "react";
import { Button, Slider } from "antd";
import { icons } from "../../assets/icons";

const FilterPanel: React.FC = () => {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const types = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const colors = [
    "#00C12B",
    "#F50606",
    "#F5DD06",
    "#F57906",
    "#06CAF5",
    "#063AF5",
    "#7D06F5",
    "#F506A4",
    "#FFFFFF",
    "#000000",
  ];
  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];

  return (
    <div className="w-[295px] border border-gray-200 rounded-xl p-6 flex flex-col gap-6">
      {/* Filter by Type */}
      <div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">Filters</p>
          <img src={icons.filter} alt="Filter" className="w-6 h-6" />
        </div>
        <hr className="my-4 border-gray-200" />
        <div className="flex flex-col gap-5">
          {types.map((type) => (
            <div key={type} className="flex justify-between items-center">
              <p className="text-gray-600 text-base">{type}</p>
              <img src={icons.rightNav} alt="Nav" className="w-3 h-3" />
            </div>
          ))}
        </div>
      </div>

      {/* Filter by Price */}
      <div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">Price</p>
          <img src={icons.upArrow} alt="Toggle" className="w-6 h-6" />
        </div>
        <div className="py-5">
          <Slider
            range
            min={0}
            max={500}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
            className="w-full"
          />
          <div className="flex justify-between text-sm font-medium">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      <hr className="border-gray-200" />

      {/* Filter by Color */}
      <div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">Colors</p>
          <img src={icons.upArrow} alt="Toggle" className="w-6 h-6" />
        </div>
        <div className="grid grid-cols-5 gap-2.5 py-5">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-9 h-9 rounded-full border-2 border-gray-300 cursor-pointer"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <hr className="border-gray-200" />

      {/* Filter by Size */}
      <div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">Size</p>
          <img src={icons.upArrow} alt="Toggle" className="w-6 h-6" />
        </div>
        <div className="flex flex-wrap gap-3 py-5">
          {sizes.map((size) => (
            <div
              key={size}
              className="bg-gray-100 rounded-full px-5 py-2.5 text-gray-600 text-base cursor-pointer hover:bg-black hover:text-white"
            >
              {size}
            </div>
          ))}
        </div>
      </div>
      <hr className="border-gray-200" />

      {/* Filter by Dress Style */}
      <div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">Dress Style</p>
          <img src={icons.upArrow} alt="Toggle" className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-5 py-5">
          {dressStyles.map((style) => (
            <div key={style} className="flex justify-between items-center">
              <p className="text-gray-600 text-base">{style}</p>
              <img src={icons.rightNav} alt="Nav" className="w-3 h-3" />
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filter Button */}
      <Button
        className="bg-black text-white rounded-full h-12 flex items-center justify-center font-medium text-sm"
        onClick={() => console.log("Apply filters", { priceRange })}
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default FilterPanel;
