"use client";

import { FilterOptions, SortOption } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Switch } from "./ui/switch";
import { X } from "lucide-react";

interface FiltersProps {
  suppliers: string[];
  priceRange: { min: number; max: number };
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function Filters({
  suppliers,
  priceRange,
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
}: FiltersProps) {
  const resetFilters = () => {
    onFilterChange({
      priceRange: [priceRange.min, priceRange.max],
      supplier: [],
      hasDiscount: false,
      priceRange2: [0, 0],
      priceRange3: [0, 0],
      priceRange4: [0, 0],
      priceRange5: [0, 0],
    });
    onSortChange("name");
  };

  const hasActiveFilters = 
    filters.supplier.length > 0 ||
    filters.hasDiscount ||
    filters.priceRange[0] !== priceRange.min ||
    filters.priceRange[1] !== priceRange.max ||
    filters.priceRange2[0] !== 0 ||
    filters.priceRange3[0] !== 0 ||
    filters.priceRange4[0] !== 0 ||
    filters.priceRange5[0] !== 0;

  return (
    <Card className="sticky top-20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="h-8 px-2"
          >
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="price-range">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4">
                <Slider
                  min={priceRange.min}
                  max={priceRange.max}
                  step={1}
                  value={[filters.priceRange[0], filters.priceRange[1]]}
                  onValueChange={(value) => 
                    onFilterChange({ ...filters, priceRange: [value[0], value[1]] })
                  }
                  className="mt-2"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">
                    ₹{filters.priceRange[0].toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ₹{filters.priceRange[1].toFixed(2)}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price-brackets">
            <AccordionTrigger>Price Brackets</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-0-500">Under ₹500</Label>
                  <Switch
                    id="price-0-500"
                    checked={filters.priceRange2[0] !== 0}
                    onCheckedChange={(checked) =>
                      onFilterChange({
                        ...filters,
                        priceRange2: checked ? [0, 500] : [0, 0],
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-501-1000">₹501 - ₹1000</Label>
                  <Switch
                    id="price-501-1000"
                    checked={filters.priceRange3[0] !== 0}
                    onCheckedChange={(checked) =>
                      onFilterChange({
                        ...filters,
                        priceRange3: checked ? [501, 1000] : [0, 0],
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-1001-2000">₹1001 - ₹2000</Label>
                  <Switch
                    id="price-1001-2000"
                    checked={filters.priceRange4[0] !== 0}
                    onCheckedChange={(checked) =>
                      onFilterChange({
                        ...filters,
                        priceRange4: checked ? [1001, 2000] : [0, 0],
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-2001-plus">Above ₹2000</Label>
                  <Switch
                    id="price-2001-plus"
                    checked={filters.priceRange5[0] !== 0}
                    onCheckedChange={(checked) =>
                      onFilterChange({
                        ...filters,
                        priceRange5: checked ? [2001, Infinity] : [0, 0],
                      })
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="suppliers">
            <AccordionTrigger>Suppliers</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {suppliers.map((supplier) => (
                  <div key={supplier} className="flex items-center space-x-2">
                    <Checkbox
                      id={supplier}
                      checked={filters.supplier.includes(supplier)}
                      onCheckedChange={(checked) => {
                        const newSuppliers = checked
                          ? [...filters.supplier, supplier]
                          : filters.supplier.filter((s) => s !== supplier);
                        onFilterChange({ ...filters, supplier: newSuppliers });
                      }}
                    />
                    <Label 
                      htmlFor={supplier} 
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {supplier}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="discounts">
            <AccordionTrigger>Discounts</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="hasDiscount">Show Only Discounted Items</Label>
                <Switch
                  id="hasDiscount"
                  checked={filters.hasDiscount}
                  onCheckedChange={(checked) =>
                    onFilterChange({ ...filters, hasDiscount: checked })
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}