"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturedPosts from "@/components/featured-posts";
import NewsletterSignup from "@/components/newsletter-signup";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "@/api-handeling/apis/getApi";
import { useRandomItem } from "@/components/my-functions/Debounce";
import BlogLoader from "@/components/my-functions/Loader";
import PostCard from "@/components/featured-posts";

export default function Home() {
  const { data: BlogData, isLoading } = useQuery({
    queryKey: [
      "blogs",
      {
        search: "",
        page: 1,
        limit: 10,
        sort: "desc",
        category: "",
      },
    ],
    queryFn: getAllBlogs,
  });
  const featuredBlog = useRandomItem(BlogData?.data || []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <BlogLoader />
      </div>
    );
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {featuredBlog?.title}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {featuredBlog?.shortDescription}
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Link href={`/blog/${featuredBlog?._id}`}>
                  <Button size="lg" className="bg-sky-500 hover:bg-sky-600 ">
                    Explore Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href={`/blog?category=${featuredBlog?.category?.toLowerCase()}`}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:bg-sky-600 hover:text-white"
                  >
                    Related Posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src={
                  featuredBlog?.image ||
                  "https://dummyimage.com/1024x600/000/0011ff.png&text=No+Image"
                }
                alt={featuredBlog?.title}
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Latest Articles
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our latest and exciting articles from various
                categories.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {BlogData?.data?.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore Categories
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse articles by your interests and discover new perspectives.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {[
              {
                name: "Technology",
                image:
                  "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                name: "Lifestyle",
                image:
                  "https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                name: "Business",
                image:
                  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                name: "Health",
                image:
                  "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/blog?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
