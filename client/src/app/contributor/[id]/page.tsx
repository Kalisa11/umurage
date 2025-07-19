"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Calendar,
  Music,
  Palette,
  BookOpen,
  MessageSquare,
  Globe,
  Mail,
  Phone,
  Award,
  Heart,
  Share2,
  Users,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getContributorContent } from "@/services/contentService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { isBefore, parseISO, addYears } from "date-fns";

export default function ContributorProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("all");
  const { data: contributorContent, isLoading } = useQuery({
    queryKey: ["contributorContent", id],
    queryFn: () => getContributorContent(id),
  });

  // Platform launch date - adjust this to your actual launch date
  const PLATFORM_LAUNCH_DATE = "2025-07-01";
  const EARLY_ADOPTER_CUTOFF = addYears(new Date(PLATFORM_LAUNCH_DATE), 1);

  const achievements = [
    {
      id: "first-contribution",
      title: "First Contribution",
      description: "First piece shared & approved",
      icon: Award,
      condition:
        contributorContent?.content.length &&
        contributorContent?.content.length >= 1,
    },
    {
      id: "storyteller",
      title: "Storyteller",
      description: "Shared 3 or more stories",
      icon: BookOpen,
      condition:
        contributorContent?.content.length &&
        contributorContent?.content.filter(
          (item) => item.contentType === "stories"
        ).length >= 3,
    },
    {
      id: "wise-words",
      title: "Wise Words",
      description: "First proverb shared & approved",
      icon: MessageSquare,
      condition:
        contributorContent?.content.length &&
        contributorContent?.content.filter(
          (item) => item.contentType === "proverbs"
        ).length >= 1,
    },
    {
      id: "early-adopter",
      title: "Early Adopter",
      description: "Joined in the first year of the platform",
      icon: Calendar,
      condition:
        contributorContent?.contributor.createdAt &&
        isBefore(
          parseISO(contributorContent.contributor.createdAt),
          EARLY_ADOPTER_CUTOFF
        ),
    },
    {
      id: "consistency-counts",
      title: "Consistency Counts",
      description: "Shared at least one piece in each category",
      icon: CheckCircle,
      condition:
        contributorContent?.content.length &&
        contributorContent?.content.filter(
          (item) => item.contentType === "stories"
        ).length >= 1 &&
        contributorContent?.content.filter(
          (item) => item.contentType === "music"
        ).length >= 1 &&
        contributorContent?.content.filter((item) => item.contentType === "art")
          .length >= 1 &&
        contributorContent?.content.filter(
          (item) => item.contentType === "proverbs"
        ).length >= 1,
    },
  ];

  const hasAchievements = achievements.filter(
    (achievement) => achievement.condition
  );

  const renderContributionCard = (item: any, type: string) => {
    const getTypeIcon = () => {
      switch (type) {
        case "stories":
          return <BookOpen className="h-4 w-4" />;
        case "music":
          return <Music className="h-4 w-4" />;
        case "art":
          return <Palette className="h-4 w-4" />;
        case "proverbs":
          return <MessageSquare className="h-4 w-4" />;
        default:
          return null;
      }
    };

    const getTypeColor = () => {
      switch (type) {
        case "stories":
          return "bg-blue-100 text-blue-800";
        case "music":
          return "bg-green-100 text-green-800";
        case "art":
          return "bg-purple-100 text-purple-800";
        case "proverbs":
          return "bg-orange-100 text-orange-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <Card
        key={item.id}
        className="group hover:shadow-lg transition-shadow duration-200"
      >
        <div className="relative">
          <Image
            src={item.typeSpecificData.coverImage || "/placeholder.png"}
            alt={item.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge className={`absolute top-2 left-2 ${getTypeColor()}`}>
            {getTypeIcon()}
            <span className="ml-1 capitalize">{type}</span>
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg group-hover:text-amber-600 transition-colors">
              {item.title}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {item.region}
            </div>
            {item.readingTime && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {item.readingTime}
              </div>
            )}
            {item.duration && (
              <div className="flex items-center">
                <Music className="h-3 w-3 mr-1" />
                {item.duration}
              </div>
            )}
          </div>

          {type === "proverbs" && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-1">
                English Translation:
              </p>
              <p className="text-sm text-gray-600 italic">
                "{item.typeSpecificData.englishTranslation}"
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {item.genre && (
                <Badge variant="outline" className="text-xs">
                  {item.genre}
                </Badge>
              )}
              {item.technique && (
                <Badge variant="outline" className="text-xs">
                  {item.technique}
                </Badge>
              )}
              {item.category && (
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              )}
            </div>
            <Link href={`/content/${type}/${item.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  console.log({ contributorContent });
  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={"/avatar.jpg"} alt={"Avatar"} />
                  <AvatarFallback className="text-2xl bg-amber-100 text-amber-800">
                    {contributorContent?.contributor.firstName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    {contributorContent?.contributor.lastName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {contributorContent?.contributor.firstName}{" "}
                      {contributorContent?.contributor.lastName}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {contributorContent?.contributor.region}
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined{" "}
                      {new Date(
                        contributorContent?.contributor.createdAt ?? ""
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/contributor/${id}`
                        );
                        toast.success("Link copied to clipboard");
                      }}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {contributorContent?.contributor.bio}
                </p>

                {/* Specialties */}
                {/* <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {contributorData.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-amber-100 text-amber-800"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div> */}

                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    {contributorContent?.contributor.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        <a
                          href={`mailto:${contributorContent?.contributor.email}`}
                          className="hover:text-amber-600"
                        >
                          {contributorContent?.contributor.email}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <a
                        href={`tel:${contributorContent?.contributor.phone}`}
                        className="hover:text-amber-600"
                      >
                        {contributorContent?.contributor.phone
                          ? contributorContent?.contributor.phone
                          : "No phone number"}
                      </a>
                    </div>

                    {contributorContent?.contributor.website && (
                      <div className="flex items-center text-gray-600">
                        <Globe className="h-4 w-4 mr-2 text-primary" />
                        <a
                          href={contributorContent?.contributor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-600"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="pt-4">Contribution Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {contributorContent?.content.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Contributions
                  </div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {
                      contributorContent?.content.filter(
                        (item) => item.contentType === "stories"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Stories</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      contributorContent?.content.filter(
                        (item) => item.contentType === "music"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Songs</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {
                      contributorContent?.content.filter(
                        (item) => item.contentType === "art"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Artworks</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {
                      contributorContent?.content.filter(
                        (item) => item.contentType === "proverbs"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Proverbs</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="pt-4">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hasAchievements.length > 0 ? (
                  hasAchievements.slice(0, 3).map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="p-2 bg-amber-100 rounded-full">
                          <IconComponent className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">
                            {achievement.title}
                          </div>
                          <div className="text-xs text-gray-600">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-muted-foreground text-sm">
                    Earned achievements will appear here
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contributions Tabs */}

        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Contributions
          </h2>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">
                All ({contributorContent?.content.length})
              </TabsTrigger>
              <TabsTrigger value="stories">
                Stories (
                {
                  contributorContent?.content.filter(
                    (item) => item.contentType === "stories"
                  ).length
                }
                )
              </TabsTrigger>
              <TabsTrigger value="songs">
                Songs (
                {
                  contributorContent?.content.filter(
                    (item) => item.contentType === "music"
                  ).length
                }
                )
              </TabsTrigger>
              <TabsTrigger value="art">
                Art (
                {
                  contributorContent?.content.filter(
                    (item) => item.contentType === "art"
                  ).length
                }
                )
              </TabsTrigger>
              <TabsTrigger value="proverbs">
                Proverbs (
                {
                  contributorContent?.content.filter(
                    (item) => item.contentType === "proverbs"
                  ).length
                }
                )
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributorContent?.content.map((item) =>
                  renderContributionCard(item, item.contentType)
                )}
              </div>
            </TabsContent>

            <TabsContent value="stories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributorContent?.content
                  .filter((item) => item.contentType === "stories")
                  .map((item) => renderContributionCard(item, "stories"))}
              </div>
            </TabsContent>

            <TabsContent value="songs" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributorContent?.content
                  .filter((item) => item.contentType === "music")
                  .map((item) => renderContributionCard(item, "songs"))}
              </div>
            </TabsContent>

            <TabsContent value="art" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributorContent?.content
                  .filter((item) => item.contentType === "art")
                  .map((item) => renderContributionCard(item, "art"))}
              </div>
            </TabsContent>

            <TabsContent value="proverbs" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributorContent?.content
                  .filter((item) => item.contentType === "proverbs")
                  .map((item) => renderContributionCard(item, "proverbs"))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
