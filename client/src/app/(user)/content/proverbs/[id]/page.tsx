"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  User,
  MapPin,
  Share2,
  Heart,
  ArrowLeft,
  BookOpen,
  Quote,
  Lightbulb,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { use } from "react";
import { CATEGORIES } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getProverbById, getProverbs } from "@/services/contentService";
import { Proverb } from "@/types";
import { toast } from "react-hot-toast";
import Contributor from "@/components/contributor";
import ReportContent from "@/components/report-content";

export default function ProverbDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: proverb, isLoading } = useQuery({
    queryKey: ["proverb", id],
    queryFn: () => getProverbById(id),
    enabled: !!id,
  });

  const { data: allProverbs, isLoading: allProverbsLoading } = useQuery({
    queryKey: ["similarProverbs", id],
    queryFn: () => getProverbs(),
    enabled: !!id,
  });

  if (isLoading || allProverbsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const similarProverbs = allProverbs?.filter((proverb) => proverb.id !== id);

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link
          href={`/categories/${CATEGORIES.PROVERB}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Proverbs
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-500 hover:bg-blue-500 flex items-center gap-1 capitalize">
                <MessageSquare className="h-4 w-4" />
                {proverb?.proverbCategory}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {proverb?.difficulty}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              {proverb?.title}
            </h1>
          </div>

          {/* Proverb Display */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">
                      {proverb?.title}
                    </p>
                    <p className="text-xl text-muted-foreground italic">
                      {proverb?.englishTranslation}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meaning & Context */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 pt-4">
                <Lightbulb className="h-5 w-5" />
                Proverb Meaning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {(proverb?.content || "")
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Historical Context */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 pt-4">
                <BookOpen className="h-5 w-5" />
                Historical Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{proverb?.description}</p>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.href}`);
                toast.success("Link copied to clipboard", {
                  duration: 2000,
                });
              }}
            >
              <Share2 className="h-4 w-4" />
              Share Proverb
            </Button>
            <ReportContent contentId={id} />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="top-24 mb-8">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4">Proverb Details</h3>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{proverb?.region}</div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium capitalize">
                      {proverb?.proverbCategory}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Category
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium capitalize">
                      {proverb?.difficulty}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Difficulty
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributor Info */}
          {proverb?.contributor && (
            <Contributor contributor={proverb?.contributor} />
          )}

          {/* Related Concepts */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Similar Proverbs</h3>
            <div className="flex flex-wrap gap-2">
              {similarProverbs?.map((proverb) => (
                <Link
                  key={proverb.id}
                  href={`/content/proverbs/${proverb.id}`}
                  className="p-4 border rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Quote className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium line-clamp-1">
                        {proverb.title}
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        {proverb.englishTranslation}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6 line-clamp-2">
                    {proverb.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
