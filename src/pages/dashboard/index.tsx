// src/pages/dashboard/index.tsx
import { useAuth } from "@/contexts/auth-context";

export function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  //   const { data: products, isLoading } = useProducts({
  //     limit: 20,
  //     skip: 0,
  //   });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="md:col-span-1">{/* <ProductFilters /> */}</div>

        {/* Products grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* {products?.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAuthenticated={isAuthenticated}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
