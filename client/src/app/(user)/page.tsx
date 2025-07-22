"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Music,
  Paintbrush,
  Calendar,
  Clock,
  MapPin,
  Heart,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/services/eventService";
import { formatDate } from "date-fns";
import { getFeaturedContent } from "@/services/contentService";
import { CATEGORIES } from "@/lib/utils";
import { getTypeColor, getTypeIcon } from "@/utils/utils";

export default function Home() {
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });

  const {
    data: featuredContent,
    isLoading: featuredContentLoading,
    error: featuredContentError,
  } = useQuery({
    queryKey: ["featuredContent"],
    queryFn: getFeaturedContent,
  });

  const upcomingEvents = events?.slice(0, 3); // Show only 3 upcoming events

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-gray-900/60 to-gray-800 z-10" />
        <div className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src="/image.png?height=800&width=1600"
            alt="Traditional Rwandan cultural imagery"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-md">
            Digital Repository for Rwandan Indigenous Culture
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white drop-shadow-md">
            Umurage is a digital repository for Rwandan indigenous culture,
            preserving traditional stories, proverbs, songs, artwork, and
            language for future generations.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contribute">Contribute</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full backdrop-blur-sm hover:bg-gray-200"
            >
              <Link href="/categories">Explore</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="container mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Content
          </h2>
          <p className="mt-2 text-muted-foreground">
            Discover highlighted cultural treasures from our collection
          </p>
        </div>

        {featuredContent && featuredContent.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured Story */}
            {featuredContent?.slice(0, 3).map((item: any) => (
              <Link
                key={item.id}
                href={`/content/${item.contentType}/${item.id}`}
                className="group"
              >
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="relative h-48 p-0">
                    <Image
                      src={
                        item.typeSpecificData.coverImage || "/placeholder.png"
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 gap-2 justify-between">
                      {item.isFeatured && (
                        <Badge
                          className={`flex items-center gap-1 bg-primary capitalize text-white`}
                        >
                          Featured
                        </Badge>
                      )}
                      <Badge
                        className={`flex items-center gap-1 ${getTypeColor(
                          item.contentType as string
                        )} capitalize`}
                      >
                        {getTypeIcon(item.contentType as string)}
                        {item.contentType}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
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
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Unable to load featured content at this time.
            </p>
          </div>
        )}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">Explore All</Link>
          </Button>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="container mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
          <p className="mt-2 text-muted-foreground">
            Join our community events, workshops, and cultural activities
          </p>
        </div>

        {eventsLoading ? (
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
                    <div className="h-4 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : eventsError ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Unable to load upcoming events at this time.
            </p>
          </div>
        ) : upcomingEvents && upcomingEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden border">
                <CardHeader className="relative h-48 w-full p-0">
                  <Image
                    src={event.imageUrl || "/placeholder.png"}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover bg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4">
                    <Badge className="bg-primary hover:bg-primary">
                      Featured
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Heart className={`h-4 w-4`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {event.description}
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.eventDate, "EEEE, MMMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {event.eventDate}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm">
                    <span className="font-medium">
                      {event.price
                        ? event.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "RWF",
                          })
                        : "Free"}
                    </span>
                    {event.price !== null && event.price !== undefined && (
                      <span className="text-muted-foreground"> per person</span>
                    )}
                  </div>
                  <Link
                    target="_blank"
                    href={`https://www.eventbrite.com/d/rwanda/all-events/?page=1`}
                  >
                    <Button size="sm">Register</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Upcoming Events</h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for new cultural events and activities.
            </p>
            <Button asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        )}

        {upcomingEvents && upcomingEvents.length > 0 && (
          <div className="mt-8 text-center">
            <Button asChild variant="default" size="lg">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-muted py-12">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Explore Categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover the rich diversity of Rwandan indigenous culture
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href={`/categories/${CATEGORIES.STORY}`} className="group">
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Stories</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Traditional tales, myths, and legends passed down through
                  generations
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Explore Stories
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <Link href={`/categories/${CATEGORIES.PROVERB}`} className="group">
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Proverbs</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Wise sayings that reflect cultural values and traditional
                  wisdom
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Explore Proverbs
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <Link href={`/categories/${CATEGORIES.MUSIC}`} className="group">
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Music className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Songs</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Traditional music, and ceremonial songs from different regions
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Explore Songs
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <Link href={`/categories/${CATEGORIES.ART}`} className="group">
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Paintbrush className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Art</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Traditional visual arts, crafts, and cultural artifacts
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Explore Art
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto">
        <div className="rounded-lg bg-primary text-primary-foreground">
          <div className="grid gap-6 p-8 md:grid-cols-2 md:p-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Help Preserve Rwanda's Cultural Heritage
              </h2>
              <p className="mt-4 text-primary-foreground/90">
                Share your knowledge, stories, or family traditions. Every
                contribution helps preserve our rich cultural heritage for
                future generations.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end md:justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contribute">Contribute Now</Link>
              </Button>
              <p className="text-sm text-primary-foreground/80">
                Account required to contribute content
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
