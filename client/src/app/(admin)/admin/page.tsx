"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  AlertTriangle,
  FileText,
  Music,
  Palette,
  MessageSquare,
  Globe,
  User,
  Calendar,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [rejectionReason, setRejectionReason] = useState("");

  // Mock data for demonstration
  const pendingSubmissions = [
    {
      id: "1",
      title: "The Legend of Nyiragongo",
      category: "story",
      contributor: "Marie Uwimana",
      submittedDate: "2024-01-15",
      region: "Northern Province",
      image: "/placeholder.png?height=200&width=300",
      description:
        "A traditional story about the formation of Nyiragongo volcano...",
      readingTime: "8 min",
      wordCount: 1200,
    },
    {
      id: "2",
      title: "Intore Victory Dance",
      category: "song",
      contributor: "Jean Baptiste Nzeyimana",
      submittedDate: "2024-01-14",
      region: "Kigali",
      image: "/placeholder.png?height=200&width=300",
      description:
        "Traditional warrior dance song performed during celebrations...",
      duration: "4:30",
      genre: "Traditional",
    },
    {
      id: "3",
      title: "Imigongo Art Pattern",
      category: "art",
      contributor: "Agnes Mukamana",
      submittedDate: "2024-01-13",
      region: "Eastern Province",
      image: "/placeholder.png?height=200&width=300",
      description: "Traditional geometric patterns used in Imigongo art...",
      technique: "Cow dung painting",
      medium: "Natural pigments",
    },
    {
      id: "4",
      title: "Wisdom of the Elders",
      category: "proverb",
      contributor: "Samuel Habimana",
      submittedDate: "2024-01-12",
      region: "Southern Province",
      image: "/placeholder.png?height=200&width=300",
      description:
        "Collection of traditional proverbs about respect and wisdom...",
      difficulty: "Intermediate",
      englishTranslation: "The one who respects elders walks in wisdom",
    },
  ];

  const reportedContent = [
    {
      id: "5",
      title: "Controversial Story",
      category: "story",
      contributor: "Anonymous User",
      reportedBy: "Community Member",
      reportDate: "2024-01-10",
      reason: "Inappropriate content",
      description: "Content reported for containing inappropriate material...",
      reportCount: 3,
    },
    {
      id: "6",
      title: "Disputed Proverb",
      category: "proverb",
      contributor: "John Doe",
      reportedBy: "Cultural Expert",
      reportDate: "2024-01-09",
      reason: "Inaccurate translation",
      description: "Translation accuracy questioned by cultural expert...",
      reportCount: 1,
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

  const handleApprove = (id: string) => {
    console.log("Approving submission:", id);
    // Implementation for approval
  };

  const handleReject = (id: string, reason: string) => {
    console.log("Rejecting submission:", id, "Reason:", reason);
    // Implementation for rejection
  };

  const filteredSubmissions = pendingSubmissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.contributor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || submission.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Inkomoko Admin
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Content Management Dashboard
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="h-4 w-4" />
                <span>Admin User</span>
              </div>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium pt-4">
                Pending Reviews
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium pt-4">
                Approved Today
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+8 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium pt-4">
                Reported Content
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium pt-4">
                Total Content
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+15 this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Management Tabs */}
        <Tabs
          defaultValue="pending"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="pending">
                Pending ({pendingSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="reported">
                Reported ({reportedContent.length})
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="story">Stories</SelectItem>
                  <SelectItem value="song">Songs</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="proverb">Proverbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pending Submissions */}
          <TabsContent value="pending">
            <div className="grid gap-6">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="relative w-48 h-32 flex-shrink-0">
                      <Image
                        src={submission.image || "/placeholder.png"}
                        alt={submission.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge
                              className={getCategoryColor(submission.category)}
                            >
                              {getCategoryIcon(submission.category)}
                              <span className="ml-1 capitalize">
                                {submission.category}
                              </span>
                            </Badge>
                            <Badge variant="outline">{submission.region}</Badge>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {submission.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                            {submission.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{submission.contributor}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(
                                  submission.submittedDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            {submission.readingTime && (
                              <span>
                                Reading time: {submission.readingTime}
                              </span>
                            )}
                            {submission.duration && (
                              <span>Duration: {submission.duration}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(submission.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Reject Submission
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Please provide a reason for rejecting this
                                  submission. This will be sent to the
                                  contributor.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <Textarea
                                placeholder="Reason for rejection..."
                                value={rejectionReason}
                                onChange={(e) =>
                                  setRejectionReason(e.target.value)
                                }
                                className="min-h-20"
                              />
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    handleReject(
                                      submission.id,
                                      rejectionReason
                                    );
                                    setRejectionReason("");
                                  }}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Reject Submission
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Approved Content */}
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle className="pt-4">Approved Content</CardTitle>
                <CardDescription>
                  Content that has been reviewed and approved for publication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No approved content to display
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Approved content will appear here for review and management.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reported Content */}
          <TabsContent value="reported">
            <div className="grid gap-6">
              {reportedContent.map((report) => (
                <Card
                  key={report.id}
                  className="border-red-200 dark:border-red-800"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <CardTitle className="text-red-800 dark:text-red-300">
                          {report.title}
                        </CardTitle>
                        <Badge className={getCategoryColor(report.category)}>
                          {getCategoryIcon(report.category)}
                          <span className="ml-1 capitalize">
                            {report.category}
                          </span>
                        </Badge>
                      </div>
                      <Badge variant="destructive">
                        {report.reportCount} reports
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
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
                      <p className="text-gray-600 dark:text-gray-300">
                        {report.description}
                      </p>
                      <div className="flex items-center space-x-2 pt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review Content
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Dismiss Report
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="h-4 w-4 mr-2" />
                          Remove Content
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
