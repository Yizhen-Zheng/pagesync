"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";

export default function DeleteButton({ summaryId }: { summaryId: string }) {
  // hooks
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  // event handler
  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction(summaryId);
      if (result.success) {
        toast.success("Summary deleted successfully");
      } else {
        toast.error("Error deleting summary");
      }
      setOpen(false);
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            className=" bg-gray-900   hover:text-gray-600 "
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : " Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
