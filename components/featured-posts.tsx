"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Eye, MessageSquare, BookmarkPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const featuredPosts = [
  {
    id: 1,
    title: "The Future of AI in Everyday Life",
    excerpt: "Artificial intelligence is rapidly transforming how we live and work. Discover the latest innovations and how they might affect your daily routine.",
    category: "Technology",
    date: new Date(2023, 5, 12),
    readTime: "5 min read",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 1432,
    comments: 24
  },
  {
    id: 2,
    title: "Sustainable Living: Small Changes with Big Impact",
    excerpt: "Learn how minor adjustments to your daily habits can contribute to a more sustainable future for our planet.",
    category: "Lifestyle",
    date: new Date(2023, 6, 8),
    readTime: "8 min read",
    author: {
      name: "Samantha Lee",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    image: "https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 982,
    comments: 17
  },
  {
    id: 3,
    title: "Remote Work Revolution: Is the Office Obsolete?",
    excerpt: "The pandemic accelerated a shift to remote work. Now, companies are rethinking their workplace strategies entirely.",
    category: "Business",
    date: new Date(2023, 7, 20),
    readTime: "6 min read",
    author: {
      name: "David Chen",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 1195,
    comments: 32
  },
  {
    id: 4,
    title: "Mental Health: Breaking the Stigma",
    excerpt: "As awareness grows, more people are speaking openly about mental health challenges and seeking help.",
    category: "Health",
    date: new Date(2023, 8, 5),
    readTime: "7 min read",
    author: {
      name: "Michelle Rodriguez",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    image: "https://images.pexels.com/photos/697243/pexels-photo-697243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 2103,
    comments: 41
  },
  {
    id: 5,
    title: "Cryptocurrency: Understanding the Basics",
    excerpt: "From Bitcoin to blockchain, navigate the fundamental concepts behind the digital currency revolution.",
    category: "Finance",
    date: new Date(2023, 9, 15),
    readTime: "10 min read",
    author: {
      name: "James Peterson",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 1560,
    comments: 29
  },
  {
    id: 6,
    title: "Travel in a Post-Pandemic World",
    excerpt: "How the travel industry is adapting to new realities and what you should know before planning your next trip.",
    category: "Travel",
    date: new Date(2023, 10, 2),
    readTime: "9 min read",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    views: 876,
    comments: 14
  }
];

export default function FeaturedPosts() {
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {featuredPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
          <div className="aspect-video relative overflow-hidden">
            <Link href={`/blog/${post.id}`}>
              <Image
                src={post.image}
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
                <span>{formatDistanceToNow(post.date, { addSuffix: true })}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.id}`}>
                <h3 className="text-xl font-semibold line-clamp-2 hover:text-sky-500 transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8",
                    bookmarked.includes(post.id) && "text-sky-500"
                  )}
                  onClick={() => toggleBookmark(post.id)}
                >
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}