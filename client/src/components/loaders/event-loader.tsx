import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter } from "../ui/card";

const EventLoader = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <Skeleton className="h-12 w-96" />
        <Skeleton className="mt-4 h-6 w-2/3" />
      </div>

      {/* Search and Filters Skeleton */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-8 hidden lg:block">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Activities Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventLoader;
