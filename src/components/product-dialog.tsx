import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Product } from "@/services/api.types";

interface ProductDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDialog({
  product,
  isOpen,
  onClose,
}: ProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription>Product Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="col-span-4 w-full h-64 object-contain"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Price:</span>
            <span className="col-span-3">${product.price.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Description:</span>
            <p className="col-span-3">{product.description}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Category:</span>
            <span className="col-span-3">{product.category}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Warranty:</span>
            <span className="col-span-3">{product.warrantyInformation}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Shipping:</span>
            <span className="col-span-3">{product.shippingInformation}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Availability:</span>
            <span className="col-span-3">{product.availabilityStatus}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Rating:</span>
            <span className="col-span-3">{product.rating} / 5</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
