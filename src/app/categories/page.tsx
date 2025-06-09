import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, BookOpen, Music, Paintbrush } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    {
      id: "stories",
      title: "Stories",
      description:
        "Traditional tales, myths, and legends passed down through generations",
      icon: BookOpen,
      image: "/placeholder.png?height=400&width=600",
      count: 12,
    },
    {
      id: "proverbs",
      title: "Proverbs",
      description:
        "Wise sayings that reflect cultural values and traditional wisdom",
      icon: () => (
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
      ),
      image: "/placeholder.png?height=400&width=600",
      count: 25,
    },
    {
      id: "songs",
      title: "Songs",
      description:
        "Traditional music, chants, and ceremonial songs from different regions",
      icon: Music,
      image: "/placeholder.png?height=400&width=600",
      count: 7,
    },
    {
      id: "art",
      title: "Art",
      description: "Traditional visual arts, crafts, and cultural artifacts",
      icon: Paintbrush,
      image: "/placeholder.png?height=400&width=600",
      count: 9,
    },
    {
      id: "language",
      title: "Language",
      description:
        "Indigenous language entries, dialects, and linguistic heritage",
      icon: () => (
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
          <path d="M9 9h0.01" />
          <path d="M15 9h0.01" />
          <path d="M9 13a4 4 0 0 0 8 0" />
        </svg>
      ),
      image: "/placeholder.png?height=400&width=600",
      count: 14,
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Categories
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore the rich diversity of Rwandan indigenous culture through our
          curated categories
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group"
          >
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="relative h-42 p-0">
                <Image
                  src={category.image || "/placeholder.png"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-2 text-white">
                    <category.icon />
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {category.count} entries
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
