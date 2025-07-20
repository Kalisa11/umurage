"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Clock,
  MapPin,
  Share2,
  ArrowLeft,
  Flag,
  Loader2,
  ExternalLink,
  Send,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getStories, getStoryById } from "@/services/contentService";
import { CATEGORIES } from "@/lib/utils";
import { toast } from "react-hot-toast";
import ReportContent from "@/components/report-content";
import Contributor from "@/components/contributor";

export default function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: story, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: () => getStoryById(id),
    enabled: !!id,
  });

  const { data: relatedStoriesData, isLoading: relatedStoriesLoading } =
    useQuery({
      queryKey: ["stories"],
      queryFn: getStories,
    });

  if (isLoading || relatedStoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // limit to 3
  const relatedStories = relatedStoriesData
    ?.filter((story) => story.id !== id)
    .slice(0, 3);

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link
          href={`/categories/${CATEGORIES.STORY}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stories
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-primary hover:bg-primary flex items-center gap-1 text-xs sm:text-sm">
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Traditional Story</span>
                <span className="sm:hidden">Story</span>
              </Badge>
              <Badge
                variant="outline"
                className="capitalize text-xs sm:text-sm"
              >
                {story?.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">
                  {story?.readTime} min read
                </span>
                <span className="sm:hidden">{story?.readTime}m</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {story?.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {story?.description}
            </p>
          </div>

          <div className="relative mb-8 h-[500px] w-full overflow-hidden rounded-lg">
            <Image
              src={story?.coverImage || "/placeholder.png"}
              alt={story?.title || "Story Image"}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
            {(story?.content || "")
              .split("\n")
              .filter(Boolean)
              .map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Moral Lesson */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-4">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Moral Lesson
              </h3>
              <p className="text-primary font-medium">{story?.moralLesson}</p>
            </CardContent>
          </Card>

          {/* Cultural Context */}
          <Card className="mb-8">
            <CardContent>
              <CardTitle className="text-lg py-4">Cultural Context</CardTitle>
              <p className="text-muted-foreground">{story?.context}</p>
            </CardContent>
          </Card>

          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard");
              }}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <ReportContent contentId={id} />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="top-24 mb-8">
            <CardContent className="pt-4">
              <h3 className="text-lg font-bold mb-4">Story Details</h3>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{story?.region}</div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {story?.content?.split(" ").length} words
                    </div>
                    <div className="text-sm text-muted-foreground">Length</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {story?.readTime} min read
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Reading time
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributor Info */}
          {story?.contributor && (
            <Contributor contributor={story?.contributor} />
          )}

          {/* Related Content */}
          {relatedStories && (
            <div>
              <h3 className="text-lg font-bold mb-4">Related Content</h3>
              <div className="flex flex-col gap-4">
                {relatedStories?.map((item) => (
                  <Link
                    key={item.id}
                    href={`/content/stories/${item.id}`}
                    className="group"
                  >
                    <div className="flex gap-3 rounded-lg border p-3 transition-all hover:bg-accent">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.coverImage || "/placeholder.png"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-accent-foreground line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          Story
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
