"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Eye, EyeOff, CheckCircle, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  newPasswordSchema,
  NewPasswordSchema,
} from "@/lib/validationSchema";
import { updatePassword } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function NewPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  });

  const {
    mutate: updateUserPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: NewPasswordSchema) => updatePassword(data),
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Password updated successfully!", {
        duration: 5000,
        position: "top-center",
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred", {
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const onSubmit: SubmitHandler<NewPasswordSchema> = async (data) => {
    updateUserPassword(data);
  };

  // Check if user has a valid session for password reset
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session error:", error);
          setIsValidSession(false);
        } else if (session) {
          setIsValidSession(true);
        } else {
          setIsValidSession(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsValidSession(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error if no valid session
  if (!isValidSession) {
    return (
      <div className="min-h-screen flex">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md space-y-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>

            <Card>
              <CardHeader className="space-y-1 text-center pt-4">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Lock className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Invalid Reset Link
                </CardTitle>
                <CardDescription>
                  This password reset link is invalid or has expired. Please request a new password reset link.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col space-y-4">
                <Link href="/passwordReset">
                  <Button className="w-full">
                    Request New Reset Link
                  </Button>
                </Link>
                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Right side - Cultural Image */}
        <div className="hidden lg:flex lg:flex-1 relative">
          <Image
            src="/image.png?height=1080&width=1080"
            alt="Traditional Rwandan cultural scene"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Preserving Rwanda's Cultural Heritage
            </h2>
            <p className="text-lg opacity-90">
              Join our community of cultural preservationists and help document
              the rich traditions of Rwanda for future generations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Success Message */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md space-y-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>

            <Card>
              <CardHeader className="space-y-1 text-center pt-4">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Password Updated Successfully
                </CardTitle>
                <CardDescription>
                  Your password has been updated. You can now sign in with your new password.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col space-y-4">
                <Link href="/login">
                  <Button className="w-full">
                    Sign In
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Right side - Cultural Image */}
        <div className="hidden lg:flex lg:flex-1 relative">
          <Image
            src="/image.png?height=1080&width=1080"
            alt="Traditional Rwandan cultural scene"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Preserving Rwanda's Cultural Heritage
            </h2>
            <p className="text-lg opacity-90">
              Join our community of cultural preservationists and help document
              the rich traditions of Rwanda for future generations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - New Password Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold pt-4">
                Set New Password
              </CardTitle>
              <CardDescription>
                Enter your new password below. Make sure it's secure and easy to remember.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      required
                      className="text-base pr-10"
                      autoComplete="new-password"
                      {...register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      required
                      className="text-base pr-10"
                      autoComplete="new-password"
                      {...register("confirmPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {error.message ||
                        "An error occurred while updating your password"}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-muted-foreground w-full">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By updating your password, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Cultural Image */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <Image
          src="/image.png?height=1080&width=1080"
          alt="Traditional Rwandan cultural scene"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Preserving Rwanda's Cultural Heritage
          </h2>
          <p className="text-lg opacity-90">
            Join our community of cultural preservationists and help document
            the rich traditions of Rwanda for future generations.
          </p>
        </div>
      </div>
    </div>
  );
} 