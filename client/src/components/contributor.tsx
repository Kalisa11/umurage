import type { Contributor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Send, ExternalLink } from "lucide-react";
import Link from "next/link";

const Contributor = ({ contributor }: { contributor: Contributor | null }) => {
  if (!contributor) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardContent className="pt-4">
        <h3 className="text-lg font-bold mb-4">Contributor Info</h3>

        <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
            <Image
              src="/avatar.jpg"
              alt={`${contributor?.firstName} ${contributor?.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 w-full sm:w-auto">
            <h4 className="font-semibold text-base sm:text-lg">
              {contributor?.firstName} {contributor?.lastName}
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              Cultural Contributor
            </p>
            {contributor?.region && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground sm:hidden">
                <MapPin className="h-4 w-4" />
                {contributor?.region}
              </div>
            )}
          </div>
          <div className="hidden sm:block">
            {contributor?.region && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {contributor?.region}
              </div>
            )}
          </div>
        </div>

        {contributor?.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {contributor?.bio}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
          {/* <Button
            variant="outline"
            size="sm"
            className="gap-2 w-full sm:w-auto"
            onClick={() => {
              window.open(`mailto:${contributor?.email}`, "_blank");
            }}
          >
            <Send className="h-4 w-4" />
            Contact
          </Button> */}
          <Link href={`/contributor/${contributor.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 w-full sm:w-auto"
            >
              <ExternalLink className="h-4 w-4" />
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Contributor;
