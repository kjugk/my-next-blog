"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { changePostPublication } from "../../serverFunctions/publishPost";

type Props = {
  id: number;
  title: string;
  published: boolean;
};

export const PublishConfirmDialog = ({ id, title, published }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handlePublish = () => {
    startTransition(async () => {
      const { message, status } = await changePostPublication(
        id,
        title,
        !published,
      );

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
        <Button variant={published ? "destructive" : "default"} type="button">
          {published ? "公開取消" : "公開"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {published ? "公開を取り消し" : "投稿を公開"}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              キャンセル
            </Button>
          </DialogClose>
          <Button
            variant={published ? "destructive" : "default"}
            onClick={handlePublish}
            disabled={pending}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
