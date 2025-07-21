import { CATEGORIES } from "@/lib/utils";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 md:py-12 px-4 md:px-0">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Umurage</h3>
            <p className="text-sm text-muted-foreground">
              Preserving and celebrating Rwandan indigenous culture for future
              generations.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/categories/${CATEGORIES.STORY}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href={`/categories/${CATEGORIES.PROVERB}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Proverbs
                </Link>
              </li>
              <li>
                <Link
                  href={`/categories/${CATEGORIES.MUSIC}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link
                  href={`/categories/${CATEGORIES.ART}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Art
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  How to Contribute
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                Email: info@umurage.rw
              </li>
              <li className="text-sm text-muted-foreground">
                Phone: +250 782 051 980
              </li>
              <li className="text-sm text-muted-foreground">Kigali, Rwanda</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Umurage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
