"use client";

import type React from "react";

import { useState } from "react";
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
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  passwordResetSchema,
  PasswordResetSchema,
} from "@/lib/validationSchema";
import { resetPassword } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function PasswordResetPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
  });

  const {
    mutate: sendResetEmail,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: PasswordResetSchema) => resetPassword(data),
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Password reset email sent successfully!", {
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

  const onSubmit: SubmitHandler<PasswordResetSchema> = async (data) => {
    sendResetEmail(data);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Success Message */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Back to home link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Umurage
            </Link>

            <Card>
              <CardHeader className="space-y-1 text-center pt-4">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Check your email
                </CardTitle>
                <CardDescription>
                  We've sent a password reset link to your email address. Please
                  check your inbox and follow the instructions to reset your
                  password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    If you don't see the email, check your spam folder or try
                    again.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="w-full"
                >
                  Send another email
                </Button>
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

  return (
    <div className="min-h-screen flex">
      {/* Left side - Password Reset Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Back to home link */}
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
                Reset your password
              </CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your
                password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="text-base"
                    autoComplete="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {error.message ||
                        "An error occurred while sending the reset email"}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Sending..." : "Send reset link"}
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
              By requesting a password reset, you agree to our{" "}
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
