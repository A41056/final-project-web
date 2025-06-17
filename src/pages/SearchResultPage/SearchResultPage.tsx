import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import ProductList from "@/components/ProductList/ProductList";

const SearchResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<any>({});
  const query = searchParams.get("q") || "";

  return (
    <div className="font-satoshi">
      <div className="px-25 py-5">
        <div className="container flex flex-row items-start justify-start gap-6 py-5 max-w-full">
          <div className="w-full md:w-3/4">
            <ProductList
              endpoint="/products/search"
              filters={{ query, ...filters }}
              searchMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;