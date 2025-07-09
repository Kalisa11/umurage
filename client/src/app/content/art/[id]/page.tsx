"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Paintbrush,
  User,
  MapPin,
  Share2,
  Heart,
  ArrowLeft,
  Download,
  ZoomIn,
  Palette,
  Clock,
  Navigation,
  ExternalLink,
} from "lucide-react";

// This would normally be fetched from a database
const getArtworkById = (id: string) => {
  return {
    id: "1",
    title: "Imigongo Patterns",
    description:
      "Traditional geometric art forms created using cow dung and natural pigments, featuring bold patterns and earthy colors.",
    medium: "Cow Dung & Natural Pigments",
    technique: "Imigongo",
    dimensions: "60cm x 80cm",
    region: "Eastern Province",
    contributor: "Nyagatare Artisans",
    contributorBio:
      "The Nyagatare Artisans Collective has been preserving the traditional Imigongo art form for over 30 years, training new generations in this ancient technique.",
    date: "2023-07-10",
    image: "/about.png?height=800&width=600",
    additionalImages: [
      "/about.png?height=600&width=600",
      "/placeholder.png?height=600&width=600",
      "/image.png?height=600&width=600",
    ],
    tags: ["Geometric", "Traditional", "Natural Materials", "Sacred"],
    colors: ["Brown", "Red", "White", "Black", "Ochre"],
    culturalSignificance:
      "Represents prosperity and protection. These patterns are believed to bring good fortune to homes and are often used to decorate important buildings.",
    difficulty: "Advanced",
    timeToCreate: "2-3 days",
    materials: [
      {
        name: "Cow dung",
        purpose: "Base material for creating raised patterns",
      },
      { name: "Natural clay", purpose: "Binding agent and texture" },
      { name: "Plant pigments", purpose: "Natural coloring from local plants" },
      { name: "Ash", purpose: "White coloring and texture enhancement" },
      { name: "Iron oxide", purpose: "Red and brown earth tones" },
    ],
    process: [
      "Prepare the wall surface with smooth mud plaster",
      "Mix cow dung with clay to create the base paste",
      "Apply geometric patterns using fingers and traditional tools",
      "Allow the base layer to dry completely (24 hours)",
      "Prepare natural pigments from plants and minerals",
      "Apply colors in traditional sequence and patterns",
      "Final drying and protective coating application",
    ],
    symbolism:
      "Geometric patterns represent unity and harmony in Rwandan culture. The interlocking designs symbolize community bonds and the interconnectedness of all life.",
    modernApplications:
      "Contemporary artists use Imigongo techniques in modern art, interior design, and cultural preservation projects.",
    relatedContent: [
      {
        id: "2",
        title: "Traditional Basket Weaving",
        type: "art",
        image: "/placeholder.png?height=400&width=600",
      },
      {
        id: "3",
        title: "Geometric Patterns in Rwandan Culture",
        type: "story",
        image: "/placeholder.png?height=400&width=600",
      },
    ],
    museum: {
      name: "King's Palace Museum",
      address: "Nyanza, Rwanda",
      coordinates: {
        lat: -2.360111,
        lng: 29.740639,
      },
      bookingUrl: "https://visitrwanda.com/interests/kings-palace/",
      phone: "+250738742026",
      email: "info@kingspalace.rw",
      openingHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    },
  };
};

export default function ArtDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const artwork = getArtworkById(use(params).id);
  const allImages = [artwork.image, ...artwork.additionalImages];

  return (
    <div className="container mx-auto py-12">
      <div className="mb-6">
        <Link
          href="/categories/art"
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
              <Badge className="bg-primary flex items-center gap-1">
                <Paintbrush className="h-4 w-4" />
                {artwork.technique}
              </Badge>
              <Badge variant="outline">{artwork.difficulty}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {artwork.timeToCreate}
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {artwork.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {artwork.description}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg mb-4">
              <Image
                src={allImages[selectedImage] || "/placeholder.png"}
                alt={artwork.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-full overflow-hidden rounded-md border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.png"}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
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
                  <h4 className="font-medium mb-3">{artwork.museum.name}</h4>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {artwork.museum.address}
                    </p>
                    <p>
                      <strong>Hours:</strong> {artwork.museum.openingHours}
                    </p>
                    <p>
                      <strong>Phone:</strong> {artwork.museum.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {artwork.museum.email}
                    </p>
                  </div>
                  <Button asChild className="w-full">
                    <a
                      href={artwork.museum.bookingUrl}
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
                  {/* Google Map Embed */}
                  <div className="h-48 w-full rounded-lg overflow-hidden border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d996.6084722178041!2d29.739984269525262!3d-2.360122999851197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwMjEnMzYuNCJTIDI5wrA0NCcyNi4zIkU!5e0!3m2!1sen!2srw!4v1751901859624!5m2!1sen!2srw"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Click map to open in Google Maps
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Tabs for different content */}
          <Tabs defaultValue="details" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="symbolism">Symbolism</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="pt-4">Artwork Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-3">Physical Properties</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Dimensions:
                          </span>
                          <span>{artwork.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Medium:</span>
                          <span>{artwork.medium}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Technique:
                          </span>
                          <span>{artwork.technique}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Creation Time:
                          </span>
                          <span>{artwork.timeToCreate}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Color Palette</h4>
                      <div className="flex flex-wrap gap-2">
                        {artwork.colors.map((color) => (
                          <div key={color} className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color.toLowerCase() }}
                            />
                            <span className="text-sm">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div>
                    <h4 className="font-medium mb-3">Cultural Significance</h4>
                    <p className="text-muted-foreground">
                      {artwork.culturalSignificance}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Creation Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {artwork.process.map((step, index) => (
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
                      <strong>Note:</strong> This traditional technique requires
                      patience and skill developed over years of practice. Each
                      piece is unique and reflects the artist's personal
                      interpretation of traditional patterns.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traditional Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {artwork.materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 border rounded-lg"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Palette className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{material.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {material.purpose}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="symbolism" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Cultural Symbolism & Modern Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">
                        Traditional Symbolism
                      </h4>
                      <p className="text-muted-foreground">
                        {artwork.symbolism}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-3">Modern Applications</h4>
                      <p className="text-muted-foreground">
                        {artwork.modernApplications}
                      </p>
                    </div>
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
              Share Artwork
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
              Download Images
            </Button>
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
                    <div className="font-medium">{artwork.contributor}</div>
                    <div className="text-sm text-muted-foreground">
                      Artist/Collective
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{artwork.region}</div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Paintbrush className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{artwork.technique}</div>
                    <div className="text-sm text-muted-foreground">
                      Technique
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{artwork.medium}</div>
                    <div className="text-sm text-muted-foreground">Medium</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributor Info */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">About the Artists</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {artwork.contributorBio}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                View More Artworks
              </Button>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {artwork.tags.map((tag) => (
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
              {artwork.relatedContent.map((item) => (
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
