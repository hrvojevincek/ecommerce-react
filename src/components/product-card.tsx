import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/services/api.types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="w-full h-48 bg-white flex items-center justify-center overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-4">
        <div>
          <CardTitle className="text-lg mb-2">{product.title}</CardTitle>
          <p className="text-sm text-gray-600 mb-2">
            {truncateDescription(product.description, 100)}
          </p>
        </div>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
