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
import { Calendar, Clock, MapPin, Users, Search, Heart } from "lucide-react";

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const toggleSaveEvent = (eventId: string) => {
    setSavedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  // Mock data for demonstration
  const activities = [
    {
      id: "1",
      title: "Traditional Storytelling Evening",
      description:
        "Join our elders as they share ancient Rwandan folktales and legends passed down through generations.",
      type: "workshop",
      date: "2024-01-15",
      time: "18:00",
      duration: "2 hours",
      location: "Kigali Cultural Center",
      address: "KN 3 Rd, Kigali",
      organizer: "Rwanda Heritage Foundation",
      capacity: 50,
      registered: 32,
      price: "Free",
      image: "/placeholder.png?height=400&width=600",
      tags: ["Stories", "Elders", "Oral Tradition"],
      featured: true,
    },
    {
      id: "2",
      title: "Imigongo Art Workshop",
      description:
        "Learn the traditional art of Imigongo painting using cow dung and natural pigments from master artisans.",
      type: "workshop",
      date: "2024-01-20",
      time: "09:00",
      duration: "4 hours",
      location: "Nyagatare Arts Center",
      address: "Nyagatare, Eastern Province",
      organizer: "Nyagatare Artisans Collective",
      capacity: 20,
      registered: 15,
      price: "5,000 RWF",
      image: "/placeholder.png?height=400&width=600",
      tags: ["Art", "Hands-on", "Traditional Crafts"],
      featured: false,
    },
    {
      id: "3",
      title: "Intore Dance Performance & Workshop",
      description:
        "Experience the powerful Intore warrior dance and learn basic movements from professional dancers.",
      type: "performance",
      date: "2024-01-25",
      time: "15:00",
      duration: "3 hours",
      location: "National Museum of Rwanda",
      address: "Huye, Southern Province",
      organizer: "Rwanda National Ballet",
      capacity: 100,
      registered: 78,
      price: "3,000 RWF",
      image: "/placeholder.png?height=400&width=600",
      tags: ["Dance", "Performance", "Cultural Heritage"],
      featured: true,
    },
    {
      id: "4",
      title: "Kinyarwanda Poetry Reading",
      description:
        "Contemporary and traditional Kinyarwanda poetry reading featuring local poets and writers.",
      type: "cultural",
      date: "2024-02-01",
      time: "17:00",
      duration: "2 hours",
      location: "Kigali Public Library",
      address: "KG 11 Ave, Kigali",
      organizer: "Rwanda Writers Association",
      capacity: 60,
      registered: 25,
      price: "Free",
      image: "/placeholder.png?height=400&width=600",
      tags: ["Poetry", "Language", "Literature"],
      featured: false,
    },
    {
      id: "5",
      title: "Traditional Music Recording Session",
      description:
        "Help preserve traditional Rwandan songs by participating in a community recording session.",
      type: "workshop",
      date: "2024-02-05",
      time: "10:00",
      duration: "6 hours",
      location: "Inkomoko Studio",
      address: "Kimisagara, Kigali",
      organizer: "Inkomoko Team",
      capacity: 30,
      registered: 18,
      price: "Free",
      image: "/placeholder.png?height=400&width=600",
      tags: ["Music", "Recording", "Community"],
      featured: true,
    },
    {
      id: "6",
      title: "Cultural Heritage Walking Tour",
      description:
        "Explore Kigali's cultural landmarks and learn about the city's history and traditions.",
      type: "tour",
      date: "2024-02-10",
      time: "08:00",
      duration: "4 hours",
      location: "Kigali City Center",
      address: "Starting at Kigali Convention Centre",
      organizer: "Kigali Cultural Tours",
      capacity: 25,
      registered: 12,
      price: "8,000 RWF",
      image: "/placeholder.png?height=400&width=600",
      tags: ["History", "Walking Tour", "Heritage Sites"],
      featured: false,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "workshop":
        return "🎨";
      case "performance":
        return "🎭";
      case "cultural":
        return "📚";
      case "tour":
        return "🚶";
      default:
        return "📅";
    }
  };

  const filteredActivities = activities.filter((activity) => {
    if (activeTab === "all") return true;
    if (activeTab === "featured") return activity.featured;
    return activity.type === activeTab;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Upcoming Activities
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
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
          <TabsTrigger value="performance">Performances</TabsTrigger>
          <TabsTrigger value="cultural">Cultural</TabsTrigger>
          <TabsTrigger value="tour">Tours</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Featured Activities Banner */}
      {activeTab === "all" && (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Featured Activities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities
              .filter((activity) => activity.featured)
              .slice(0, 3)
              .map((activity) => (
                <Card
                  key={activity.id}
                  className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                >
                  <CardHeader className="relative h-48 p-0">
                    <Image
                      src={activity.image || "/placeholder.png"}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4">
                      <Badge className="bg-primary hover:bg-primary">
                        {getTypeIcon(activity.type)} Featured
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={() => toggleSaveEvent(activity.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            savedEvents.includes(activity.id)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CardTitle className="line-clamp-1">
                      {activity.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {activity.description}
                    </CardDescription>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(activity.date)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {activity.time} ({activity.duration})
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {activity.location}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm">
                      <span className="font-medium">{activity.price}</span>
                      {activity.price !== "Free" && (
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
              ? "All Activities"
              : activeTab === "featured"
              ? "Featured Activities"
              : `${
                  activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                } Activities`}
          </h2>
          <div className="text-sm text-muted-foreground">
            Showing {filteredActivities.length} activities
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardHeader className="relative h-48 p-0">
                <Image
                  src={activity.image || "/placeholder.png"}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4">
                  <Badge className={`bg-primary`}>
                    {getTypeIcon(activity.type)}{" "}
                    {activity.type.charAt(0).toUpperCase() +
                      activity.type.slice(1)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => toggleSaveEvent(activity.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        savedEvents.includes(activity.id) ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="line-clamp-1">{activity.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">
                  {activity.description}
                </CardDescription>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(activity.date)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {activity.time} ({activity.duration})
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {activity.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {activity.registered}/{activity.capacity} registered
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {activity.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm">
                  <span className="font-medium">{activity.price}</span>
                  {activity.price !== "Free" && (
                    <span className="text-muted-foreground"> per person</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Link href={`/activities/${activity.id}?register=true`}>
                      Register
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 rounded-lg bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold">Want to Organize an Activity?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Are you a cultural expert, artist, or community leader? We'd love to
          help you organize workshops, performances, or cultural events to share
          your knowledge with the community.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/organize-activity">Organize an Activity</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
