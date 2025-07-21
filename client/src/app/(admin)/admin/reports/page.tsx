"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  User,
  Calendar,
  Eye,
  Trash,
} from "lucide-react";

// Mock data based on the actual schema
const mockReports = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    contentId: "550e8400-e29b-41d4-a716-446655440003",
    reason: "Inappropriate content",
    details:
      "This story contains content that may not be appropriate for all audiences and doesn't align with traditional cultural values.",
    status: "pending",
    createdOn: "2024-01-10T10:30:00Z",
    updatedOn: "2024-01-10T10:30:00Z",
    // Joined data from other tables
    reporter: {
      name: "Sarah Mukamana",
      email: "sarah@example.com",
    },
    content: {
      title: "The Lost Village Story",
      category: "story",
      contributor: "Anonymous User",
      region: "Northern Province",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    userId: "550e8400-e29b-41d4-a716-446655440005",
    contentId: "550e8400-e29b-41d4-a716-446655440006",
    reason: "Inaccurate translation",
    details:
      "The English translation provided doesn't accurately reflect the original meaning of this traditional proverb. I am a native speaker and this translation is misleading.",
    status: "pending",
    createdOn: "2024-01-09T14:15:00Z",
    updatedOn: "2024-01-09T14:15:00Z",
    reporter: {
      name: "Jean Baptiste Nzeyimana",
      email: "jean@example.com",
    },
    content: {
      title: "Wisdom of the Elders",
      category: "proverb",
      contributor: "Cultural Expert",
      region: "Eastern Province",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    userId: "550e8400-e29b-41d4-a716-446655440008",
    contentId: "550e8400-e29b-41d4-a716-446655440009",
    reason: "Copyright violation",
    details:
      "This artwork appears to be copied from another artist's work without proper attribution. The original artist is Marie Uwimana from Kigali.",
    status: "pending",
    createdOn: "2024-01-08T09:45:00Z",
    updatedOn: "2024-01-08T09:45:00Z",
    reporter: {
      name: "Marie Uwimana",
      email: "marie@example.com",
    },
    content: {
      title: "Traditional Basket Weaving",
      category: "art",
      contributor: "Art Collector",
      region: "Kigali City",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    userId: "550e8400-e29b-41d4-a716-446655440011",
    contentId: "550e8400-e29b-41d4-a716-446655440012",
    reason: "Spam content",
    details: null,
    status: "resolved",
    createdOn: "2024-01-07T16:20:00Z",
    updatedOn: "2024-01-08T11:30:00Z",
    reporter: {
      name: "Community Moderator",
      email: "moderator@example.com",
    },
    content: {
      title: "Promotional Song",
      category: "song",
      contributor: "Marketing Account",
      region: "Western Province",
    },
  },
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "dismissed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleResolveReport = (id: string) => {
    console.log("Resolving report:", id);
    // Implementation for resolving report
  };

  const handleDismissReport = (id: string) => {
    console.log("Dismissing report:", id);
    // Implementation for dismissing report
  };

  const handleRemoveContent = (contentId: string) => {
    console.log("Removing content:", contentId);
    // Implementation for removing content
  };

  const handleViewContent = (contentId: string) => {
    console.log("Viewing content:", contentId);
    // Implementation for viewing content
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = mockReports.filter((r) => r.status === "pending").length;
  const resolvedCount = mockReports.filter(
    (r) => r.status === "resolved"
  ).length;
  const dismissedCount = mockReports.filter(
    (r) => r.status === "dismissed"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="w-fit">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Content Reports
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Review and manage community reports
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-fit">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium pt-2 text-foreground">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockReports.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium pt-2 text-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {pendingCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium pt-2 text-foreground">
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {resolvedCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium pt-2 text-foreground">
                Dismissed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-600">
                {dismissedCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports, content, or reporters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No reports found
                </h3>
                <p className="text-muted-foreground text-base">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No reports have been submitted yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
                          <Card
              key={report.id}
              className={`${
                report.status === "pending" ? "border-primary/20" : ""
              }`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    {/* Header with badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge
                        className={getCategoryColor(report.content.category)}
                      >
                        {getCategoryIcon(report.content.category)}
                        <span className="ml-1 capitalize">
                          {report.content.category}
                        </span>
                      </Badge>
                      <Badge className={getStatusColor(report.status)}>
                        <span className="capitalize">{report.status}</span>
                      </Badge>
                      {report.status === "pending" && (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Needs Review</span>
                          <span className="sm:hidden">Review</span>
                        </Badge>
                      )}
                    </div>

                      {/* Content Title */}
                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {report.content.title}
                      </h3>

                      {/* Report Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="font-medium text-xs sm:text-sm">Reported by:</span>
                            <span className="text-xs sm:text-sm">{report.reporter.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="font-medium text-xs sm:text-sm">Reported on:</span>
                            <span className="text-xs sm:text-sm">{formatDate(report.createdOn)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-xs sm:text-sm">Content by:</span>{" "}
                            <span className="text-xs sm:text-sm">{report.content.contributor}</span>
                          </div>
                          <div>
                            <span className="font-medium text-xs sm:text-sm">Region:</span>{" "}
                            <span className="text-xs sm:text-sm">{report.content.region}</span>
                          </div>
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="mb-3">
                        <span className="font-medium text-red-700 dark:text-red-300 text-xs sm:text-sm">
                          Reason:{" "}
                        </span>
                        <span className="text-red-600 dark:text-red-400 text-xs sm:text-sm">
                          {report.reason}
                        </span>
                      </div>

                      {/* Details */}
                      {report.details && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Details: </span>
                            {report.details}
                          </p>
                        </div>
                      )}

                      {/* Timestamps */}
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="block sm:inline">Created: {formatDate(report.createdOn)}</span>
                        {report.updatedOn !== report.createdOn && (
                          <span className="block sm:inline sm:ml-4 mt-1 sm:mt-0">
                            Updated: {formatDate(report.updatedOn)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {/* <div className="flex flex-row lg:flex-col gap-2 lg:ml-4"> */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewContent(report.contentId)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Content
                      </Button>

                      {report.status === "pending" && (
                        <>
                          <Button
                            onClick={() => handleResolveReport(report.id)}
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Resolve
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <XCircle className="h-4 w-4 mr-2" />
                                Dismiss
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Dismiss Report
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to dismiss this report?
                                  The content will remain published and the
                                  report will be marked as dismissed.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDismissReport(report.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Dismiss Report
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Remove Content
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this content?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleRemoveContent(report.contentId)
                                  }
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
