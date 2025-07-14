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
  User,
  MapPin,
  Share2,
  ArrowLeft,
  Flag,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "@/services/contentService";
import { CATEGORIES } from "@/lib/utils";

// This would normally be fetched from a database
const getStory = (id: string) => {
  return {
    relatedContent: [
      {
        id: "2",
        title: "The Clever Hare and the Elephant",
        type: "story",
        image: "/placeholder.png?height=400&width=600",
      },
      {
        id: "3",
        title: "Traditional Values Proverb",
        type: "proverb",
        image: "/placeholder.png?height=400&width=600",
      },
    ],
  };
};

export default function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const story = getStory(id);

  const { data: dbstory, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: () => getStoryById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  console.log(dbstory);
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
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary hover:bg-primary flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Traditional Story
              </Badge>
              <Badge variant="outline" className="capitalize">
                {dbstory?.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {dbstory?.readTime} min read
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {dbstory?.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {dbstory?.description}
            </p>
          </div>

          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={dbstory?.coverImage || "/placeholder.png"}
              alt={dbstory?.title || "Story Image"}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Audio Player
          {story.hasAudio && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Button size="icon" className="h-12 w-12">
                    <Volume2 className="h-6 w-6" />
                  </Button>
                  <div className="flex-1">
                    <h3 className="font-medium">Listen to this story</h3>
                    <p className="text-sm text-muted-foreground">
                      Audio narration in Kinyarwanda with English subtitles
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )} */}

          {/* Story Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
            <div dangerouslySetInnerHTML={{ __html: dbstory?.content || "" }} />
          </div>

          {/* Moral Lesson */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-4">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Moral Lesson
              </h3>
              <p className="text-primary font-medium">{dbstory?.moralLesson}</p>
            </CardContent>
          </Card>

          {/* Cultural Context */}
          <Card className="mb-8">
            <CardContent>
              <CardTitle className="text-lg py-4">Cultural Context</CardTitle>
              <p className="text-muted-foreground">{dbstory?.context}</p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Flag className="h-4 w-4" />
              Report
            </Button>
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
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {dbstory?.contributor?.firstName}{" "}
                      {dbstory?.contributor?.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Contributed by
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{dbstory?.region}</div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {dbstory?.content?.split(" ").length} words
                    </div>
                    <div className="text-sm text-muted-foreground">Length</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {dbstory?.readTime} min read
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
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">About the Storyteller</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {dbstory?.contributor?.bio}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                View More Stories
              </Button>
            </CardContent>
          </Card>

          {/* Related Content */}
          <div>
            <h3 className="text-lg font-bold mb-4">Related Content</h3>
            <div className="flex flex-col gap-4">
              {story.relatedContent.map((item) => (
                <Link
                  key={item.id}
                  href={`/content/${item.id}`}
                  className="group"
                >
                  <div className="flex gap-3 rounded-lg border p-3 transition-all hover:bg-accent">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.png"}
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
                        {item.type}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
