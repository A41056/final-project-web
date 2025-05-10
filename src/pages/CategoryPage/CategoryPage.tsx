import React from "react";
import { useParams } from "react-router-dom";
import { Category } from "@/types/category";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import ProductList from "@/components/ProductList/ProductList";
import Footer from "@/components/Footer";

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="font-satoshi">
      <div className="px-25 py-5">
        <div className="flex gap-7.5">
          {slug && <FilterPanel categorySlug={slug} />}
          {slug && <ProductList slug={slug} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
