import Link from "next/link";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              AshiKaze<span className="text-sky-500">Blog</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              A beautiful blog website with the latest news and articles on
              various topics.
            </p>
            {/* <div className="flex space-x-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div> */}
          </div>

          <div className="grid grid-cols-2">
            <div>
              <h3 className="mb-3 text-base font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                {/* <li>
                <Link href="/news" className="text-muted-foreground hover:text-primary">News</Link>
              </li> */}
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/blog?category=technology"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog?category=lifestyle"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Lifestyle
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog?category=business"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Business
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog?category=health"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Health
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div>
            <h3 className="mb-3 text-base font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary">Cookie Policy</Link>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AshiKaze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
