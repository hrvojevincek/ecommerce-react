import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-10">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-l-md text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </Button>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-r-md text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
