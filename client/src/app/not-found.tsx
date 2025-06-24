import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center h-[50vh] px-4 md:px-0">
      <h1 className="text-4xl font-bold text-center">
        404 - Page Not Found
      </h1>
      <p className="text-base text-center">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
