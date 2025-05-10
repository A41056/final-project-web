export interface Product {
  id: string;
  name: string;
  description: string;
  imageFiles: string[];
  isHot: boolean;
  isActive: boolean;
  created: string;
  modified: string;
  categoryIds: string[];
  variants: ProductVariant[];
  averageRating: number;
}

export interface ProductVariant {
  properties: VariantProperty[];
  price: number;
  stockCount: number;
}

export interface VariantProperty {
  type: string;
  value: string;
  image?: string;
}

export interface GetProductsRequest {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  categoryIds?: string[];
  isHot?: boolean;
  isActive?: boolean;
  createdFrom?: string;
  createdTo?: string;
}

export interface GetProductsResponse {
  products: Product[];
  totalItems: number;
}

export interface ProductCardData {
  id: string;
  img: string;
  name: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
}
