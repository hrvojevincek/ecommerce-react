import { useState, useMemo, useCallback } from "react";
import { useProducts as useProductsApi } from "@/hooks/useApi";
import { Product } from "@/services/api.types";
import debounce from "lodash/debounce";

interface FilterOptions {
  category: string | null;
  priceRange: string[];
  sortBy: string | null;
  sortOrder: "asc" | "desc" | null;
}

export function useFilteredProducts(initialFilters: FilterOptions) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: productsData,
    isLoading,
    error,
  } = useProductsApi({
    category: filters.category || undefined,
    limit: 20,
  });

  const filteredProducts = useMemo(() => {
    if (!productsData) return [];

    return productsData.products
      .filter((product: Product) => {
        // Apply search filter
        if (
          searchTerm &&
          !product.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        // Apply category filter
        if (filters.category && product.category !== filters.category) {
          return false;
        }

        // Apply price range filter
        if (filters.priceRange.length > 0) {
          const price = product.price;
          return filters.priceRange.some((range) => {
            const [min, max] = range.split("-").map(Number);
            return price >= min && price <= max;
          });
        }

        return true;
      })
      .sort((a: Product, b: Product) => {
        if (filters.sortBy === "name") {
          return filters.sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else if (filters.sortBy === "price") {
          return filters.sortOrder === "asc"
            ? a.price - b.price
            : b.price - a.price;
        }
        return 0;
      });
  }, [productsData, filters, searchTerm]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const handleSearch = (term: string) => {
    debouncedSearch(term);
  };

  return {
    products: filteredProducts,
    isLoading,
    error,
    filters,
    handleFilterChange,
    handleSearch,
  };
}
