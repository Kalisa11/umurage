"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Music,
  Play,
  Pause,
  Volume2,
  MapPin,
  Share2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { CATEGORIES, formatTime } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getMusic, getMusicById } from "@/services/contentService";
import Contributor from "@/components/contributor";
import ReportContent from "@/components/report-content";
import { toast } from "react-hot-toast";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function SongDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: songData, isLoading } = useQuery({
    queryKey: ["song", id],
    queryFn: () => getMusicById(id),
  });

  const { data: allMusic, isLoading: isAllMusicLoading } = useQuery({
    queryKey: ["relatedContent", id],
    queryFn: () => getMusic(),
  });

  const relatedContent = allMusic?.filter((music) => music.id !== id);

  const {
    audioRef,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    handleSeek,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
    progressPercentage,
  } = useAudioPlayer(songData?.audioUrl);

  if (isLoading || isAllMusicLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

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
              <Badge className="hover:bg-accent flex items-center gap-1 bg-primary">
                <Music className="h-4 w-4" />
                Songs
              </Badge>
              <Badge variant="outline">{songData?.genre}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Volume2 className="h-4 w-4" />
                {formatTime(duration)}
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {songData?.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {songData?.description}
            </p>
          </div>

          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={songData?.coverImage || "/placeholder.png"}
              alt={songData?.title || "Song Image"}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Audio Player */}
          <div>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    size="icon"
                    className="h-12 w-12"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <h3 className="font-medium">{songData?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {songData?.genre}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-secondary rounded-full h-2 mb-4 relative">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300 pointer-events-none"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center space-x-4">
                  <Volume2
                    className="w-5 h-5 text-gray-600 cursor-pointer"
                    onClick={toggleMute}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 w-8">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>
            {
              <audio
                key={songData?.audioUrl}
                ref={audioRef}
                src={songData?.audioUrl || ""}
                preload="metadata"
              />
            }
          </div>

          {/* content */}
          <div className="prose prose-lg max-w-none dark:prose-invert border border-gray-200 rounded-lg p-4 mb-8">
            {songData?.content?.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-2">
                {paragraph}
                {index !== songData?.content?.split("\n").length - 1 && <br />}
              </p>
            ))}
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.href}`);
                toast.success("Link copied to clipboard", {
                  duration: 2000,
                });
              }}
            >
              <Share2 className="h-4 w-4" />
              Share Song
            </Button>
            <ReportContent contentId={songData?.id || ""} />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="top-24 mb-8">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4">Song Details</h3>
              <Separator className="mb-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {songData?.region || "Unknown"}
                    </div>
                    <div className="text-sm text-muted-foreground">Origin</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{songData?.genre}</div>
                    <div className="text-sm text-muted-foreground">Genre</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {songData?.tempo || "Unknown"}
                    </div>
                    <div className="text-sm text-muted-foreground">Tempo</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{formatTime(duration)}</div>
                    <div className="text-sm text-muted-foreground">
                      Duration
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributor Info */}
          {songData?.contributor && (
            <Contributor contributor={songData?.contributor} />
          )}

          {/* Tags */}
          {songData?.tags && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {songData?.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Content */}
          <div>
            <h3 className="text-lg font-bold mb-4">Related Content</h3>
            <div className="flex flex-col gap-4">
              {relatedContent?.map((item) => (
                <Link
                  key={item.id}
                  href={`/content/music/${item.id}`}
                  className="group"
                >
                  <div className="flex gap-3 rounded-lg border p-3 transition-all hover:bg-accent">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.coverImage || "/placeholder.png"}
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
                        {item.genre}
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
