"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {
  Edit,
  Trash,
  Plus,
  Filter,
  Search,
  MoreVertical,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserBlogs } from "@/api-handeling/apis/getApi";
import { useAuth } from "../context/AuthContext";


export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const { data: blogs = [] } = useQuery({
    queryKey: ["my-blogs", userId],
    queryFn: () => getUserBlogs(userId),
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth/login");
    } else {
      setUserId(storedUserId);
    }
  }, []);

  const deletePost = (id: number) => {
    // setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const toggleStatus = (id: number) => {
    // setBlogs(
    //   blogs.map((blog) =>
    //     blog.id === id
    //       ? {
    //           ...blog,
    //           status: blog.status === "published" ? "draft" : "published",
    //         }
    //       : blog
    //   )
    // );
  };

  if (!blogs) return <div>Loading...</div>;

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content.
          </p>
        </div>
        <Link href="/dashboard/create?mode=create">
          <Button className="bg-sky-500 hover:bg-sky-600">
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <div className="hidden md:flex items-center gap-2">
            <div className="relative w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search posts..." className="pl-8" />
            </div>
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
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <BlogTable
            blogs={blogs}
            deletePost={deletePost}
            toggleStatus={toggleStatus}
          />
        </TabsContent>

        <TabsContent value="published">
          <BlogTable
            blogs={(blogs || [])?.filter((blog: any) => blog.status)}
            deletePost={deletePost}
            toggleStatus={toggleStatus}
          />
        </TabsContent>

        <TabsContent value="drafts">
          <BlogTable
            blogs={(blogs || [])?.filter((blog: any) => !blog.status)}
            deletePost={deletePost}
            toggleStatus={toggleStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface BlogTableProps {
  blogs: any[];
  deletePost: (id: number) => void;
  toggleStatus: (id: number) => void;
}

function BlogTable({ blogs, deletePost, toggleStatus }: BlogTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              <div className="flex items-center gap-2">
                Post
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden relative">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-medium truncate max-w-[200px] md:max-w-xs">
                        {blog.title}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={blog.status}
                      onCheckedChange={() => toggleStatus(blog._id)}
                    />
                    <Badge
                      variant={
                        blog.status === "published" ? "default" : "secondary"
                      }
                    >
                      {blog.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{blog.category}</Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(blog.createdAt, { addSuffix: true })}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link
                          href={`/dashboard/create?mode=edit&id=${blog._id}`}
                        >
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/blog/${blog._id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deletePost(blog.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No posts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
