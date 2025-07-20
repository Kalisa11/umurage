"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CheckCircle,
  XCircle,
  Search,
  AlertTriangle,
  FileText,
  Music,
  Palette,
  MessageSquare,
  Globe,
  LogOut,
  ArrowLeft,
  Flag,
} from "lucide-react";

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for reported content
  const reportedContent = [
    {
      id: "1",
      title: "Controversial Story Content",
      category: "story",
      contributor: "Anonymous User",
      reportedBy: "Community Member",
      reportDate: "2024-01-10",
      reason: "Inappropriate content",
      description:
        "This story contains content that may not be appropriate for all audiences and doesn't align with traditional values.",
      reportCount: 3,
      status: "pending",
    },
    {
      id: "2",
      title: "Disputed Proverb Translation",
      category: "proverb",
      contributor: "John Doe",
      reportedBy: "Cultural Expert",
      reportDate: "2024-01-09",
      reason: "Inaccurate translation",
      description:
        "The English translation provided doesn't accurately reflect the original meaning of this traditional proverb.",
      reportCount: 1,
      status: "pending",
    },
    {
      id: "3",
      title: "Questionable Art Attribution",
      category: "art",
      contributor: "Art Collector",
      reportedBy: "Local Artist",
      reportDate: "2024-01-08",
      reason: "Copyright concern",
      description:
        "This artwork appears to be copied from another artist's work without proper attribution.",
      reportCount: 2,
      status: "pending",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "story":
        return <FileText className="h-4 w-4" />;
      case "song":
        return <Music className="h-4 w-4" />;
      case "art":
        return <Palette className="h-4 w-4" />;
      case "proverb":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "story":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "song":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "art":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "proverb":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleDismissReport = (id: string) => {
    console.log("Dismissing report:", id);
    // Implementation for dismissing report
  };

  const handleRemoveContent = (id: string) => {
    console.log("Removing content:", id);
    // Implementation for removing content
  };

  const filteredReports = reportedContent.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.contributor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Reported Content
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Review community reports
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {reportedContent.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {reportedContent.filter((r) => r.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Resolved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">5</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Pending Reports</h2>
          {filteredReports.map((report) => (
            <Card
              key={report.id}
              className="border-red-200 dark:border-red-800"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <Badge className={getCategoryColor(report.category)}>
                        {getCategoryIcon(report.category)}
                        <span className="ml-1 capitalize">
                          {report.category}
                        </span>
                      </Badge>
                      <Badge variant="destructive">
                        <Flag className="h-3 w-3 mr-1" />
                        {report.reportCount} reports
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 text-red-800 dark:text-red-300">
                      {report.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium">Contributor:</span>{" "}
                        {report.contributor}
                      </div>
                      <div>
                        <span className="font-medium">Reported by:</span>{" "}
                        {report.reportedBy}
                      </div>
                      <div>
                        <span className="font-medium">Report date:</span>{" "}
                        {new Date(report.reportDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Reason:</span>{" "}
                        {report.reason}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {report.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      onClick={() => handleDismissReport(report.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Dismiss Report
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Remove Content
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Content</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this content? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveContent(report.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Remove Content
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
