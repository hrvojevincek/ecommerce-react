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

const CategoriesFilter = () => {
  return (
    <div className="flex flex-col space-y-6 gap-2 border rounded-md p-2">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 border rounded-md px-2 py-1">
            Categories
            <ChevronDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>DEYA</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col space-y-3 border rounded-md p-2">
        <Label className="text-base">Price Range</Label>
        <div className="flex items-center space-x-2">
          <Checkbox id="range-10-50" />
          <label
            htmlFor="range-10-50"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            $10 - $50
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="range-50-100" />
          <label
            htmlFor="range-50-100"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            $50 - $100
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="range-100-200" />
          <label
            htmlFor="range-100-200"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            $100 - $200
          </label>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 border rounded-md px-2 py-1">
            Price:
            <ChevronDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Descending</DropdownMenuItem>
            <DropdownMenuItem>Ascending</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 border rounded-md px-2 py-1">
            Sort by:
            <ChevronDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Name</DropdownMenuItem>
            <DropdownMenuItem>Price</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CategoriesFilter;
