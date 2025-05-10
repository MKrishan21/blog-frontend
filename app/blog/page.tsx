"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "@/api-handeling/apis/getApi";
import { useState } from "react";
import { useDebounce } from "@/components/my-functions/Debounce";
import CustomPagination from "@/components/my-functions/CostomPAgination";
import FeaturedPosts from "@/components/featured-posts";
import PostCard from "@/components/featured-posts";

export default function BlogPage() {
  const [state, setState] = useState({
    search: "",
    page: 1,
    limit: 5,
    sort: "desc",
    category: "",
  });
  const updateState = (key: string, value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const debouncedSearch = useDebounce(state.search, 1000);

  const { data: blogData, isLoading } = useQuery({
    queryKey: [
      "blogs",
      {
        search: debouncedSearch,
        page: state.page,
        limit: state.limit,
        sort: state.sort,
        category: state.category,
      },
    ],
    queryFn: getAllBlogs,
  });
  const totalPages = blogData?.pagination?.totalPages || 1;

  return (
    <div className="container py-8 md:py-12">
      <div className=" max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Blog Articles
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Explore our collection of thoughtful articles on technology,
          lifestyle, business, and more.
        </p>
      </div>
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-1 rounded-lg mb-4">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4 md:items-center mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-9"
              onChange={(e) => updateState("search", e.target.value)}
              aria-label="Search articles"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-2">
            <Select
              value={state.category}
              onValueChange={(value) => updateState("category", value)}
            >
              <SelectTrigger className="w-[100px]">
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
              value={state.sort}
              onValueChange={(value) => updateState("sort", value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => updateState("limit", value)}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <section className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {blogData?.data?.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>

      <div className="flex items-center gap-2 mt-10">
        <CustomPagination
          currentPage={state.page}
          totalPages={totalPages}
          onPageChange={(page) => updateState("page", page)}
        />
      </div>
    </div>
  );
}
