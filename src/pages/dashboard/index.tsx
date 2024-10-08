import CategoriesFilter from "@/components/categories-filter";
import LoadingSpinner from "@/components/loading-spinner";
import { PaginationComponent } from "@/components/pagination-component";
import ProductCard from "@/components/product-card";
import Search from "@/components/search";
import { useProducts } from "@/hooks/useApi";

export function Dashboard() {
  const { data: products, isLoading } = useProducts({
    limit: 20,
    skip: 0,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="md:col-span-1">
          <CategoriesFilter />
        </div>

        {/* Products grid */}
        <div className="md:col-span-3 space-y-4">
          <Search />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <PaginationComponent />
      </div>
    </div>
  );
}
