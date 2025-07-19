"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Camera, Loader2, Pencil, Save, X } from "lucide-react";
import { REGIONS } from "@/lib/utils";
import {
  profileSchema,
  type ProfileSchema,
  validateAvatarFile,
} from "@/lib/validationSchema";
import useProfile from "@/hooks/useProfile";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/services/authService";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: profile, isLoading, error, refetch } = useProfile();
  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      refetch();
      setIsEditing(false);
      setImagePreview(null);
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    },
  });

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      region: "",
      bio: "",
      avatar: null,
    },
  });

  // Reset form when profile data is loaded
  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone || "",
        region: profile.region,
        bio: profile.bio || "",
        avatar: null, // Reset avatar to null when loading profile
      });
      setImagePreview(null);
    }
  }, [profile, form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = form;
  const watchedValues = watch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file using helper function
      const validationError = validateAvatarFile(file);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      // Set the file in the form
      setValue("avatar", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileSchema) => {
    try {
      // Only include avatar if a new file was selected
      const submissionData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        region: data.region,
        bio: data.bio,
        ...(data.avatar && { avatar: data.avatar }), // Only include avatar if it exists
      };
      
      updateUserMutation(submissionData);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone || "",
        region: profile.region,
        bio: profile.bio || "",
        avatar: null,
      });
    }
    setIsEditing(false);
    setImagePreview(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Profile
            </h1>
            <p className="text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred"}
            </p>
            <Button
              onClick={() => refetch()}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get the current avatar URL (either preview or existing)
  const currentAvatarUrl = imagePreview || profile?.avatar || "/avatar.jpg";

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="pt-4">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isPending}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={currentAvatarUrl}
                  alt="Profile picture"
                  width={70}
                  height={70}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to default avatar if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "/avatar.jpg";
                  }}
                />
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                      onClick={() =>
                        document.getElementById("avatar-upload")?.click()
                      }
                      title="Upload profile picture"
                      disabled={isPending}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {profile?.firstName} {profile?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {profile?.email}
                </p>
                {imagePreview && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ New image selected
                  </p>
                )}
                {isEditing && profile?.avatar && !imagePreview && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Current image will be preserved
                  </p>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                {isEditing ? (
                  <div>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      disabled={isPending}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm py-2">{profile?.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                {isEditing ? (
                  <div>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      disabled={isPending}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm py-2">{profile?.lastName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <div>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      readOnly
                      disabled={isPending}
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed
                    </p>
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm py-2">{profile?.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <div>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="Enter phone number"
                      disabled={isPending}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm py-2">{profile?.phone || "N/A"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                {isEditing ? (
                  <div>
                    <Select
                      value={watchedValues.region}
                      onValueChange={(value) => setValue("region", value)}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIONS.filter(
                          (region) => region.value !== "All Regions"
                        ).map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.region && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.region.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm py-2">{profile?.region || "N/A"}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <div>
                  <Textarea
                    id="bio"
                    {...register("bio")}
                    placeholder="Tell us about yourself and your cultural interests..."
                    rows={4}
                    disabled={isPending}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm py-2 leading-relaxed">
                  {profile?.bio || "N/A"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
