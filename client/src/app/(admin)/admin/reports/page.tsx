"use client";

import React, { useState } from "react";
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
import {
  getReports,
  rejectContent,
  updateReportStatus,
} from "@/services/contentService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getCategoryColor, getCategoryIcon, getStatusColor } from "@/utils";
import toast from "react-hot-toast";
import { reportFilters } from "@/lib/utils";
import { signOut } from "@/services/authService";

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: reports,
    isLoading,
    error,
    refetch: refetchReports,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  const { mutate: updateReport } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateReportStatus(id, status),
    onSuccess: () => {
      toast.success("Report status updated successfully");
      refetchReports();
    },
    onError: () => {
      toast.error("Failed to update report status");
    },
  });

  const { mutate: removeContent } = useMutation({
    mutationFn: (id: string) => rejectContent(id, ""),
    onError: () => {
      toast.error("Failed to remove content");
    },
  });
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: signOut,
  });
  const handleResolveReport = (id: string) => {
    updateReport({ id, status: "resolved" });
  };

  const handleDismissReport = (id: string) => {
    updateReport({ id, status: "dismissed" });
  };

  const handleRemoveContent = (contentId: string, reportId: string) => {
    removeContent(contentId);
    // mark the report as resolved
    updateReport({ id: reportId, status: "resolved" });
    refetchReports();
  };

  const filteredReports = reports?.filter((report) => {
    const matchesSearch =
      report.reportedContent?.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.reporter?.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  console.log(filteredReports);

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
            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              disabled={isLoggingOut}
              onClick={() => logout()}
            >
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
              <div className="text-3xl font-bold">{reports?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium pt-2 text-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {reports?.filter((r) => r.status === "pending").length || 0}
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
                {reports?.filter((r) => r.status === "resolved").length || 0}
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
              <div className="text-3xl font-bold text-red-600">
                {reports?.filter((r) => r.status === "dismissed").length || 0}
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
              {reportFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports?.length === 0 ? (
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
            filteredReports?.map((report) => (
              <Card
                key={report.reportId}
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
                          className={getCategoryColor(
                            report.category?.name || ""
                          )}
                        >
                          {React.createElement(
                            getCategoryIcon(report.category?.name),
                            {
                              className: "h-4 w-4",
                            }
                          )}
                          <span
                            className={`ml-1 capitalize ${getCategoryColor(
                              report.category?.name || ""
                            )}`}
                          >
                            {report.category?.name}
                          </span>
                        </Badge>
                        <Badge
                          className={getStatusColor(report.status || "")}
                          variant="outline"
                        >
                          <span className="capitalize">{report.status}</span>
                        </Badge>
                        {report.status === "pending" && (
                          <Badge variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">
                              Needs Review
                            </span>
                            <span className="sm:hidden">Review</span>
                          </Badge>
                        )}
                      </div>

                      {/* Content Title */}
                      <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {report.reportedContent?.title}
                      </h3>

                      {/* Report Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="font-medium text-xs sm:text-sm">
                              Reported by:
                            </span>
                            <span className="text-xs sm:text-sm">
                              {report.reporter
                                ? `${report.reporter?.firstName} ${report.reporter?.lastName}`
                                : "Anonymous User"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="font-medium text-xs sm:text-sm">
                              Reported on:
                            </span>
                            <span className="text-xs sm:text-sm">
                              {format(
                                report.createdOn,
                                "MMMM d, yyyy, hh:mm a"
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-xs sm:text-sm">
                              Content by:
                            </span>{" "}
                            <span className="text-xs sm:text-sm">
                              {report.contributor
                                ? `${report.contributor?.firstName} ${report.contributor?.lastName}`
                                : "Anonymous User"}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-xs sm:text-sm">
                              Region:
                            </span>{" "}
                            <span className="text-xs sm:text-sm">
                              {report.reportedContent?.region}
                            </span>
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
                        <span className="block sm:inline">
                          Content created on:{" "}
                          {format(
                            report.reportedContent?.createdOn,
                            "MMMM d, yyyy, hh:mm a"
                          )}
                        </span>
                        {report.updatedOn !== report.createdOn && (
                          <span className="block sm:inline sm:ml-4 mt-1 sm:mt-0">
                            Updated:{" "}
                            {format(report.updatedOn, "MMMM d, yyyy, hh:mm a")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {/* <div className="flex flex-row lg:flex-col gap-2 lg:ml-4"> */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/content/${report.category?.name.toLowerCase()}/${
                          report.reportedContent?.id
                        }`}
                        target="_blank"
                      >
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Content
                        </Button>
                      </Link>
                      {report.status === "pending" && (
                        <>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">
                                  Resolve
                                </span>
                                <span className="sm:hidden">Resolve</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Resolve Report
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogDescription>
                                Are you sure you want to resolve this report?
                                The content will remain published and the report
                                will be marked as resolved.
                              </AlertDialogDescription>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleResolveReport(report.reportId)
                                  }
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Resolve Report
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

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
                                  onClick={() =>
                                    handleDismissReport(report.reportId)
                                  }
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
                                    handleRemoveContent(
                                      report.contentId,
                                      report.reportId
                                    )
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
