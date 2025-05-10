// components/PostCard.jsx
"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyIntractionsById,
  myIntrections,
} from "@/api-handeling/apis/getApi";
import { FaHeart, FaRegHeart, FaRegStar } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { useLikePost } from "@/api-handeling/apis/postPutApis";

export default function PostCard({ post }: { post: any }) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { mutate } = useLikePost();

  const { data: interaction, refetch, error } = myIntrections(post?._id);
  console.log("interaction", interaction?.liked);

  const handleClick = () => {
    mutate(post?._id);
  };

  const liked = interaction?.liked;
  const bookmarked = interaction?.bookmarked;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <Link href={`/blog/${post._id}`}>
          <Image
            src={
              post.image ||
              "https://dummyimage.com/1024x600/000/0011ff.png&text=No+Image"
            }
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 left-2">
          <Badge className="bg-sky-500 hover:bg-sky-600">{post.category}</Badge>
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
            <div className="flex items-center gap-1 text-sm">
              <span onClick={handleClick} className="cursor-pointer">
                {liked ? (
                  <FaHeart size={22} className="text-red-600" />
                ) : (
                  <FaRegHeart size={22} />
                )}
              </span>
              <span className="text-lg">{post.likesCount || "0"}</span>
            </div>
            {/* <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", bookmarked && "text-sky-500")}
            >
              <FaRegStar size={20} />
              <span className="text-lg">{post.favourit || "0"}</span>
            </Button> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
