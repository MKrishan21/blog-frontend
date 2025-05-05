"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Search, Filter } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "@/api-handeling/apis/getApi";

export default function BlogPage() {
  const {
    data: blogData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    refetchOnWindowFocus: false,
  });

  console.log("data", blogData);

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Blog Articles
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Explore our collection of thoughtful articles on technology,
          lifestyle, business, and more.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-9" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((post: any) => (
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
                  {post.excerpt}
                </p>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  /> */}
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
