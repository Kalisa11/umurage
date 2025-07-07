import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const CategoryLoader = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <Skeleton className="h-12 w-48 mb-4" />
        <Skeleton className="h-6 w-2/3" />
      </div>

      {/* Categories Grid Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            {/* Image and Header Skeleton */}
            <CardHeader className="relative h-42 p-0">
              <Skeleton className="h-42 w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent flex items-end p-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            </CardHeader>
            
            {/* Description Skeleton */}
            <CardContent className="pt-6">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            
            {/* Footer Skeleton */}
            <CardFooter className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryLoader; 