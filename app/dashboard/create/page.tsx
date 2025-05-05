"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addBlog, editBlog } from "@/api-handeling/apis/postPutApis";
import { useAuth } from "@/app/context/AuthContext";
import { formats, modules } from "@/components/my-functions/ReactQuill";
import { getBlogById } from "@/api-handeling/apis/getApi";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const blogFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(10, "Content should be at least 10 characters"),
  shortDescription: z
    .string()
    .max(200, "Excerpt cannot exceed 200 characters")
    .optional(),
  category: z.string({
    required_error: "Please select a category",
  }),
  tags: z.string().nonempty("Tags are required"),
  image: z
    .any()
    .refine(
      (val) =>
        typeof val === "string" ||
        (typeof FileList !== "undefined" && val instanceof FileList),
      { message: "Image must be a FileList or a string" }
    )
    .optional(),
  author: z.string().min(1, "Author is required"),
});

export default function CreateBlogPage() {
  const router = useRouter();
  const [preview, setPreview] = useState(false);
  const { userData } = useAuth();

  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const isEditMode = searchParams.get("mode") === "edit";
  console.log("blogId", blogId);

  const { data: blogData, isLoading: blogLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => blogId && getBlogById(blogId),
    enabled: isEditMode,
  });

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blogData?.title || "",
      description: blogData?.description || "",
      category: blogData?.category || "",
      tags: blogData?.tags || "",
      author: blogData?.author || "",
      shortDescription: blogData?.shortDescription || "",
      image: blogData?.image || "",
      user: userData?._id || "",
    },
  });
  useEffect(() => {
    if (isEditMode && blogData) {
      form.reset({
        title: blogData.title,
        description: blogData.description,
        shortDescription: blogData.shortDescription,
        category: blogData.category,
        tags: blogData.tags,
        author: blogData.author,
        image: blogData.image,
      });
    }
  }, [blogData, isEditMode]);

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      isEditMode ? editBlog(blogId!, formData) : addBlog(formData),
    onSuccess: (message) => {
      if (message?.status === 400) {
        return toast.error("Failed to save post", {
          description: message?.message || "Please try again later.",
        });
      }
      router.push("/dashboard");
      toast.success(isEditMode ? "Post updated!" : "Post saved successfully!", {
        description: isEditMode
          ? "Your blog post has been updated."
          : "Your blog post has been created.",
      });
    },
    onError: (error) => {
      toast.error("Failed to save post", {
        description: error.message || "Please try again later.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof blogFormSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("shortDescription", values.shortDescription || "");
    formData.append("category", values.category);
    formData.append("author", values.author);
    formData.append("tags", values.tags || "");
    formData.append("user", userData?._id || "");

    if (values.image instanceof FileList && values.image.length > 0) {
      formData.append("image", values.image[0]);
    } else if (typeof values.image === "string") {
      formData.append("image", values.image);
    }

    mutation.mutate(formData);
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <Button
            variant="ghost"
            className="pl-0 flex items-center text-muted-foreground hover:text-foreground"
            onClick={() => router.push("/dashboard")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="blog-form"
            className="bg-sky-500 hover:bg-sky-600"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="edit" className="mb-8">
            <TabsList>
              <TabsTrigger value="edit" onClick={() => setPreview(false)}>
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" onClick={() => setPreview(true)}>
                Preview
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form id="blog-form" onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent value="edit" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the title of your blog post"
                            {...field}
                            className="text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <div className="min-h-[400px] prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight max-w-none">
                            <ReactQuill
                              theme="snow"
                              modules={modules}
                              formats={formats}
                              value={field.value}
                              onChange={field.onChange}
                              className="h-[350px] mb-12"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="preview">
                  {preview ? (
                    <div className="border rounded-lg p-6">
                      <h1 className="text-3xl font-bold mb-4">
                        {form.watch("title") || "Your Blog Post Title"}
                      </h1>
                      <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                          __html:
                            form.watch("description") ||
                            "Your blog content will appear here...",
                        }}
                      />
                    </div>
                  ) : null}
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </div>

        <div>
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-4">Post Settings</h3>
              <Separator className="mb-4" />

              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief summary of your post"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be displayed on blog listing pages.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the title of your blog post"
                            {...field}
                            className="text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="travel">Travel</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tags separated by commas"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          E.g., technology, ai, innovation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Featured Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files)}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload the main image for your post.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
