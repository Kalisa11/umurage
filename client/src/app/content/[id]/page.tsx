"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Download, Flag, Share2, Volume2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSubmissionById } from "@/services/submissionService";
import { format, formatDate } from "date-fns";

export default function ContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: content } = useQuery({
    queryKey: ["content", id],
    queryFn: () => getSubmissionById(id),
  });

  const relatedContent = [
    {
      id: "6",
      title: "The Clever Hare and the Elephant",
      category: "story",
      image: "/placeholder.png?height=400&width=600",
    },
    {
      id: "4",
      title: "Proverb: Akebo kajya iwa Mugarura",
      category: "proverb",
      image: "/placeholder.png?height=400&width=600",
    },
    {
      id: "2",
      title: "Intore Dance Song",
      category: "song",
      image: "/placeholder.png?height=400&width=600",
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <Badge className="bg-primary hover:bg-primary mb-4 flex w-fit items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {content?.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {content?.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {content?.description}
            </p>
          </div>

          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={content?.imageUrl || "/placeholder.png"}
              alt={content?.title || "Content Image"}
              fill
              className="object-cover"
              priority
            />
          </div>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Button size="icon" className="h-12 w-12 flex-shrink-0">
                    <Volume2 className="h-6 w-6" />
                  </Button>
                  <div className="flex-1">
                    <h3 className="font-medium">Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      Audio narration in Kinyarwanda with English subtitles
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {content?.content?.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Flag className="h-4 w-4" />
              Report
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">Content Information</h3>
              <Separator className="my-4" />
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Contributor
                  </dt>
                  <dd className="text-sm">{"E-Rwanda"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Category
                  </dt>
                  <dd className="text-sm capitalize">{content?.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Region
                  </dt>
                  <dd className="text-sm capitalize">
                    {content?.locationName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Date Added
                  </dt>
                  <dd className="text-sm">
                    {content?.submittedAt
                      ? format(content?.submittedAt, "MMMM dd, yyyy") +
                        " at " +
                        format(content?.submittedAt, "hh:mm a")
                      : "N/A"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold">Related Content</h3>
            <div className="space-y-4">
              {relatedContent.map((item) => (
                <Link
                  key={item.id}
                  href={`/content/${item.id}`}
                  className="group"
                >
                  <div className="flex gap-4 rounded-lg border p-3 transition-all hover:bg-accent mb-2">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-accent-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
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
