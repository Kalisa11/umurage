"use client";

import { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Search, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/services/eventService";
import { formatDate } from "date-fns";
import { getTypeIcon } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import EventLoader from "@/components/loaders/event-loader";

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });

  const filteredEvents = events?.filter((event) => {
    if (activeTab === "all") return true;
    if (activeTab === "featured") return event.isFeatured;
    return event.tag === activeTab;
  });

  if (isLoading) return <EventLoader />;

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Upcoming Events
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Join our community events, workshops, and cultural activities to
          experience Rwanda's rich heritage
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search activities..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all-locations">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                <SelectItem value="kigali">Kigali</SelectItem>
                <SelectItem value="northern">Northern Province</SelectItem>
                <SelectItem value="southern">Southern Province</SelectItem>
                <SelectItem value="eastern">Eastern Province</SelectItem>
                <SelectItem value="western">Western Province</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-dates">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-dates">All Dates</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="next-month">Next Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Activity Tabs */}
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8 hidden lg:block"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
          <TabsTrigger value="performance">Performances</TabsTrigger>
          <TabsTrigger value="cultural">Cultural</TabsTrigger>
          <TabsTrigger value="tour">Tours</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Featured Activities Banner */}
      {activeTab === "all" && (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Featured Events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events &&
              events
                .filter((event) => event.isFeatured)
                .slice(0, 3)
                .map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                  >
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
                      <CardTitle className="line-clamp-1">
                        {event.title}
                      </CardTitle>
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
                          <span className="text-muted-foreground">
                            {" "}
                            per person
                          </span>
                        )}
                      </div>
                      <Button size="sm">Register</Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </div>
      )}

      {/* All Activities */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {activeTab === "all"
              ? "All Events"
              : activeTab === "featured"
              ? "Featured Events"
              : `${
                  activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                } Activities`}
          </h2>
          <div className="text-sm text-muted-foreground">
            Showing {filteredEvents?.length} events
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents?.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardHeader className="relative h-48 p-0">
                <Image
                  src={event.imageUrl || "/placeholder.png"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4">
                  <Badge className="bg-primary hover:bg-primary capitalize">
                    {event.isFeatured
                      ? "Featured"
                      : getTypeIcon(event.tag || "")}{" "}
                    {event.tag}
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
                    {event.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "RWF",
                    })}
                  </span>
                  {event.price !== null && event.price !== undefined && (
                    <span className="text-muted-foreground"> per person</span>
                  )}
                </div>
                <Button size="sm">
                  <Link href={`/activities/${event.id}?register=true`}>
                    Register
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 rounded-lg bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold">Want to Organize an Event?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Are you a cultural expert, artist, or community leader? We'd love to
          help you organize workshops, performances, or cultural events to share
          your knowledge with the community.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/organize-event">Organize an Event</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
