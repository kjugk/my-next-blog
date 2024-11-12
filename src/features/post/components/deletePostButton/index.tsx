"use client";

import { Button } from "@/components/ui/button";
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
import { useState, useTransition } from "react";
import { deletePost } from "../../serverFunctions/deletePost";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export const DeletePostButton = ({ id }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      const { message, status } = await deletePost(id);

      toast({
        title: message,
        variant: status === "error" ? "destructive" : "default",
      });

      if (status === "success") {
        router.refresh();
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">削除</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>投稿を削除</DialogTitle>
          <DialogDescription>削除してよいですか?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              キャンセル
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={pending}
          >
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
