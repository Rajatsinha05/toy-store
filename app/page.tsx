"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { Filters } from "@/components/filters";
import { products, getSuppliers, getPriceRange } from "@/lib/data";
import { FilterOptions, Product, SortOption } from "@/lib/types";
import { Footer } from "@/components/footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("name");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [getPriceRange().min, getPriceRange().max],
    supplier: [],
    hasDiscount: false,
    priceRange2: [0, 500],
    priceRange3: [501, 1000],
    priceRange4: [1001, 2000],
    priceRange5: [2001, Infinity],
  });

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesPriceRange =
        product.dp_price >= filters.priceRange[0] &&
        product.dp_price <= filters.priceRange[1];

      const matchesSupplier =
        filters.supplier.length === 0 ||
        filters.supplier.includes(product.supplier_code.split("-")[0]);

      const matchesDiscount = !filters.hasDiscount || 
        (product.mrp_price > 0 && product.mrp_price > product.dp_price);

      // Additional price range filters
      const inPriceRange2 = filters.priceRange2[0] <= product.dp_price && product.dp_price <= filters.priceRange2[1];
      const inPriceRange3 = filters.priceRange3[0] <= product.dp_price && product.dp_price <= filters.priceRange3[1];
      const inPriceRange4 = filters.priceRange4[0] <= product.dp_price && product.dp_price <= filters.priceRange4[1];
      const inPriceRange5 = filters.priceRange5[0] <= product.dp_price && product.dp_price <= filters.priceRange5[1];

      const matchesPriceRanges = 
        (!filters.priceRange2[0] && !filters.priceRange3[0] && !filters.priceRange4[0] && !filters.priceRange5[0]) ||
        (filters.priceRange2[0] && inPriceRange2) ||
        (filters.priceRange3[0] && inPriceRange3) ||
        (filters.priceRange4[0] && inPriceRange4) ||
        (filters.priceRange5[0] && inPriceRange5);

      return matchesSearch && matchesPriceRange && matchesSupplier && matchesDiscount && matchesPriceRanges;
    })
    .sort((a: Product, b: Product) => {
      switch (sortOption) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low-high":
          return a.dp_price - b.dp_price;
        case "price-high-low":
          return b.dp_price - a.dp_price;
        case "discount":
          const discountA = a.mrp_price > 0 ? ((a.mrp_price - a.dp_price) / a.mrp_price) * 100 : 0;
          const discountB = b.mrp_price > 0 ? ((b.mrp_price - b.dp_price) / b.mrp_price) * 100 : 0;
          return discountB - discountA;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onSearch={setSearchQuery} />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Toy Store Collection</h1>
          <p className="text-muted-foreground">
            Browse our extensive collection of high-quality toys and educational games
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <aside className="lg:col-span-1">
            <Filters
              suppliers={getSuppliers()}
              priceRange={getPriceRange()}
              filters={filters}
              onFilterChange={setFilters}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </aside>
          
          <div className="lg:col-span-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  className="w-full sm:w-auto border rounded-md px-3 py-2 bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.supplier_code} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-muted-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}