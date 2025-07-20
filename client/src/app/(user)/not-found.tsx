"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex flex-col items-center gap-4 justify-center h-[50vh] px-4 md:px-0">
      <h1 className="text-4xl font-bold text-center">404 - Page Not Found</h1>
      <p className="text-base text-center">
        The page you are looking for does not exist.
      </p>
      <div className="flex gap-4">
        <Button onClick={handleGoBack}>
          <ArrowLeft className="w-4 h-4" />
          Go back
        </Button>
        <Button asChild>
          <Link href="/">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
