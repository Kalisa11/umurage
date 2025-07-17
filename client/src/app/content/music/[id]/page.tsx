"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Music,
  Play,
  Pause,
  Volume2,
  User,
  MapPin,
  Share2,
  Heart,
  ArrowLeft,
  Download,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { CATEGORIES } from "@/lib/utils";

// This would normally be fetched from a database
const getSongById = (id: string) => {
  return {
    id: "1",
    title: "Intore Dance Song",
    description:
      "A traditional song that accompanies the famous Intore warrior dance, celebrating bravery and cultural pride.",
    duration: "4:32",
    genre: "Traditional Dance",
    occasion: "Ceremonies",
    region: "Northern Province",
    contributor: "Kigali Cultural Group",
    contributorBio:
      "The Kigali Cultural Group has been preserving and performing traditional Rwandan music and dance for over 20 years.",
    date: "2023-06-22",
    image: "/placeholder.png?height=800&width=1200",
    audioUrl: "/placeholder-audio.mp3",
    tags: ["Dance", "Warriors", "Celebration", "Ceremonial"],
    instruments: ["Traditional Drums", "Flute", "Voice", "Clapping"],
    tempo: "Energetic",
    language: "Kinyarwanda",
    hasLyrics: true,
    difficulty: "Intermediate",
    culturalContext:
      "Performed during important ceremonies and celebrations to honor warriors and celebrate Rwandan heritage. The Intore dance represents the strength, agility, and pride of Rwandan warriors.",
    lyrics: {
      kinyarwanda: [
        "Intore z'u Rwanda, mwiza cyane",
        "Mukore ubwoba, mukore ubwenge",
        "Igihugu cyacu, ni cyiza cyane",
        "Turagukunda, turagushima",
      ],
      english: [
        "Warriors of Rwanda, you are very beautiful",
        "Show courage, show wisdom",
        "Our country is very beautiful",
        "We love you, we praise you",
      ],
      pronunciation: [
        "In-to-re zu Rwan-da, mwi-za cha-ne",
        "Mu-ko-re u-bwo-ba, mu-ko-re u-bwen-ge",
        "I-gi-hu-gu cha-cu, ni chi-za cha-ne",
        "Tu-ra-gu-kun-da, tu-ra-gu-shi-ma",
      ],
    },
    musicalNotation: "Available in traditional notation",
    danceSteps: [
      "Begin with feet together, arms at sides",
      "Step forward with right foot, raise spear (or arm) high",
      "Leap with both feet, landing in warrior stance",
      "Turn in circle while maintaining proud posture",
      "Repeat sequence with increasing intensity",
    ],
    relatedContent: [
      {
        id: "2",
        title: "Traditional Wedding Songs",
        type: "song",
        image: "/placeholder.png?height=400&width=600",
      },
      {
        id: "3",
        title: "Intore Dance History",
        type: "story",
        image: "/placeholder.png?height=400&width=600",
      },
    ],
    views: 3200,
    likes: 245,
    downloads: 89,
  };
};

export default function SongDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const song = getSongById(params.id);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link
          href={`/categories/${CATEGORIES.MUSIC}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Songs
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-accent hover:bg-accent flex items-center gap-1">
                <Music className="h-4 w-4" />
                {song.genre}
              </Badge>
              <Badge variant="outline">{song.difficulty}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Volume2 className="h-4 w-4" />
                {song.duration}
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {song.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {song.description}
            </p>
          </div>

          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={song.image || "/placeholder.png"}
              alt={song.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Audio Player */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Button size="icon" className="h-12 w-12" onClick={togglePlay}>
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <div className="flex-1">
                  <h3 className="font-medium">{song.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Traditional Rwandan Song
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentTime} / {song.duration}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2 mb-4">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different content */}
          <Tabs defaultValue="lyrics" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
              <TabsTrigger value="dance">Dance Steps</TabsTrigger>
              <TabsTrigger value="context">Cultural Context</TabsTrigger>
              <TabsTrigger value="instruments">Instruments</TabsTrigger>
            </TabsList>

            <TabsContent value="lyrics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Song Lyrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-3">
                        Kinyarwanda (Original)
                      </h4>
                      <div className="space-y-2">
                        {song.lyrics.kinyarwanda.map((line, index) => (
                          <p key={index} className="text-lg">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">English Translation</h4>
                      <div className="space-y-2">
                        {song.lyrics.english.map((line, index) => (
                          <p
                            key={index}
                            className="text-lg text-muted-foreground"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div>
                    <h4 className="font-medium mb-3">Pronunciation Guide</h4>
                    <div className="space-y-2">
                      {song.lyrics.pronunciation.map((line, index) => (
                        <p
                          key={index}
                          className="text-sm font-mono bg-muted p-2 rounded"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traditional Dance Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {song.danceSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-muted-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> These dance steps should be
                      performed with pride and dignity, representing the
                      strength and heritage of Rwandan warriors.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="context" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Context & Significance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {song.culturalContext}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">
                        Performance Occasions
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {song.occasion}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Musical Tempo</h4>
                      <p className="text-sm text-muted-foreground">
                        {song.tempo}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instruments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traditional Instruments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {song.instruments.map((instrument, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Music className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{instrument}</h4>
                          <p className="text-sm text-muted-foreground">
                            Traditional instrument
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              Share Song
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Heart className="h-4 w-4" />
              Save for Later
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Download Audio
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card className=" top-24 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Song Details</h3>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{song.contributor}</div>
                    <div className="text-sm text-muted-foreground">
                      Performer
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{song.region}</div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{song.genre}</div>
                    <div className="text-sm text-muted-foreground">Genre</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{song.duration}</div>
                    <div className="text-sm text-muted-foreground">
                      Duration
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">
                    {song.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Likes</span>
                  <span className="font-medium">{song.likes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Downloads</span>
                  <span className="font-medium">{song.downloads}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributor Info */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">About the Performer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {song.contributorBio}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                View More Songs
              </Button>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {song.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Related Content */}
          <div>
            <h3 className="text-lg font-bold mb-4">Related Content</h3>
            <div className="space-y-4">
              {song.relatedContent.map((item) => (
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
