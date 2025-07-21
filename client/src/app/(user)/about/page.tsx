import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Book, Speech, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          About Umurage
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
          Preserving Rwanda's indigenous culture for future generations
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="mt-4 text-muted-foreground">
            Umurage is dedicated to preserving and celebrating Rwanda's rich
            indigenous cultural heritage. Our mission is to create a
            comprehensive digital repository that documents, archives, and
            shares traditional stories, proverbs, songs, artwork, and indigenous
            language entries.
          </p>
          <p className="mt-4 text-muted-foreground">
            By making these cultural treasures accessible to all, we aim to
            ensure that Rwanda's indigenous knowledge is preserved for future
            generations, while fostering a deeper appreciation for the country's
            cultural identity both locally and globally.
          </p>
        </div>
        <div className="relative h-[300px] overflow-hidden rounded-lg md:h-auto">
          <Image
            src="/image.png?height=600&width=800"
            alt="Traditional Rwandan cultural celebration"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Speech className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Authenticity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We are committed to preserving the authentic voice and context
                of cultural contributions, ensuring they remain true to their
                origins.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Inclusivity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We welcome contributions from all Rwandans, regardless of age,
                background, or location, creating a platform that represents
                diverse perspectives.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Education</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We believe in the power of cultural knowledge to educate and
                inspire, particularly for younger generations and the diaspora
                community.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Respect</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We approach all cultural content with deep respect,
                acknowledging its significance and ensuring appropriate
                attribution.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          The Importance of Cultural Preservation
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative h-[300px] overflow-hidden rounded-lg md:h-auto">
            <Image
              src="/about.png?height=600&width=800"
              alt="Elders sharing knowledge with youth"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-muted-foreground">
              Rwanda's indigenous culture is a treasure trove of wisdom,
              creativity, and historical knowledge that has been passed down
              through generations. However, in our rapidly changing world, there
              is a risk that these cultural elements may fade away if not
              actively preserved.
            </p>
            <p className="mt-4 text-muted-foreground">
              By digitizing and archiving these cultural assets, Umurage helps
              to:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                • Bridge the gap between generations, connecting elders with
                youth
              </li>
              <li>
                • Provide educational resources for schools and researchers
              </li>
              <li>• Strengthen cultural identity and pride among Rwandans</li>
              <li>• Share Rwanda's rich heritage with the global community</li>
              <li>
                • Create a permanent record that can withstand the test of time
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-lg bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold">Join Our Mission</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Whether you're an elder with stories to share, a researcher interested
          in Rwandan culture, or simply passionate about preserving indigenous
          knowledge, we invite you to join our community.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contribute">Contribute Content</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
