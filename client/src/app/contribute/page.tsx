"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Check, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContributePage() {
  const [submitted, setSubmitted] = useState(false);
  const [mediaType, setMediaType] = useState("text");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="container mx-auto py-12">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center text-2xl">
              Contribution Received
            </CardTitle>
            <CardDescription className="text-center">
              Thank you for helping preserve Rwanda's cultural heritage!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              Your contribution has been successfully submitted and will be
              reviewed by our team.
            </p>
            <p className="mt-2 text-muted-foreground">
              We appreciate your dedication to preserving our indigenous culture
              for future generations.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={() => setSubmitted(false)}>Submit Another</Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Contribute
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Share your knowledge to help preserve Rwanda's indigenous culture
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Why Contribute?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your contributions help preserve Rwanda's rich cultural heritage
                for future generations. Every story, proverb, song, or artwork
                adds to our collective memory.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">What Can You Share?</h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li>• Traditional stories and folktales</li>
                <li>• Proverbs and wise sayings</li>
                <li>• Songs and musical traditions</li>
                <li>• Traditional art and crafts</li>
                <li>• Indigenous language entries</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Guidelines</h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li>• Be respectful of cultural sensitivities</li>
                <li>• Provide as much context as possible</li>
                <li>• Credit sources when known</li>
                <li>• You can remain anonymous if preferred</li>
              </ul>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No account required</AlertTitle>
              <AlertDescription>
                You can contribute anonymously without creating an account.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="pt-4">Upload Content</CardTitle>
              <CardDescription>
                Fill out the form below to share your cultural knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter a title for your contribution"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="proverb">Proverb</SelectItem>
                        <SelectItem value="song">Song</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="language">Language</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Media Type</Label>
                    <Tabs defaultValue="text" onValueChange={setMediaType}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="text">Text</TabsTrigger>
                        <TabsTrigger value="audio">Audio</TabsTrigger>
                        <TabsTrigger value="image">Image</TabsTrigger>
                        <TabsTrigger value="video">Video</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="grid gap-2">
                    {mediaType === "text" ? (
                      <>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Enter your story, proverb, or language entry here"
                          className="min-h-[200px]"
                          required
                        />
                      </>
                    ) : (
                      <>
                        <Label htmlFor="media-upload">Upload {mediaType}</Label>
                        <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-muted/40 hover:bg-muted">
                          <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                            <Upload className="h-8 w-8" />
                            <span>Click to upload or drag and drop</span>
                            <span className="text-xs">
                              {mediaType === "audio" && "MP3, WAV (max 10MB)"}
                              {mediaType === "image" &&
                                "JPG, PNG, SVG (max 5MB)"}
                              {mediaType === "video" && "MP4, WebM (max 50MB)"}
                            </span>
                          </div>
                          <input
                            id="media-upload"
                            type="file"
                            className="sr-only"
                            accept={
                              mediaType === "audio"
                                ? "audio/*"
                                : mediaType === "image"
                                ? "image/*"
                                : "video/*"
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide context, background, or additional information about this contribution"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="region">Region/Province (Optional)</Label>
                      <Select>
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kigali">Kigali</SelectItem>
                          <SelectItem value="northern">
                            Northern Province
                          </SelectItem>
                          <SelectItem value="southern">
                            Southern Province
                          </SelectItem>
                          <SelectItem value="eastern">
                            Eastern Province
                          </SelectItem>
                          <SelectItem value="western">
                            Western Province
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="language">Language (Optional)</Label>
                      <Select>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kinyarwanda">
                            Kinyarwanda
                          </SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="swahili">Swahili</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="source">
                      Source/Attribution (Optional)
                    </Label>
                    <Input
                      id="source"
                      placeholder="e.g., Family elder, specific person, museum, book"
                    />
                  </div>

                  {/* input for google map link where the content is located if it category is art */}
                  <div className="grid gap-2">
                    <Label htmlFor="google-map-link">
                      Google Map Link (Optional)
                    </Label>
                    <Input
                      id="google-map-link"
                      placeholder="https://maps.app.goo.gl/place_id"
                      type="url"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="contributor-name">
                        Your Name (Optional)
                      </Label>
                      <Input
                        id="contributor-name"
                        placeholder="Leave blank to remain anonymous"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="contributor-email">
                        Your Email (Optional)
                      </Label>
                      <Input
                        id="contributor-email"
                        type="email"
                        placeholder="For follow-up questions if needed"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I confirm this contribution respects cultural
                      sensitivities and I have the right to share this content
                    </Label>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Submit Contribution
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
