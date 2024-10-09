import CategoriesFilter from "@/components/categories-filter";
import LoadingSpinner from "@/components/loading-spinner";
import { PaginationComponent } from "@/components/pagination-component";
import ProductCard from "@/components/product-card";
import Search from "@/components/search";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";

export function Dashboard() {
  const {
    products: filteredProducts,
    isLoading,
    filters,
    handleFilterChange,
    handleSearch,
  } = useFilteredProducts({
    category: null,
    priceRange: [],
    sortBy: null,
    sortOrder: null,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <CategoriesFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="md:col-span-3 space-y-4">
          <Search onSearch={handleSearch} />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts?.map((product) => (
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
