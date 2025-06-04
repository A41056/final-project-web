import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import ProductList from "@/components/ProductList/ProductList";

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filters, setFilters] = useState<any>({});

  return (
    <div className="font-satoshi">
      <div className="px-25 py-5">
        <div className="container flex flex-row items-start justify-start gap-6 py-5 max-w-full">
          {slug && (
            <div className="w-full md:w-1/4">
              <FilterPanel categorySlug={slug} onFilterChange={setFilters} />
            </div>
          )}
          {slug && (
            <div className="w-full md:w-3/4">
              <ProductList slug={slug} filters={filters} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;