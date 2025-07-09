"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Clock,
  User,
  MapPin,
  Share2,
  Heart,
  ArrowLeft,
  Download,
  Volume2,
} from "lucide-react";

// This would normally be fetched from a database
const getStoryById = (id: string) => {
  return {
    id: "1",
    title: "The Origin of Lake Kivu",
    excerpt:
      "A traditional tale about how the beautiful Lake Kivu was formed, passed down through generations in Western Rwanda.",
    content: `Long ago, in the land that is now Western Rwanda, there was a vast and fertile valley where people lived in harmony with nature. The valley was blessed with abundant crops, clear streams, and lush forests.

In this valley lived a powerful king who was known for his wisdom and fairness. The king had a beautiful daughter who was loved by all for her kindness and gentle spirit.

One day, a terrible drought struck the land. The streams dried up, crops withered, and the people began to suffer. The king consulted with the elders, who advised him to seek help from the mountain spirits.

The king's daughter volunteered to climb the highest mountain to make an offering to the spirits. Despite her father's concerns, she insisted on going alone.

As she reached the summit, she prayed fervently for rain to save her people. The mountain spirits were moved by her selflessness and decided to help, but at a great cost.

They told her that to end the drought, she would need to sacrifice herself by jumping into a sacred spring at the mountain's peak. Without hesitation, she agreed, thinking only of her suffering people.

As she jumped into the spring, the skies darkened and rain began to fall. It rained for days, filling the valley with water. The king and his people had to flee to higher ground as their homes were submerged.

When the rain finally stopped, a vast and beautiful lake had formed where the valley once was. The people named it Lake Kivu, after the princess who had sacrificed herself.

It is said that on quiet nights, when the lake is still, you can sometimes hear the gentle laughter of the princess in the lapping of the waves against the shore, reminding us of her sacrifice and the importance of putting others before ourselves.`,
    readTime: "8 min read",
    wordCount: 1200,
    difficulty: "All Ages",
    region: "Western Province",
    contributor: "Elder Mutesi",
    contributorBio:
      "Elder Mutesi is a respected storyteller from Western Rwanda who has been preserving oral traditions for over 40 years.",
    date: "2023-05-15",
    image: "/placeholder.png?height=800&width=1200",
    tags: ["Creation Myth", "Nature", "Sacrifice", "Selflessness"],
    moralLesson: "Selflessness and sacrifice for the greater good",
    characters: [
      {
        name: "The Princess",
        description: "A kind and selfless daughter of the king",
      },
      { name: "The King", description: "A wise and fair ruler of the valley" },
      {
        name: "Mountain Spirits",
        description: "Mystical beings who control nature",
      },
      {
        name: "The People",
        description: "Valley inhabitants who benefit from the sacrifice",
      },
    ],
    setting: {
      time: "Ancient times",
      place: "Western Rwanda valley (now Lake Kivu)",
      description: "A fertile valley that transforms into a beautiful lake",
    },
    culturalContext:
      "This story teaches the Rwandan values of selflessness, community responsibility, and the belief that individual sacrifice can benefit the greater good.",
    language: "English",
    originalLanguage: "Kinyarwanda",
    hasAudio: true,
    audioUrl: "/placeholder-audio.mp3",
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
  const story = getStoryById(id);

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link
          href="/categories/stories"
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
              <Badge variant="outline">{story.difficulty}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {story.readTime}
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {story.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {story.excerpt}
            </p>
          </div>

          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={story.image || "/placeholder.png"}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Audio Player */}
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
          )}

          {/* Story Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
            {story.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Moral Lesson */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Moral Lesson
              </h3>
              <p className="text-primary font-medium">{story.moralLesson}</p>
            </CardContent>
          </Card>

          {/* Cultural Context */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg pt-4">Cultural Context</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{story.culturalContext}</p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              Share Story
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
              Download PDF
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
                    <div className="font-medium">{story.contributor}</div>
                    <div className="text-sm text-muted-foreground">
                      Storyteller
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{story.region}</div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{story.wordCount} words</div>
                    <div className="text-sm text-muted-foreground">Length</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{story.readTime}</div>
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
                {story.contributorBio}
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

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
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
