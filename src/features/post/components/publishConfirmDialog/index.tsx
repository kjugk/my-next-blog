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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { publishPost } from "../../serverFunctions/publishPost";

type Props = {
  id: number;
};

export const PublishConfirmDialog = ({ id }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handlePublish = () => {
    startTransition(async () => {
      const { message, status } = await publishPost(id);

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
        <Button variant="default">公開</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>投稿を公開</DialogTitle>
          <DialogDescription>公開してよいですか?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              キャンセル
            </Button>
          </DialogClose>
          <Button variant="default" onClick={handlePublish} disabled={pending}>
            公開
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
