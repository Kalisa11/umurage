import { Art } from "@/types";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { REGIONS } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";

const ArtView = ({ art, loading }: { art: Art[]; loading: boolean }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search content by title..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="All Regions">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-6">
        Showing <span className="font-medium">{art?.length}</span> results
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {art?.map((item) => (
          <Link
            key={item.id}
            href={`/content/art/${item.id}`}
            className="group"
          >
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="relative h-48 p-0">
                <Image
                  src={item.coverImage || "/placeholder.png"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  {item.isFeatured && (
                    <Badge
                      className={`flex items-center gap-1 bg-primary capitalize text-white`}
                    >
                      Featured
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <h3 className="line-clamp-1 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {/* TODO: Add the contributor name */}
                <div className="text-xs text-muted-foreground">
                  By {item.contributor?.firstName} {item.contributor?.lastName}
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  View
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ArtView;
