"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { useDebounce } from "@/components/my-functions/Debounce";
import { Button } from "@/components/ui/button";
import { paginationContent } from "@/components/my-functions/ReactQuill";

export const BlogFilterBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize filter state from URL params with sensible defaults
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    sort: searchParams.get("sort") || "desc",
    limit: searchParams.get("limit") || "10",
    page: searchParams.get("page") || "1",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const [paginationData, setPaginationData] = useState({
    total: "0",
    page: "1",
    limit: "10",
    totalPages: "1",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Update filter and reset to page 1 when any filter changes except page
  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : "1",
    }));
  };

  // Update URL and fetch data when filters change
  useEffect(() => {
    const updateUrlAndFetchData = async () => {
      setIsLoading(true);
      // Update URL params
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (filters.category !== "all") params.set("category", filters.category);
      if (filters.sort) params.set("sort", filters.sort);
      if (filters.limit) params.set("limit", filters.limit);
      if (filters.page) params.set("page", filters.page);

      // Push URL without causing a page reload
      router.push(`/blog?${params.toString()}`, { scroll: false });

      try {
        // Fetch data with current filters
        const data = await paginationContent();
        // console.log("data", data);
        setPaginationData({
          total: data?.total,
          page: data?.page,
          limit: data?.limit,
          totalPages: data?.totalPages,
        });
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    updateUrlAndFetchData();
  }, [
    debouncedSearch,
    filters.category,
    filters.sort,
    filters.limit,
    filters.page,
    router,
  ]);

  // Calculate displayed items range
  const currentPage = parseInt(filters.page, 10);
  const itemsPerPage = parseInt(filters.limit, 10);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, +paginationData.total);

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4 md:items-center mb-8">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          aria-label="Search articles"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.category}
          onValueChange={(val) => updateFilter("category", val)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="health">Health</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sort}
          onValueChange={(val) => updateFilter("sort", val)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest</SelectItem>
            <SelectItem value="asc">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.limit}
          onValueChange={(val) => updateFilter("limit", val)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 per page</SelectItem>
            <SelectItem value="15">15 per page</SelectItem>
            <SelectItem value="25">25 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => updateFilter("page", String(currentPage - 1))}
          disabled={currentPage <= 1 || isLoading}
          size="sm"
          variant="outline"
          aria-label="Previous page"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm whitespace-nowrap">
          {+paginationData.total > 0
            ? `${startItem}-${endItem} of ${paginationData.total}`
            : "No results"}
        </span>

        <Button
          onClick={() => updateFilter("page", String(currentPage + 1))}
          // disabled={currentPage === +paginationData.totalPages}
          size="sm"
          variant="outline"
          aria-label="Next page"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
