"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Edit, Trash, Plus, MoreVertical, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserBlogs } from "@/api-handeling/apis/getApi";
import BlogLoader from "@/components/my-functions/Loader";
import {
  useDeleteItem,
  useUpdateToggle,
} from "@/components/my-functions/useDeleteBlog";

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const { data: blogs = [], isLoading: BlogLoading } = useQuery({
    queryKey: ["my-blogs", userId],
    queryFn: () => getUserBlogs(userId),
    enabled: !!userId,
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

  const { mutate: deleteBlog } = useDeleteItem("my-blogs");

  const deletePost = (id: string) => {
    deleteBlog(id);
  };

  const { mutate: toggleBlogStatus } = useUpdateToggle("my-blogs");

  const toggleStatus = (id: string, currentStatus: string) => {
    toggleBlogStatus({ id, currentStatus });
  };

  if (!blogs.success || BlogLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <BlogLoader />
      </div>
    );

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-between items-center gap-2 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          {/* <div className="hidden md:flex items-center gap-2">
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
          </div> */}
          <Link href="/dashboard/create?mode=create">
            <Button className="bg-sky-500 hover:bg-sky-600">
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </Link>
        </div>

        {BlogLoading ? (
          <p>Loading blogs...</p>
        ) : (
          <>
            <TabsContent value="all">
              <BlogTable
                blogs={blogs?.data}
                deletePost={deletePost}
                toggleStatus={toggleStatus}
              />
            </TabsContent>

            <TabsContent value="published">
              <BlogTable
                blogs={(blogs?.data || []).filter((blog: any) => blog.status)}
                deletePost={deletePost}
                toggleStatus={toggleStatus}
              />
            </TabsContent>

            <TabsContent value="drafts">
              <BlogTable
                blogs={(blogs?.data || [])?.filter((blog: any) => !blog.status)}
                deletePost={deletePost}
                toggleStatus={toggleStatus}
              />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

interface BlogTableProps {
  blogs: any[];
  deletePost: (id: string) => void;
  toggleStatus: (id: string, currentStatus: string) => void;
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
          {blogs?.length > 0 ? (
            blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden relative">
                      <Image
                        src={
                          blog.image ||
                          "https://dummyimage.com/1024x600/000/0011ff.png&text=No+Image"
                        }
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
                      checked={blog?.status}
                      onCheckedChange={() =>
                        toggleStatus(blog._id, blog?.status)
                      }
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
                          onClick={() => deletePost(blog._id)}
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
