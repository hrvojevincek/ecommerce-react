import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useCategories } from "@/hooks/useApi";
import { formatCategoryName } from "@/lib/format-category-name";

interface FilterOptions {
  category: string | null;
  priceRange: string[];
  sortBy: string | null;
  sortOrder: "asc" | "desc" | null;
}

interface CategoriesFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  onFilterChange,
}) => {
  const { data: categories, isLoading } = useCategories();
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    priceRange: [],
    sortBy: null,
    sortOrder: null,
  });

  const handleFilterChange = (
    name: string,
    value: string | string[] | null
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handlePriceRangeChange = (range: string) => {
    const updatedRanges = filters.priceRange.includes(range)
      ? filters.priceRange.filter((r) => r !== range)
      : [...filters.priceRange, range];
    handleFilterChange("priceRange", updatedRanges);
  };

  return (
    <div className="flex flex-col space-y-6 gap-2 border rounded-md p-2">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 border rounded-md px-2 py-1">
            {filters.category
              ? formatCategoryName(filters.category)
              : "Categories"}
            <ChevronDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select a category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleFilterChange("category", null)}
            >
              All Categories
            </DropdownMenuItem>
            {isLoading ? (
              <DropdownMenuItem>Loading categories...</DropdownMenuItem>
            ) : (
              categories?.map((category) => (
                <DropdownMenuItem
                  key={category.slug}
                  onClick={() => handleFilterChange("category", category.slug)}
                >
                  {formatCategoryName(category.name)}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col space-y-3 border rounded-md p-2">
        <Label className="text-base">Price Range</Label>
        {["10-50", "50-100", "100-200"].map((range) => (
          <div key={range} className="flex items-center space-x-2">
            <Checkbox
              id={`range-${range}`}
              checked={filters.priceRange.includes(range)}
              onCheckedChange={() => handlePriceRangeChange(range)}
            />
            <label
              htmlFor={`range-${range}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              ${range}
            </label>
          </div>
        ))}
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 border rounded-md px-2 py-1">
            Sort Order: {filters.sortOrder || "Default"}
            <ChevronDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent customHeight="max-h-[8rem]">
            <DropdownMenuItem
              onClick={() => handleFilterChange("sortOrder", "desc")}
            >
              Descending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilterChange("sortOrder", "asc")}
            >
              Ascending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 border rounded-md px-2 py-1">
            Sort by: {filters.sortBy || "Default"}
            <ChevronDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent customHeight="max-h-[8rem]">
            <DropdownMenuItem
              onClick={() => handleFilterChange("sortBy", "name")}
            >
              Name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilterChange("sortBy", "price")}
            >
              Price
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CategoriesFilter;
