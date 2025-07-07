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
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Check, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContributePage() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="container py-12">
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
    <div className="container py-12">
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
              <AlertTitle>Account required</AlertTitle>
              <AlertDescription>
                Please create an account and login to contribute.
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
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">
                      Title<span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter a title for your contribution"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">
                      Category<span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Select required onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="proverb">Proverb</SelectItem>
                        <SelectItem value="song">Song</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">
                      Description{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a brief description of your contribution"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cover-image">Cover Image (Optional)</Label>
                    <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-muted/40 hover:bg-muted">
                      <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                        <Upload className="h-8 w-8" />
                        <span>Click to upload or drag and drop</span>
                        <span className="text-xs">JPG, PNG (max 1MB)</span>
                      </div>
                      <input
                        id="cover-image"
                        type="image"
                        className="sr-only"
                        accept="image/png, image/jpeg"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="region">
                      Region/Province
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Select required>
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
                    <Label htmlFor="contributor">
                      Contributor/Artist
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Input id="contributor" placeholder="Artist's name" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="content">
                      Content
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Textarea
                      id="content"
                      placeholder={
                        category === "song"
                          ? "Provide detailed description including traditional instruments used, lyrics, cultural significance, etc."
                          : category === "art"
                          ? "Describe the artwork, its cultural significance, creation process, materials used, etc."
                          : category === "story"
                          ? "Tell the complete story with cultural context and significance"
                          : category === "proverb"
                          ? "Provide the proverb in Kinyarwanda and its cultural context"
                          : "Provide detailed description of your cultural contribution"
                      }
                      className="min-h-[200px]"
                      required
                    />
                  </div>
                </div>

                {/* Category-Specific Fields */}
                {category === "song" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">
                      Song Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="genre">Genre</Label>
                        <Input
                          id="genre"
                          placeholder="e.g., Traditional Dance, Ceremonial"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" placeholder="e.g., 4:32" />
                      </div>
                    </div>
                  </div>
                )}

                {category === "art" && (
                  <div className="space-y-4">
                    <h3 className="text-base font-medium border-b pb-2">
                      Artwork Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="technique">Technique</Label>
                        <Input
                          id="technique"
                          placeholder="e.g., Imigongo, Weaving, Pottery"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="medium">Medium</Label>
                        <Input
                          id="medium"
                          placeholder="e.g., Cow Dung & Natural Pigments, Clay"
                        />
                      </div>
                      <div className="grid gap-2 col-span-2">
                        <Label htmlFor="google-maps">Google Maps Link</Label>
                        <Input
                          id="google-maps"
                          placeholder="e.g., https://maps.app.goo.gl/1234567890"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {category === "story" && (
                  <div className="space-y-4">
                    <h3 className="text-base font-medium border-b pb-2">
                      Story Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="reading-time">Reading Time</Label>
                        <Input
                          id="reading-time"
                          placeholder="e.g., 8 min read"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="word-length">Length in Words</Label>
                        <Input
                          id="word-length"
                          placeholder="e.g., 1,200 words"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {category === "proverb" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">
                      Proverb Details
                    </h3>

                    <div className="grid gap-2">
                      <Label htmlFor="english-translation">
                        English Translation
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <Input
                        id="english-translation"
                        placeholder="Enter the English translation"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="proverb-category">Category</Label>
                        <Select>
                          <SelectTrigger id="proverb-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="life-wisdom">
                              Life Wisdom
                            </SelectItem>
                            <SelectItem value="work-ethics">
                              Work Ethics
                            </SelectItem>
                            <SelectItem value="relationships">
                              Relationships
                            </SelectItem>
                            <SelectItem value="nature">Nature</SelectItem>
                            <SelectItem value="community">Community</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select>
                          <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="meaning">
                        Meaning
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <Textarea
                        id="meaning"
                        placeholder="Explain the main meaning of the proverb"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="detailed-explanation">
                        Detailed Explanation
                      </Label>
                      <Textarea
                        id="detailed-explanation"
                        placeholder="Provide a more detailed explanation of the proverb's origin and context"
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="when-to-use">When to Use</Label>
                      <Textarea
                        id="when-to-use"
                        placeholder="Describe situations where this proverb is appropriate"
                      />
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I confirm this contribution respects cultural
                      sensitivities and I have the right to share this content.
                      I understand that my submission will be reviewed before
                      publication.
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={!category}>
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
