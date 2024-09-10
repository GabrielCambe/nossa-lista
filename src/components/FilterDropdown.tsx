import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilterIcon, ChevronDownIcon } from "@/components/icons";

interface FilterDropdownProps {
  value: string; // New prop for selected category
  onSelect: (category: string) => void;
  categories: string[];
}

export function FilterDropdown({
  categories,
  onSelect,
  value,
}: FilterDropdownProps) {
  const handleSelect = (category: string) => {
    onSelect(category);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          <span>{value}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {categories.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => handleSelect(category)}
          >
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
