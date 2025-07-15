import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flag } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// import { reportContent } from "@/services/contentService";
import toast from "react-hot-toast";
import { reportSchema, ReportSchema } from "@/lib/validationSchema";

const ReportContent = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: "",
      description: "",
    },
    mode: "onChange",
  });

  const options = [
    { label: "Inappropriate content", value: "Inappropriate content" },
    { label: "Spam or misleading", value: "Spam or misleading" },
    { label: "Copyright violation", value: "Copyright violation" },
    { label: "Harassment or bullying", value: "Harassment or bullying" },
    { label: "Violence or threats", value: "Violence or threats" },
    { label: "Other", value: "Other" },
  ];

  const onSubmit = async (data: ReportSchema) => {
    try {
      // TODO: Implement actual report submission to backend
      console.log("Submitting report:", data);

      reset();

      // Close dialog (you might need to add a ref to the dialog)
      toast.success("Report submitted successfully");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Flag className="h-4 w-4" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
          <DialogDescription>
            Help us maintain quality content by reporting inappropriate content.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for report</Label>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.reason ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Additional details (optional)</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="Please provide more details about your report..."
                  {...field}
                  rows={4}
                />
              )}
            />
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                // disabled={isSubmitting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!isValid}>
              Submit Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportContent;
