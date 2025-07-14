"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSubmissionsByCategory } from "@/services/submissionService";
import { getCategoryIcon } from "@/utils";
import { getCategoryById } from "@/services/categoryService";
import { getStories } from "@/services/contentService";
import { CATEGORIES } from "@/lib/utils";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [view, setView] = useState("grid");

  const isStory = Number(id) === CATEGORIES.STORY;
  const {
    data: submissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["submissions", id],
    queryFn: () => getSubmissionsByCategory(Number(id)),
  });

  // fetch this only if the category is story
  const { data: stories, isLoading: storiesLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
    enabled: isStory,
  });

  const { data: category } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(Number(id)),
  });

  console.log(stories);
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Explore {category?.name}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Discover and explore the rich cultural heritage of Rwanda
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for stories, songs, art..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="kigali">Kigali</SelectItem>
                <SelectItem value="northern">Northern Province</SelectItem>
                <SelectItem value="southern">Southern Province</SelectItem>
                <SelectItem value="eastern">Eastern Province</SelectItem>
                <SelectItem value="western">Western Province</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">
            {isStory ? stories?.length : submissions?.length}
          </span>{" "}
          results
        </div>
        <Tabs defaultValue="grid" onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Grid/List */}
      <Tabs defaultValue="grid" value={view}>
        <TabsContent value="grid" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isStory ? (
              stories?.map((item) => (
                <Link
                  key={item.id}
                  href={`/content/stories/${item.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="relative h-48 p-0">
                      <Image
                        src={item.coverImage || "/placeholder.png"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                        {item.isFeatured && (
                          <Badge
                            className={`flex items-center gap-1 bg-primary capitalize text-white`}
                          >
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <h3 className="line-clamp-1 text-xl font-bold">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {/* TODO: Add the contributor name */}
                      <div className="text-xs text-muted-foreground">
                        By {item.contributor?.firstName}{" "}
                        {item.contributor?.lastName}
                      </div>
                      <div className="flex items-center text-sm font-medium text-primary">
                        View
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            ) : (
              <></>
            )}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <div className="flex flex-col gap-4">
            {isStory
              ? stories?.map((item) => (
                  <Link
                    key={item.id}
                    href={`/content/stories/${item.id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-full w-full sm:h-auto sm:w-48">
                          <Image
                            src={item.coverImage || "/placeholder.png"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-2">
                            {item.isFeatured && (
                              <Badge
                                className={`flex items-center gap-1 bg-primary capitalize`}
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="mt-2 flex-1 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                              By {item.contributor?.firstName}{" "}
                              {item.contributor?.lastName}
                            </div>
                            <div className="flex items-center text-sm font-medium text-primary">
                              View
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              : submissions?.map((item) => (
                  <Link
                    key={item.id}
                    href={`/content/${item.id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-full w-full sm:h-auto sm:w-48">
                          <Image
                            src={item.imageUrl || "/placeholder.png"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-2">
                            <Badge
                              className={`flex items-center gap-1 bg-primary capitalize`}
                            >
                              {React.createElement(
                                getCategoryIcon(item.category),
                                {
                                  className: "h-5 w-5 text-white",
                                }
                              )}
                              {item.category}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="mt-2 flex-1 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                              By {"E-Rwanda"} • {item.locationName}
                            </div>
                            <div className="flex items-center text-sm font-medium text-primary">
                              View
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {submissions && submissions.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
