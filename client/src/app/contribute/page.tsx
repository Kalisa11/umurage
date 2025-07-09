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
import useSession from "@/hooks/useSession";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categoryService";
import { CATEGORIES } from "@/lib/utils";
import {
  contributeSchema,
  validateFileSize,
  validateFileType,
  type ContributeSchema,
} from "@/lib/validationSchema";

export default function ContributePage() {
  const [submitted, setSubmitted] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contributeSchema),
    defaultValues: {
      isFeatured: false,
      terms: false,
      region: "",
      difficulty: undefined,
    },
  });

  const { category } = watch();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (1MB for images)
      const sizeError = validateFileSize(file, 1);
      if (sizeError) {
        setFileErrors((prev) => ({ ...prev, coverImage: sizeError }));
        return;
      }

      // Validate file type
      const typeError = validateFileType(file, ["image/jpeg", "image/png"]);
      if (typeError) {
        setFileErrors((prev) => ({ ...prev, coverImage: typeError }));
        return;
      }

      setCoverImage(file);
      setValue("coverImage", file);
      setFileErrors((prev) => ({ ...prev, coverImage: "" }));
    }
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (10MB for audio)
      const sizeError = validateFileSize(file, 10);
      if (sizeError) {
        setFileErrors((prev) => ({ ...prev, audioFile: sizeError }));
        return;
      }

      // Validate file type
      const typeError = validateFileType(file, [
        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/ogg",
      ]);
      if (typeError) {
        setFileErrors((prev) => ({ ...prev, audioFile: typeError }));
        return;
      }

      setAudioFile(file);
      setValue("audioFile", file);
      setFileErrors((prev) => ({ ...prev, audioFile: "" }));
    }
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

  const { data: session } = useSession();

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
                <li>• Account required to contribute</li>
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">
                      Category
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        reset();
                        setValue("category", Number(value));
                      }}
                      {...register("category")}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">
                      Title
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder={
                        category === CATEGORIES.PROVERB
                          ? "Enter the proverb in Kinyarwanda"
                          : "Enter a title for your contribution"
                      }
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">
                      Description
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a brief description of your contribution"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Cover Image - Required for Art, Story, Song */}
                  {(category === CATEGORIES.ART ||
                    category === CATEGORIES.STORY ||
                    category === CATEGORIES.MUSIC) && (
                    <div className="grid gap-2">
                      <Label htmlFor="cover-image">
                        Cover Image
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <label
                        htmlFor="cover-image"
                        className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-muted/40 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                          <Upload className="h-8 w-8" />
                          <span>Click to upload or drag and drop</span>
                          <span className="text-xs">JPG, PNG (max 1MB)</span>
                        </div>
                      </label>

                      <input
                        id="cover-image"
                        type="file"
                        className="sr-only"
                        accept="image/png, image/jpeg"
                        onChange={handleCoverImageChange}
                      />

                      {fileErrors.coverImage && (
                        <p className="text-sm text-red-500">
                          {fileErrors.coverImage}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="contributor">
                      Contributor
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Input
                      id="contributor"
                      placeholder="Contributor's name"
                      {...register("contributor")}
                    />
                    {errors.contributor && (
                      <p className="text-sm text-red-500">
                        {errors.contributor.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="region">
                      Region
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        console.log({ value });
                        setValue("region", value);
                      }}
                      {...register("region")}
                    >
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kigali">Kigali</SelectItem>
                        <SelectItem value="Northern Province">
                          Northern Province
                        </SelectItem>
                        <SelectItem value="Southern Province">
                          Southern Province
                        </SelectItem>
                        <SelectItem value="Eastern Province">
                          Eastern Province
                        </SelectItem>
                        <SelectItem value="Western Province">
                          Western Province
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.region && (
                      <p className="text-sm text-red-500">
                        {errors.region.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="isFeatured">
                      Is this contribution featured?
                    </Label>
                    <Checkbox
                      id="isFeatured"
                      {...register("isFeatured")}
                      onCheckedChange={(checked) => {
                        console.log({ checked });
                        setValue("isFeatured", checked as boolean);
                      }}
                    />
                  </div>

                  {/* Difficulty - Required for Proverbs, Art, Story */}
                  {(category === CATEGORIES.PROVERB ||
                    category === CATEGORIES.ART ||
                    category === CATEGORIES.STORY) && (
                    <div className="grid gap-2">
                      <Label htmlFor="difficulty">
                        Difficulty
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("difficulty", value as any)
                        }
                        {...register("difficulty")}
                      >
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
                      {errors.difficulty && (
                        <p className="text-sm text-red-500">
                          {errors.difficulty.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="content">
                      Content
                      <span className="text-red-500 font-bold">*</span>
                    </Label>
                    <Textarea
                      id="content"
                      placeholder={
                        category === CATEGORIES.MUSIC
                          ? "Provide detailed description including traditional instruments used, lyrics, cultural significance, etc."
                          : category === CATEGORIES.ART
                          ? "Describe the artwork, its cultural significance, creation process, materials used, etc."
                          : category === CATEGORIES.STORY
                          ? "Tell the complete story with cultural context and significance"
                          : category === CATEGORIES.PROVERB
                          ? "Provide the proverb in Kinyarwanda and its cultural context"
                          : "Provide detailed description of your cultural contribution"
                      }
                      className="min-h-[200px]"
                      {...register("content")}
                    />
                    {errors.content && (
                      <p className="text-sm text-red-500">
                        {errors.content.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category-Specific Fields */}

                {/* Proverbs Specific Fields */}
                {category === CATEGORIES.PROVERB && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">
                      Proverb Details
                    </h3>

                    <div className="grid gap-2">
                      <Label htmlFor="englishTranslation">
                        English Translation
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <Input
                        id="englishTranslation"
                        placeholder="Enter the English translation"
                        {...register("englishTranslation")}
                      />
                      {errors.englishTranslation && (
                        <p className="text-sm text-red-500">
                          {errors.englishTranslation.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="proverbCategory">
                        Proverb Category
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setValue("proverbCategory", value as any)
                        }
                        {...register("proverbCategory")}
                      >
                        <SelectTrigger id="proverbCategory">
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
                      {errors.proverbCategory && (
                        <p className="text-sm text-red-500">
                          {errors.proverbCategory.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Art Specific Fields */}
                {category === CATEGORIES.ART && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">
                      Artwork Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="technique">
                          Technique
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="technique"
                          placeholder="e.g., Imigongo, Weaving, Pottery"
                          {...register("technique")}
                        />
                        {errors.technique && (
                          <p className="text-sm text-red-500">
                            {errors.technique.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="medium">
                          Medium
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="medium"
                          placeholder="e.g., Cow Dung & Natural Pigments, Clay"
                          {...register("medium")}
                        />
                        {errors.medium && (
                          <p className="text-sm text-red-500">
                            {errors.medium.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-medium border-b pb-2">
                      Booking Information
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="bookingName">
                          Booking Name
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="bookingName"
                          placeholder="e.g., King's Palace"
                          {...register("bookingName")}
                        />
                        {errors.bookingName && (
                          <p className="text-sm text-red-500">
                            {errors.bookingName.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bookingAddress">
                          Booking Address
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="bookingAddress"
                          placeholder="e.g., Nyanza, Rwanda"
                          {...register("bookingAddress")}
                        />
                        {errors.bookingAddress && (
                          <p className="text-sm text-red-500">
                            {errors.bookingAddress.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bookingPhone">
                          Booking Phone
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="bookingPhone"
                          placeholder="e.g., +250738742026"
                          {...register("bookingPhone")}
                        />
                        {errors.bookingPhone && (
                          <p className="text-sm text-red-500">
                            {errors.bookingPhone.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bookingEmail">
                          Booking Email
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="bookingEmail"
                          placeholder="e.g., info@kingspalace.rw"
                          {...register("bookingEmail")}
                        />
                        {errors.bookingEmail && (
                          <p className="text-sm text-red-500">
                            {errors.bookingEmail.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bookingHours">
                          Booking Hours
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="bookingHours"
                          placeholder="e.g., Monday - Saturday: 9:00 AM - 5:00 PM"
                          {...register("bookingHours")}
                        />
                        {errors.bookingHours && (
                          <p className="text-sm text-red-500">
                            {errors.bookingHours.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bookingUrl">
                          Booking URL
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="bookingUrl"
                          placeholder="e.g., https://maps.app.goo.gl/1234567890"
                          {...register("bookingUrl")}
                        />
                        {errors.bookingUrl && (
                          <p className="text-sm text-red-500">
                            {errors.bookingUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bookingLat">
                          Booking Latitude
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="bookingLat"
                          placeholder="e.g., -2.3528"
                          type="number"
                          step="any"
                          {...register("bookingLat", { valueAsNumber: true })}
                        />
                        {errors.bookingLat && (
                          <p className="text-sm text-red-500">
                            {errors.bookingLat.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bookingLong">
                          Booking Longitude
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="bookingLong"
                          placeholder="e.g., 29.7406"
                          type="number"
                          step="any"
                          {...register("bookingLong", { valueAsNumber: true })}
                        />
                        {errors.bookingLong && (
                          <p className="text-sm text-red-500">
                            {errors.bookingLong.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Story Specific Fields */}
                {category === CATEGORIES.STORY && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">
                      Story Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="readTime">
                          Read Time
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="readTime"
                          placeholder="e.g., 8 min read"
                          {...register("readTime")}
                        />
                        {errors.readTime && (
                          <p className="text-sm text-red-500">
                            {errors.readTime.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="moralLesson">
                        Moral Lesson
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <Textarea
                        id="moralLesson"
                        placeholder="What is the moral lesson of this story?"
                        {...register("moralLesson")}
                      />
                      {errors.moralLesson && (
                        <p className="text-sm text-red-500">
                          {errors.moralLesson.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="context">
                        Context
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <Textarea
                        id="context"
                        placeholder="Provide cultural and historical context for this story"
                        {...register("context")}
                      />
                      {errors.context && (
                        <p className="text-sm text-red-500">
                          {errors.context.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Song Specific Fields */}
                {category === CATEGORIES.MUSIC && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">
                      Song Details
                    </h3>

                    <div className="grid gap-2">
                      <Label htmlFor="audioFile">
                        Audio File
                        <span className="text-red-500 font-bold">*</span>
                      </Label>
                      <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-muted/40 hover:bg-muted">
                        <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                          <Upload className="h-8 w-8" />
                          <span>Click to upload or drag and drop</span>
                          <span className="text-xs">
                            MP3, WAV, OGG (max 10MB)
                          </span>
                        </div>
                        <input
                          id="audioFile"
                          type="file"
                          className="sr-only"
                          accept="audio/mpeg, audio/mp3, audio/wav, audio/ogg"
                          onChange={handleAudioFileChange}
                        />
                      </div>
                      {fileErrors.audioFile && (
                        <p className="text-sm text-red-500">
                          {fileErrors.audioFile}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="genre">
                          Genre
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="genre"
                          placeholder="e.g., Traditional Dance, Ceremonial"
                          {...register("genre")}
                        />
                        {errors.genre && (
                          <p className="text-sm text-red-500">
                            {errors.genre.message}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration">
                          Duration
                          <span className="text-red-500 font-bold">*</span>
                        </Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 4:32"
                          {...register("duration")}
                        />
                        {errors.duration && (
                          <p className="text-sm text-red-500">
                            {errors.duration.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      {...register("terms")}
                      onCheckedChange={(checked) => {
                        setValue("terms", checked as boolean);
                      }}
                    />
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
                  {errors.terms && (
                    <p className="text-sm text-red-500">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!category || !session?.session}
                >
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
