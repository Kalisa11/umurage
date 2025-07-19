"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSession from "@/hooks/useSession";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useProfile from "@/hooks/useProfile";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    // { name: "Explore", path: "/explore" },
    { name: "Contribute", path: "/contribute" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
  ];

  const { data: profile } = useProfile();

  const { mutate: logout } = useMutation({
    mutationFn: signOut,
  });

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
          {profile ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0 hover:bg-accent"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={profile?.avatar || "/avatar.jpg"}
                      alt="Profile"
                    />
                    <AvatarFallback className="uppercase text-sm font-medium">
                      {profile?.firstName} {profile?.lastName}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-background border" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex flex-col">
                  {/* User Info Section */}
                  <div className="flex items-center gap-3 p-4 pb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={profile?.avatar || "/avatar.jpg"}
                        alt="Profile"
                      />
                      <AvatarFallback className="uppercase text-sm font-medium">
                        {profile?.firstName} {profile?.lastName}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium truncate">
                        {profile?.firstName} {profile?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {profile?.email}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-10 px-3"
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm">Profile</span>
                      </Button>
                    </Link>
                  </div>

                  <Separator />

                  {/* Logout Section */}
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => logout()}
                      className="w-full justify-start gap-3 h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">Logout</span>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden lg:flex cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="hidden lg:flex cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
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
          </nav>
        </div>
      )}
    </header>
  );
}
