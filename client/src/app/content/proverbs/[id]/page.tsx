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
} from "lucide-react";
import Image from "next/image";
import { use } from "react";

// This would normally be fetched from a database
const getProverbById = (id: string) => {
  return {
    id: "1",
    title: "Akebo kajya iwa Mugarura",
    kinyarwanda: "Akebo kajya iwa Mugarura",
    english: "A small basket goes to Mugarura's place",
    meaning:
      "Even small contributions or efforts can lead to significant opportunities and recognition. This proverb teaches that we should not underestimate the value of modest beginnings or small acts of kindness.",
    detailedExplanation:
      "This proverb originates from traditional Rwandan society where baskets were essential tools for carrying goods. Mugarura was often a reference to a place of importance or a person of high status. The proverb suggests that even a small basket (representing humble offerings or modest efforts) can find its way to important places, symbolizing how small actions can lead to great opportunities.",
    context:
      "Used to encourage people not to underestimate small beginnings or modest contributions. Often shared with young people starting their careers or anyone feeling that their efforts are too small to matter.",
    usage: "Motivational, Encouragement, Personal Development",
    region: "Southern Province",
    contributor: "Professor Nshimiyimana",
    contributorBio:
      "Professor Nshimiyimana is a linguist and cultural historian who has spent over 25 years documenting Rwandan proverbs and their cultural significance.",
    date: "2023-08-05",
    tags: ["Perseverance", "Opportunity", "Humility", "Hard Work"],
    category: "Life Wisdom",
    difficulty: "Intermediate",
    relatedConcepts: [
      "Hard work",
      "Recognition",
      "Patience",
      "Humility",
      "Opportunity",
    ],
    modernApplications: [
      {
        context: "Business & Entrepreneurship",
        application:
          "Encourages entrepreneurs to start small and not be discouraged by humble beginnings. Many successful businesses started with small investments or simple ideas.",
      },
      {
        context: "Education & Learning",
        application:
          "Motivates students that small daily efforts in studying can lead to significant academic achievements and opportunities.",
      },
      {
        context: "Community Service",
        application:
          "Reminds volunteers that even small acts of service can have meaningful impact and may lead to larger opportunities to help others.",
      },
      {
        context: "Personal Development",
        application:
          "Encourages individuals to value small steps in self-improvement, as they can lead to significant personal growth over time.",
      },
    ],
    similarProverbs: [
      {
        kinyarwanda: "Akanyoni gato ni ko keza",
        english: "A small bird is the one that builds well",
        meaning: "Small efforts done consistently lead to great results",
      },
      {
        kinyarwanda: "Ubwoba bw'impyisi butuma imbwa zirira mu rugo",
        english: "Fear of the hyena makes dogs bark at home",
        meaning: "Fear can cause unnecessary anxiety even in safe situations",
      },
    ],
    historicalContext:
      "This proverb reflects the traditional Rwandan value system that emphasizes patience, humility, and the belief that consistent effort, no matter how small, will eventually be rewarded. In pre-colonial Rwanda, social mobility was possible through dedication and service to the community.",
    relatedContent: [
      {
        id: "2",
        title: "The Value of Persistence",
        type: "story",
        image: "/placeholder.png?height=400&width=600",
      },
      {
        id: "3",
        title: "Traditional Work Songs",
        type: "song",
        image: "/placeholder.png?height=400&width=600",
      },
    ],
    views: 1650,
    likes: 124,
    shares: 89,
  };
};

export default function ProverbDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const proverb = getProverbById(use(params).id);

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link
          href="/categories/proverbs"
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
              <Badge className="bg-blue-500 hover:bg-blue-500 flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {proverb.category}
              </Badge>
              <Badge variant="outline">{proverb.difficulty}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              {proverb.title}
            </h1>
          </div>

          {/* Proverb Display */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">
                      {proverb.kinyarwanda}
                    </p>
                    <p className="text-xl text-muted-foreground italic">
                      {proverb.english}
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
                Meaning & Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Primary Meaning</h4>
                  <p className="text-muted-foreground">{proverb.meaning}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Detailed Explanation</h4>
                  <p className="text-muted-foreground">
                    {proverb.detailedExplanation}
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">When to Use</h4>
                  <p className="text-muted-foreground">{proverb.context}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Proverbs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="pt-4">Related Proverbs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {proverb.similarProverbs.map((similar, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <Quote className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{similar.kinyarwanda}</p>
                        <p className="text-sm text-muted-foreground italic">
                          {similar.english}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {similar.meaning}
                    </p>
                  </div>
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
              <p className="text-muted-foreground">
                {proverb.historicalContext}
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              Share Proverb
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
              <Quote className="h-4 w-4" />
              Create Quote Card
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="top-24 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Proverb Details</h3>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{proverb.contributor}</div>
                    <div className="text-sm text-muted-foreground">
                      Contributor
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{proverb.region}</div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{proverb.category}</div>
                    <div className="text-sm text-muted-foreground">
                      Category
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{proverb.difficulty}</div>
                    <div className="text-sm text-muted-foreground">
                      Difficulty
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">
                    {proverb.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Likes</span>
                  <span className="font-medium">{proverb.likes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shares</span>
                  <span className="font-medium">{proverb.shares}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributor Info */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">About the Contributor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {proverb.contributorBio}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                View More Proverbs
              </Button>
            </CardContent>
          </Card>

          {/* Related Concepts */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Related Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {proverb.relatedConcepts.map((concept) => (
                <Badge key={concept} variant="outline">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {proverb.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Related Content */}
          <div>
            <h3 className="text-lg font-bold mb-4">Related Content</h3>
            <div className="flex flex-col gap-4">
              {proverb.relatedContent.map((item) => (
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
                        priority
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
