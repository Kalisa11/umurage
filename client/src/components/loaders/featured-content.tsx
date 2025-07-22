import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const FeaturedContentLoader = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="h-48 bg-muted animate-pulse" />
          <CardContent className="p-6">
            <div className="h-6 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 bg-muted rounded animate-pulse mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="h-3 bg-muted rounded animate-pulse w-24" />
            <div className="h-3 bg-muted rounded animate-pulse w-12" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedContentLoader;
