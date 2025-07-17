"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { REGIONS } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { useFilteredStories } from "@/hooks/useFilteredStories";
import { StoryCard } from "@/components/explore/story-card";
import { Story } from "@/types";

interface Props {
  stories: Story[];
  loading: boolean;
}

const StoriesView = ({ stories, loading }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredStories: Story[] = useFilteredStories(
    stories,
    searchTerm,
    selectedRegion
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search stories..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
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

      {/* Info and View Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredStories.length} </span>
          {filteredStories.length === 1 ? "result" : "results"}
          {filteredStories.length !== stories.length && (
            <span> of {stories.length}</span>
          )}
          {searchTerm && ` for "${searchTerm}"`}
          {selectedRegion !== "All Regions" && ` in ${selectedRegion}`}
        </div>
        <Tabs
          defaultValue="grid"
          onValueChange={(val) => setView(val as "grid" | "list")}
        >
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Empty State */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No stories found matching your criteria.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setSearchTerm("");
              setSelectedRegion("All Regions");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Story Results */}
      <Tabs defaultValue="grid" value={view}>
        <TabsContent value="grid" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} layout="grid" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <div className="flex flex-col gap-4">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} layout="list" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination Placeholder */}
      {filteredStories.length > 10 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3].map((page) => (
              <Button key={page} variant="outline" size="sm">
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesView;
