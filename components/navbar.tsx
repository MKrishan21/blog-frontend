"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Newspaper,
  Home,
  FileEdit,
  LogIn,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, Handlelogout } = useAuth();

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/blog",
      label: "Blog",
      icon: FileEdit,
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    // {
    //   href: "/news",
    //   label: "News",
    //   icon: Newspaper,
    //   active: pathname === "/news",
    // },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold transition-colors">
              AshiKaze<span className="text-sky-500"> Blog</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {!isAuthenticated ? (
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          ) : (
            <Button
              onClick={Handlelogout}
              variant="ghost"
              size="sm"
              className="hidden md:flex"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center py-2 px-3 text-base font-medium rounded-md",
                  route.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <route.icon className="mr-3 h-5 w-5" />
                {route.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                onClick={Handlelogout}
                variant="ghost"
                size="sm"
                className="hidden md:flex"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
