import { useMemo, useState } from "react";
import CategoriesFilter from "@/components/categories-filter";
import LoadingSpinner from "@/components/loading-spinner";
import { PaginationComponent } from "@/components/pagination-component";
import ProductCard from "@/components/product-card";
import Search from "@/components/search";
import { useProducts } from "@/hooks/useApi";

interface FilterOptions {
  category: string | null;
  priceRange: string[];
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
}

export function Dashboard() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    priceRange: [],
    sortBy: null,
    sortOrder: null,
  });

  const { data: productsData, isLoading } = useProducts({
    category: filters.category || undefined,
    limit: 20,
  });

  const filteredProducts = useMemo(() => {
    if (!productsData) return [];
    
    return productsData.products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      
      if (filters.priceRange.length > 0) {
        const price = product.price;
        return filters.priceRange.some(range => {
          const [min, max] = range.split('-').map(Number);
          return price >= min && price <= max;
        });
      }
      
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'name') {
        return filters.sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (filters.sortBy === 'price') {
        return filters.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
  }, [productsData, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <CategoriesFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="md:col-span-3 space-y-4">
          <Search />
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
