"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  XCircle,
  Search,
  AlertTriangle,
  Globe,
  LogOut,
  User,
  Calendar,
  Eye,
} from "lucide-react";
import {
  approveContent,
  getApprovedContent,
  getPendingContent,
  rejectContent,
} from "@/services/contentService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategoryColor, getCategoryIcon } from "@/utils";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Protected from "@/components/protected";
import { signOut } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const {
    data: pendingContent,
    isLoading,
    error,
    refetch: refetchPendingContent,
  } = useQuery({
    queryKey: ["pendingContent"],
    queryFn: getPendingContent,
  });

  const {
    data: approvedContent,
    isLoading: isApprovedContentLoading,
    error: approvedContentError,
    refetch: refetchApprovedContent,
  } = useQuery({
    queryKey: ["approvedContent"],
    queryFn: getApprovedContent,
  });

  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: approveContent,
    onSuccess: () => {
      toast.success("Content approved successfully");
      refetchPendingContent();
      refetchApprovedContent();
    },
    onError: () => {
      toast.error("Failed to approve content, please try again");
    },
  });

  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      rejectContent(id, reason),
    onSuccess: () => {
      toast.success("Content rejected successfully");
      refetchPendingContent();
      refetchApprovedContent();
    },
    onError: () => {
      toast.error("Failed to reject content, please try again");
    },
  });

  const handleApprove = (id: string) => {
    approve(id);
  };

  const handleReject = (id: string, reason: string) => {
    if (!reason) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    reject({ id, reason });
  };

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: signOut,
  });

  const filteredSubmissions = pendingContent?.filter(
    (submission) =>
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.contributor?.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      submission.contributor?.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      submission.region?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Protected>
      <div className="min-h-screen">
        {/* Simple Admin Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Globe className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage content submissions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:space-x-4">
                <Link href="/admin/reports">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    <AlertTriangle className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Reported Content</span>
                    <span className="sm:hidden">Reports</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Simple Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="pt-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 ">
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {pendingContent?.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pt-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Approved Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {approvedContent?.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pt-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">2</div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Content List */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Unreviewed Submissions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredSubmissions?.map((submission) => (
                <Card key={submission.id} className="w-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      {/* <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={"/placeholder.png"}
                        alt={submission.title}
                        fill
                        className="object-cover"
                      />
                    </div> */}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge
                                className={getCategoryColor(
                                  submission.category?.name || ""
                                )}
                              >
                                {React.createElement(
                                  getCategoryIcon(
                                    submission.category?.name ?? ""
                                  ),
                                  {
                                    className: "h-4 w-4",
                                  }
                                )}

                                <span className="ml-1 capitalize">
                                  {submission.category?.name}
                                </span>
                              </Badge>
                              <Badge variant="outline">
                                {submission.region}
                              </Badge>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold mb-2">
                              {submission.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 text-sm">
                              {submission.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>
                                  {submission.contributor?.firstName}{" "}
                                  {submission.contributor?.lastName}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {format(
                                    new Date(submission.createdAt || ""),
                                    "MMMM d, yyyy"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-row items-stretch sm:items-center gap-2">
                      <Link
                        target="_blank"
                        href={`/content/${submission.category?.name.toLowerCase()}/${
                          submission.id
                        }`}
                      >
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md mx-4">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Approve Submission
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to approve this submission?
                              This will make it visible on the platform.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleApprove(submission.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md mx-4">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Reject Submission
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Please provide a reason for rejecting this
                              submission.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <Textarea
                            placeholder="Reason for rejection..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="min-h-20"
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                handleReject(submission.id, rejectionReason);
                                setRejectionReason("");
                              }}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}
