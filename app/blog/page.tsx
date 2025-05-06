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
import { useGetAllBlogs } from "@/components/my-functions/useGetAllBlogs";
import { BlogFilterBar } from "./BlogFilters";

interface blogFilterProps {
  searchParams: {
    search?: string;
    sort?: string;
    limit?: string;
    category?: string;
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: blogFilterProps) {
  const {
    search = "",
    sort = "desc",
    limit = "10",
    category = "",
    page = "1",
  } = searchParams;

  const blogData = await useGetAllBlogs({
    search,
    sort,
    limit: Number(limit),
    category,
    page: Number(page),
  });

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
        <BlogFilterBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData?.data?.map((post: any) => (
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
