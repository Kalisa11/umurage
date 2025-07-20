import useProfile from "@/hooks/useProfile";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Home, AlertTriangle, Loader2 } from "lucide-react";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-base">Loading...</p>
        </div>
      </div>
    );
  }

  if (user?.role === "admin") {
    return <div>{children}</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center pt-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <Shield className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            Access Restricted
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm">
              You are not authorized to access this page
            </p>
          </div>
          <div className="pt-2">
            <Button asChild className="w-full" variant="default">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Protected;
