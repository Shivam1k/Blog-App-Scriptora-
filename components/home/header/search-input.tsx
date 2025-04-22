"use client";

import { Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input"; // Adjust the path based on your project structure
import { useSearchParams } from "next/navigation";
import { SearchAction } from "@/actions/search";

const SearchInput = () => {
  const searchParams = useSearchParams();


  return (
    <form action={SearchAction}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          name="search"
          defaultValue={searchParams.get("search") || ""}
          placeholder="Search Article..."
          className="pl-10 w-48 focus-visible:ring-1"
        />
      </div>
    </form>
  );
};

export default SearchInput;
