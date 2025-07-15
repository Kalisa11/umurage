import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, ArrowRight, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { REGIONS } from "@/lib/utils";
import { Proverb } from "@/types";

const ProverbsView = ({
  proverbs,
  loading,
}: {
  proverbs: Proverb[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search content by title..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="All Regions">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {proverbs?.map((proverb) => (
          <Link href={`/content/proverbs/${proverb.id}`} key={proverb.id}>
            <Card key={proverb.id} className="hover:shadow-md transition-all">
              <CardHeader className="py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={"bg-purple-500"}>
                        {proverb.proverbCategory}
                      </Badge>
                      <Badge className={`capitalize`}>
                        {proverb.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{proverb.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-2">
                <div>
                  <p className="font-medium">{proverb.title}</p>
                  <p className="italic text-muted-foreground">
                    {proverb.englishTranslation}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {proverb.description}
                </p>
              </CardContent>

              <CardFooter className="flex justify-between items-center pt-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>
                    {proverb.contributor?.firstName}{" "}
                    {proverb.contributor?.lastName}
                  </span>
                </div>
                <Link
                  href={`/content/${proverb.id}`}
                  className="text-sm font-medium text-primary flex items-center"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>

              {/* <CardFooter className="pt-0">
            <Link
              href={`/content/${proverb.id}`}
              className="text-sm font-medium text-primary flex items-center"
            >
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter> */}
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProverbsView;
