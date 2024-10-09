import CategoriesFilter from "@/components/categories-filter";
import LoadingSpinner from "@/components/loading-spinner";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import Search from "@/components/search";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 12;

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          ) : paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No products found.</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
