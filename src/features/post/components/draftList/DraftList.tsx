import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

type Props = {
  drafts: Post[];
  className?: string;
};

export const DraftList = ({ drafts, className }: Props) => {
  const listClassName = cn("space-y-4", className);

  return (
    <ul className={listClassName}>
      {drafts.map((draft) => (
        <li key={draft.id}>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-lg text-primary hover:underline decoration-2">
                <Link className="block" href={`/post/edit/${draft.id}`}>
                  {draft.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex gap-2 items-center">
                <Calendar size={16} />
                <span>{format(draft.updatedAt, "yyyy-MM-dd HH:mm")}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="line-clamp-2">{draft.body}</div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};
