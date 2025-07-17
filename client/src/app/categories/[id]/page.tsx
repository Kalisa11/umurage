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
import { getArt, getMusic, getProverbs, getStories } from "@/services/contentService";
import { CATEGORIES, REGIONS } from "@/lib/utils";
import StoriesView from "@/components/explore/stories";
import ProverbsView from "@/components/explore/proverbs";
import ArtView from "@/components/explore/art";
import MusicView from "@/components/explore/music";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const isStory = Number(id) === CATEGORIES.STORY;
  const isProverb = Number(id) === CATEGORIES.PROVERB;
  const isArt = Number(id) === CATEGORIES.ART;
  const isMusic = Number(id) === CATEGORIES.MUSIC;

  const { data: stories, isLoading: storiesLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
    enabled: isStory,
  });

  const { data: proverbs, isLoading: proverbsLoading } = useQuery({
    queryKey: ["proverbs"],
    queryFn: getProverbs,
    enabled: isProverb,
  });

  const { data: art, isLoading: artLoading } = useQuery({
    queryKey: ["art"],
    queryFn: getArt,
    enabled: isArt,
  });

  const { data: music, isLoading: musicLoading } = useQuery({
    queryKey: ["music"],
    queryFn: getMusic,
    enabled: isMusic, 
  });

  const { data: category } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(Number(id)),
  });

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

      {isStory && (
        <StoriesView stories={stories || []} loading={storiesLoading} />
      )}
      {isProverb && (
        <ProverbsView proverbs={proverbs || []} loading={proverbsLoading} />
      )}
      {isArt && <ArtView art={art || []} loading={artLoading} />}
      {isMusic && <MusicView music={music || []} loading={musicLoading} />}
    </div>
  );
};

export default Page;
