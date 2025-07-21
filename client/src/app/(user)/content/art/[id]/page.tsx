"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Paintbrush,
  User,
  MapPin,
  Share2,
  ArrowLeft,
  Palette,
  Clock,
  Navigation,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getArt, getArtById } from "@/services/contentService";
import ReportContent from "@/components/report-content";
import Contributor from "@/components/contributor";
import { CATEGORIES, generateGoogleMapsEmbedUrl } from "@/lib/utils";

export default function ArtDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: art, isLoading } = useQuery({
    queryKey: ["art", id],
    queryFn: () => getArtById(id),
  });

  const { data: relatedContentData, isLoading: relatedContentLoading } =
    useQuery({
      queryKey: ["relatedContent", id],
      queryFn: () => getArt(),
    });

  const relatedContent = relatedContentData?.filter((item) => item.id !== id);

  const hasBooking =
    art?.bookingName &&
    art?.bookingAddress &&
    art?.bookingLat &&
    art?.bookingLong &&
    art?.bookingUrl;

  // Generate dynamic Google Maps embed URL
  const mapEmbedUrl = generateGoogleMapsEmbedUrl(
    art?.bookingLat,
    art?.bookingLong,
    art?.bookingAddress
  );

  if (isLoading || relatedContentLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  console.log({ art });

  return (
    <div className="container mx-auto py-12">
      <div className="mb-6">
        <Link
          href={`/categories/${CATEGORIES.ART}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Art
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary flex items-center gap-1 capitalize">
                <Paintbrush className="h-4 w-4" />
                {art?.technique}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {art?.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {art?.timeToCreate}
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {art?.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {art?.description}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded">
            <Image
              src={art?.coverImage || "/placeholder.png"}
              alt={art?.title || "Content Image"}
              fill
              className="object-cover"
              priority
            />
          </div>
          {hasBooking && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 pt-4">
                  <Navigation className="h-5 w-5" />
                  Visit the Museum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-3">
                      {art?.bookingName ?? "N/A"}
                    </h4>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <p className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        {art?.bookingAddress ?? "N/A"}
                      </p>
                      <p>
                        <strong>Hours:</strong> {art?.bookingHours ?? "N/A"}
                      </p>
                      <p>
                        <strong>Phone:</strong> {art?.bookingPhone ?? "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {art?.bookingEmail && art?.bookingEmail !== ""
                          ? art?.bookingEmail
                          : "N/A"}
                      </p>
                    </div>
                    <Button asChild className="w-full">
                      <a
                        href={art?.bookingUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Book Museum Visit
                      </a>
                    </Button>
                  </div>
                  <div>
                    {/* Google Map Embed using lat and long */}
                    {/* https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d996.6084722178041!2d29.739984269525262!3d-2.360122999851197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwMjEnMzYuNCJTIDI5wrA0NCcyNi4zIkU!5e0!3m2!1sen!2srw!4v1751901859624!5m2!1sen!2srw */}
                    <div className="h-48 w-full rounded-lg overflow-hidden border">
                      <iframe
                        src={mapEmbedUrl}
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Click map to open in Google Maps
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Artwork Details */}
          <Card className="mb-8">
            <CardHeader>
              {/* <CardTitle className="pt-4">Artwork Details</CardTitle> */}
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {art?.content?.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                    {index !== art?.content?.split("\n").length - 1 && <br />}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              Share Artwork
            </Button>
            <ReportContent contentId={art?.id || ""} />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="top-24 mb-8">
            <CardContent className="px-6 py-2">
              <h3 className="text-lg font-bold mb-4">Artwork Details</h3>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {art?.contributor?.firstName} {art?.contributor?.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Artist/Collective
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{art?.region}</div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Paintbrush className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{art?.technique}</div>
                    <div className="text-sm text-muted-foreground">
                      Technique
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{art?.medium}</div>
                    <div className="text-sm text-muted-foreground">Medium</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributor Info */}
          <Contributor contributor={art?.contributor || null} />

          {/* Related Content */}
          {relatedContent && relatedContent?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4">Related Content</h3>
              <div className="flex flex-col gap-4">
                {relatedContent?.map((item) => (
                  <Link
                    key={item.id}
                    href={`/content/art/${item.id}`}
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
                          {item.technique}
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
