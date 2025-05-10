import React, { useState } from "react";
import { Button, Slider, Spin } from "antd";
import { icons } from "../../assets/icons";
import { catalogApi } from "@/config/api";

interface FilterOptions {
  tags: string[];
  minPrice: number;
  maxPrice: number;
  properties: Record<string, string[]>;
}

const FilterPanel: React.FC<{ categorySlug: string }> = ({ categorySlug }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  const { data, isLoading } = catalogApi.useGet<FilterOptions>(
    "/products/filter-options",
    { categorySlug },
    {
      onSuccess: (data) => {
        setPriceRange([data.minPrice, data.maxPrice]);
      },
    }
  );

  if (isLoading || !data) return <Spin />;

  const { tags, minPrice, maxPrice, properties } = data;

  return (
    <div className="filter">
      <div className="filter-title">
        <p className="filter-heading">Filters</p>
        <div className="filter-image">
          <img src={icons.filter} alt="Filter" />
        </div>
      </div>
      <hr />
  
      <div className="filter-by-type">
        {tags.map((tag) => (
          <div key={tag} className="t-shirt-type">
            <p>{tag}</p>
            <div className="type-image">
              <img src={icons.rightNav} alt="Nav" />
            </div>
          </div>
        ))}
      </div>
      <hr />
  
      <div className="filter-by-price">
        <div className="filter-by-price-title">
          <p className="filter-heading">Price</p>
          <div className="filter-image">
            <img src={icons.upArrow} alt="Toggle" />
          </div>
        </div>
        <div className="price-slider-container">
          <div className="price-slider">
            <Slider
              range
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
            />
          </div>
          <div className="price-values">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      <hr />
  
      {Object.entries(properties).map(([key, values]) => (
        <div key={key}>
          <div className="filter-section-title">
            <p className="filter-heading">{key}</p>
            <div className="filter-image">
              <img src={icons.upArrow} alt="Toggle" />
            </div>
          </div>
          <div className={values.length > 8 ? "size-items" : "filter-by-dress-style"}>
            {values.map((val) => (
              <div key={val} className="size-item">
                <p>{val}</p>
              </div>
            ))}
          </div>
          <hr />
        </div>
      ))}
  
      <button className="apply-filter" onClick={() => console.log("Apply filters", { priceRange })}>
        <p>Apply Filter</p>
      </button>
    </div>
  );
};

export default FilterPanel;