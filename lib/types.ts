export interface Product {
  supplier_code: string;
  name: string;
  dp_price: number;
  mrp_price: number;
  image: string;
}

export type SortOption = 'name' | 'price-low-high' | 'price-high-low' | 'discount';

export interface FilterOptions {
  priceRange: [number, number];
  supplier: string[];
  hasDiscount: boolean;
  priceRange2: [number, number];
  priceRange3: [number, number];
  priceRange4: [number, number];
  priceRange5: [number, number];
}