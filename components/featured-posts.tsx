"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Eye, MessageSquare, BookmarkPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function FeaturedPosts({ featuredPosts }: any) {
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {featuredPosts?.data?.slice(0, 6)?.map((post: any) => (
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
              <Link href={`/blog/${post?._id}`}>
                <h3 className="text-xl font-semibold line-clamp-2 hover:text-sky-500 transition-colors">
                  {post?.title}
                </h3>
              </Link>
              <p className="text-muted-foreground line-clamp-3">
                {post?.shortDescription}
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{post?.author?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post?.author}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                {/* <div className="flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div> */}
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8",
                    bookmarked.includes(post.id) && "text-sky-500"
                  )}
                  onClick={() => toggleBookmark(post.id)}
                >
                  <BookmarkPlus className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
