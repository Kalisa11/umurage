"use client";

import { useState } from "react";
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
import {
  BookOpen,
  Music,
  Paintbrush,
  Search,
  BookOpenText,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { getAllApprovedSubmissions } from "@/services/submissionService";
import { useQuery } from "@tanstack/react-query";

export default function ExplorePage() {
  const [view, setView] = useState("grid");

  // Mock data for demonstration
  const contentItems = [
    {
      id: "1",
      title: "The Origin of Lake Kivu",
      description:
        "A traditional tale about how the beautiful Lake Kivu was formed, passed down through generations in Western Rwanda.",
      category: "story",
      region: "Western Province",
      contributor: "Elder Mutesi",
      date: "2023-05-15",
      image: "/placeholder.png?height=400&width=600",
    },
    {
      id: "2",
      title: "Intore Dance Song",
      description:
        "A traditional song that accompanies the famous Intore warrior dance, celebrating bravery and cultural pride.",
      category: "song",
      region: "Northern Province",
      contributor: "Kigali Cultural Group",
      date: "2023-06-22",
      image: "/placeholder.png?height=400&width=600",
    },
    {
      id: "3",
      title: "Imigongo Patterns",
      description:
        "Traditional geometric art forms created using cow dung and natural pigments, featuring bold patterns and earthy colors.",
      category: "art",
      region: "Eastern Province",
      contributor: "Nyagatare Artisans",
      date: "2023-07-10",
      image: "/placeholder.png?height=400&width=600",
    },
    {
      id: "4",
      title: "Proverb: Akebo kajya iwa Mugarura",
      description:
        "A traditional Kinyarwanda proverb about perseverance and determination in the face of challenges.",
      category: "proverb",
      region: "Southern Province",
      contributor: "Professor Nshimiyimana",
      date: "2023-08-05",
      image: "/placeholder.png?height=400&width=600",
    },
    {
      id: "5",
      title: "Traditional Wedding Songs",
      description:
        "Collection of songs performed during traditional Rwandan wedding ceremonies, celebrating love and family bonds.",
      category: "song",
      region: "Kigali",
      contributor: "Rwanda Heritage Group",
      date: "2023-09-18",
      image: "/placeholder.png?height=400&width=600",
    },
    {
      id: "6",
      title: "The Clever Hare and the Elephant",
      description:
        "A folktale teaching children about using intelligence rather than physical strength to overcome challenges.",
      category: "story",
      region: "Northern Province",
      contributor: "Anonymous",
      date: "2023-10-30",
      image: "/placeholder.png?height=400&width=600",
    },
  ];

  const { data: submissions, isLoading, error } = useQuery({
    queryKey: ["submissions"],
    queryFn: getAllApprovedSubmissions,
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "story":
        return <BookOpenText className="h-4 w-4" />;
      case "song":
        return <Music className="h-4 w-4" />;
      case "art":
        return <Paintbrush className="h-4 w-4" />;
      case "proverb":
        return <BookOpen className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Explore Archive
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
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="story">Stories</SelectItem>
                <SelectItem value="proverb">Proverbs</SelectItem>
                <SelectItem value="song">Songs</SelectItem>
                <SelectItem value="art">Art</SelectItem>
              </SelectContent>
            </Select>
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
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer">
            Stories
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Proverbs
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Songs
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Art
          </Badge>
        </div>
      </div>

      {/* View Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{submissions?.length}</span>{" "}
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
            {submissions?.map((item) => (
              <Link
                key={item.id}
                href={`/content/${item.id}`}
                className="group"
              >
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="relative h-48 p-0">
                    <Image
                      src={item.imageUrl || "/placeholder.png"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <Badge
                        className={`flex items-center gap-1 bg-primary capitalize text-white`}
                      >
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </Badge>
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
                      By E-Rwanda
                    </div>
                    <div className="flex items-center text-sm font-medium text-primary">
                      View
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <div className="space-y-4">
            {submissions?.map((item) => (
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
                          {getCategoryIcon(item.category)}
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
    </div>
  );
}
