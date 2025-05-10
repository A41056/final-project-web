import React from "react";
import { useParams } from "react-router-dom";
import { Category } from "@/types/category";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import ProductList from "@/components/ProductList/ProductList";
import Footer from "@/components/Footer";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  return (
    <div className="font-satoshi">
      <Navbar />
      <div className="px-25 py-5">
        <Breadcrumb categoryId={categoryId} />
        <div className="flex gap-7.5">
          <FilterPanel />
          {categoryId && <ProductList categoryId={categoryId} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
