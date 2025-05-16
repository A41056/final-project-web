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

interface FilterPanelProps {
  categorySlug: string;
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ categorySlug, onFilterChange }) => {
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

  const handleApplyFilters = () => {
    console.log("FilterPanel Apply Filter");
    
    onFilterChange({
      priceMin: priceRange[0],
      priceMax: priceRange[1],
    });
  };

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
  
      <div className="filter-section">
        <div className="filter-section-title">
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
        <div className="filter-section" key={key}>
          <div className="filter-section-title">
            <p className="filter-heading">{key}</p>
            <div className="filter-image">
              <img src={icons.upArrow} alt="Toggle" />
            </div>
          </div>
          <div className={"size-items"}>
            {values.map((val) => (
              <div key={val} className="size-item">
                <p>{val}</p>
              </div>
            ))}
          </div>
          <hr />
        </div>
      ))}
  
      <button className="apply-filter" onClick={handleApplyFilters}>
        <p>Apply Filter</p>
      </button>
    </div>
  );
};

export default FilterPanel;