"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
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
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-1">
              <div className="h-6 w-6 rounded-full bg-primary-foreground" />
            </div>
            <span className="font-bold sm:inline-block">Umurage</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6">
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
          {/* <Link href="/dashboard">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Dashboard
            </Button>
          </Link> */}
          {/* <ModeToggle /> */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
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
        <div className="container pb-4 md:hidden">
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
              href="/dashboard"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
