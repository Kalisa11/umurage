import type { Music as MusicType } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const MusicView = ({
  music,
  loading,
}: {
  music: MusicType[];
  loading: boolean;
}) => {
  const [view, setView] = useState("grid");
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search songs by title..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="dance">Traditional Dance</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="work">Work Song</SelectItem>
                <SelectItem value="lullaby">Lullaby</SelectItem>
                <SelectItem value="ceremonial">Ceremonial</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Occasions</SelectItem>
                <SelectItem value="ceremonies">Ceremonies</SelectItem>
                <SelectItem value="weddings">Weddings</SelectItem>
                <SelectItem value="harvest">Harvest</SelectItem>
                <SelectItem value="bedtime">Bedtime</SelectItem>
                <SelectItem value="work">Work</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{music.length || 0}</span> songs
        </div>
        <Tabs defaultValue="grid" onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Songs Grid/List */}
      <Tabs defaultValue="grid" value={view}>
        <TabsContent value="grid" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {music?.map((song) => (
              <Link
                key={song.id}
                href={`/content/music/${song.id}`}
                className="flex items-center text-sm font-medium text-primary"
              >
                <Card className="overflow-hidden transition-all hover:shadow-md h-full">
                  <CardHeader className="relative h-48 p-0">
                    <Image
                      src={song.coverImage || "/placeholder.png"}
                      alt={song.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between p-4">
                      <Badge className={`bg-primary`}>{song.genre}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardTitle className="line-clamp-2 mb-2 text-lg">
                      {song.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 mb-4">
                      {song.description}
                    </CardDescription>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>
                          By {song.contributor?.firstName}{" "}
                          {song.contributor?.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{song.region}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {song?.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {song.tempo && (
                      <div className="text-sm text-muted-foreground">
                        {song.tempo}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <div className="space-y-4">
            {music?.map((song) => (
              <Card
                key={song.id}
                className="overflow-hidden transition-all hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-48 w-full sm:h-48 sm:w-48 flex-shrink-0">
                    <Image
                      src={song.coverImage || "/placeholder.png"}
                      alt={song.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <CardTitle className="mb-2">{song.title}</CardTitle>
                    <CardDescription className="mb-4 flex-1">
                      {song.description}
                    </CardDescription>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>
                          {song.contributor?.firstName}{" "}
                          {song.contributor?.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{song.region}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {song?.tags?.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        href={`/content/music/${song.id}`}
                        className="flex items-center text-sm font-medium text-primary"
                      >
                        View
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MusicView;
