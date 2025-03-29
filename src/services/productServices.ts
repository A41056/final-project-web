import { catalogApi } from "@/config/api";
import { Product } from "@/types/product";

export const getTopHotProducts = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<Product[]> => {
  const response = await catalogApi.get("/products/top-hot", {
    pageNumber,
    pageSize,
  });
  return response.products;
};

export const getProducts = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
  categoryIds?: string[],
  isHot?: boolean,
  isActive?: boolean,
  createdFrom?: string,
  createdTo?: string
): Promise<{ products: Product[]; totalItems: number }> => {
  const response = await catalogApi.get("/products", {
    pageNumber,
    pageSize,
    search,
    categoryIds,
    isHot,
    isActive,
    createdFrom,
    createdTo,
  });
  return {
    products: response.products,
    totalItems: response.totalItems,
  };
};
