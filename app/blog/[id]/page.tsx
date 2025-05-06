import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ChevronLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { tagBgColors } from "@/components/my-functions/ReactQuill";

// Related blogDatas
const relatedblogDatas = [
  {
    id: 3,
    title: "Machine Learning: A Beginner's Guide",
    excerpt:
      "Understanding the basics of machine learning and how it's transforming industries.",
    category: "Technology",
    date: new Date(2023, 4, 15),
    readTime: "7 min read",
    image:
      "https://images.pexels.com/photos/8438971/pexels-photo-8438971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 7,
    title: "Ethical Considerations in AI Development",
    excerpt:
      "Exploring the moral implications of creating intelligent systems.",
    category: "Technology",
    date: new Date(2023, 6, 20),
    readTime: "8 min read",
    image:
      "https://images.pexels.com/photos/8728388/pexels-photo-8728388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 12,
    title: "The Rise of Voice Assistants",
    excerpt:
      "How voice technology is changing the way we interact with our devices.",
    category: "Technology",
    date: new Date(2023, 7, 5),
    readTime: "6 min read",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

// This should be placed in app/blog/[id]/page.js for Next.js to automatically provide params
async function getBlogData(id: string) {
  try {
    // Use native fetch API for server components
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}api/blogs/${id}`,
      {
        next: { revalidate: 3600 }, // Revalidate cache every hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

type Props = {
  params: {
    id: string;
  };
};

export default async function BlogPage({ params }: Props) {
  const { id } = params;
  const blogData = await getBlogData(id);

  if (!blogData) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Blog post not found</h1>
          <Link
            href="/blog"
            className="text-sky-500 hover:text-sky-600 mt-4 inline-block"
          >
            Return to all articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="pl-0 flex items-center text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to all articles
            </Button>
          </Link>
        </div>

        {/* Category badge */}
        <div className="mb-4">
          <Badge className="bg-sky-500 hover:bg-sky-600">
            {blogData?.category || "Uncategorized"}
          </Badge>
        </div>

        {/* Article title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {blogData.title}
        </h1>

        {/* Article meta */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback>{blogData.author?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{blogData.author}</div>
              <div className="text-sm text-muted-foreground">Author</div>
            </div>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="text-sm">
              {blogData.createdAt
                ? formatDistanceToNow(new Date(blogData.createdAt), {
                    addSuffix: true,
                  })
                : "Unknown time"}
            </span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span className="text-sm">
              {new Date(blogData.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Tags & social sharing */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {blogData.tags?.[0]
              ?.split(",")
              .map((tag: string, index: number) => {
                const bgColor = tagBgColors[index % tagBgColors.length];
                return (
                  <div key={index} className={`${bgColor} rounded-sm p-2`}>
                    <span className="text-lg font-bold">{tag.trim()}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Featured image */}
        <div className="relative aspect-[16/9] mb-8 overflow-hidden rounded-lg">
          <Image
            src={blogData.image}
            alt={blogData.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-sky-500 hover:prose-a:text-sky-600 prose-img:rounded-lg prose-img:mx-auto mb-12"
          dangerouslySetInnerHTML={{ __html: blogData.description }}
        />

        {/* Related blogDatas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedblogDatas.map((relatedblogData) => (
              <div key={relatedblogData.id} className="group">
                <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                  <Link href={`/blog/${relatedblogData.id}`}>
                    <Image
                      src={relatedblogData.image}
                      alt={relatedblogData.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                </div>
                <Link href={`/blog/${relatedblogData.id}`}>
                  <h3 className="font-medium line-clamp-2 group-hover:text-sky-500 transition-colors">
                    {relatedblogData.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <span>
                    {formatDistanceToNow(relatedblogData.date, {
                      addSuffix: true,
                    })}
                  </span>
                  <span>•</span>
                  <span>{relatedblogData.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
