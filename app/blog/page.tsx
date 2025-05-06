"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Search, Filter, ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "@/api-handeling/apis/getApi";
import { useState } from "react";
import { useDebounce } from "@/components/my-functions/Debounce";
import BlogLoader from "@/components/my-functions/Loader";
import CustomPagination from "@/components/my-functions/CostomPAgination";

export default function BlogPage() {
  const [state, setState] = useState({
    search: "",
    page: 1,
    limit: 5,
    sort: "asc",
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
  // if (isLoading)
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <BlogLoader />
  //     </div>
  //   );

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
          <div className="flex flex-wrap gap-2">
            <Select
              value={state.category}
              onValueChange={(value) => updateState("category", value)}
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
              value={state.sort}
              onValueChange={(value) => updateState("sort", value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => updateState("limit", value)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="15">15 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2">
            <CustomPagination
              currentPage={state.page}
              totalPages={totalPages}
              onPageChange={(page) => updateState("page", page)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData?.data
          ?.filter((blog: any) => blog?.status)
          ?.map((post: any) => (
            <Card
              key={post._id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-video relative overflow-hidden">
                <Link href={`/blog/${post._id}`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="absolute top-2 left-2">
                  <Badge className="bg-sky-500 hover:bg-sky-600">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post._id}`}>
                    <h3 className="text-xl font-semibold line-clamp-2 hover:text-sky-500 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground line-clamp-3">
                    {post?.shortDescription}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{post.author}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
