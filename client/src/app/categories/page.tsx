"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { getAllCategories } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { getCategoryIcon } from "@/utils";
import CategoryLoader from "@/components/loaders/category-loader";

export default function CategoriesPage() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (isLoading) return <CategoryLoader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Categories
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore the rich diversity of Rwandan indigenous culture through our
          curated categories
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group"
          >
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="relative h-42 p-0">
                <Image
                  src={"/placeholder.png"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-2 text-white">
                    {React.createElement(getCategoryIcon(category.name), {
                      className: "h-5 w-5 text-primary",
                    })}
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
