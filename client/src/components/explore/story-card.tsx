import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Story } from "@/types";

interface Props {
  story: Story;
  layout: "grid" | "list";
}

export const StoryCard = ({ story, layout }: Props) => {
  const contributorName = `${story.contributor?.firstName || ""} ${
    story.contributor?.lastName || ""
  }`.trim();

  if (layout === "grid") {
    return (
      <Link href={`/content/stories/${story.id}`} className="group">
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="relative h-48 p-0">
            <Image
              src={story.coverImage || "/placeholder.png"}
              alt={story.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              {story.isFeatured && (
                <Badge className="bg-primary text-white">Featured</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <h3 className="line-clamp-1 text-xl font-bold">{story.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {story.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-muted-foreground">
              By {contributorName}
            </div>
            <div className="flex items-center text-sm font-medium text-primary">
              View{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/content/stories/${story.id}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-40 w-full sm:w-48">
            <Image
              src={story.coverImage || "/placeholder.png"}
              alt={story.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-2">
              {story.isFeatured && (
                <Badge className="bg-primary">Featured</Badge>
              )}
            </div>
            <h3 className="text-xl font-bold">{story.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
              {story.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                By {contributorName}
              </div>
              <div className="flex items-center text-sm font-medium text-primary">
                View{" "}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
