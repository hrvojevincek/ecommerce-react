import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    onSearch(inputValue);
  }, [inputValue, onSearch]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInputValue(newValue);
  }

  return (
    <form className="relative flex flex-1 flex-shrink-0 w-full rounded shadow-sm">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        onChange={handleInputChange}
        type="text"
        name="search"
        id="search"
        placeholder="Search products..."
        value={inputValue}
        className="w-full border-3 px-10 py-6 text-base md:text-sm overflow-hidden focus-visible:ring-0"
      />
    </form>
  );
};

export default Search;
