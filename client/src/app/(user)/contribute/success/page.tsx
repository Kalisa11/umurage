"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  return (
    <div className="container flex h-screen items-center justify-center py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="pt-4">
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
          <Button onClick={() => router.push("/contribute")}>
            Submit Another
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/contribute")}
          >
            Return Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
