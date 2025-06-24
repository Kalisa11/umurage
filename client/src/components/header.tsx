"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Explore", path: "/explore" },
    { name: "Contribute", path: "/contribute" },
    { name: "Activities", path: "/activities" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-1">
              <div className="h-6 w-6 rounded-full bg-primary-foreground" />
            </div>
            <span className="hidden font-bold sm:inline-block">Umurage</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.path ? "text-primary" : "text-foreground/60"
              }`}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" size="sm" className="hidden lg:flex cursor-pointer">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="hidden lg:flex cursor-pointer">
              Sign Up
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container mx-auto pb-4 lg:hidden">
          <nav className="flex flex-col space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  pathname === route.path
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/60"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
