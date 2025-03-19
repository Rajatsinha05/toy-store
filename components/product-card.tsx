import { Product } from "@/lib/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.mrp_price > 0 
    ? Math.round(((product.mrp_price - product.dp_price) / product.mrp_price) * 100)
    : 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <CardContent className="p-0 relative">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=Product+Image";
            }}
          />
        </div>
        {discount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 right-2"
          >
            {discount}% OFF
          </Badge>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <Badge variant="secondary" className="text-xs mb-2">
            {product.supplier_code}
          </Badge>
          <h3 className="font-semibold text-base line-clamp-2 min-h-[2.5rem] mb-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-xl font-bold">₹{product.dp_price.toFixed(2)}</span>
            {product.mrp_price > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.mrp_price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}