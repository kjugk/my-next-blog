import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { getPosts } from "../../serverFunctions/getPosts";
import { DeletePostButton } from "../deletePostButton";

type Props = {
  className?: string;
};

export const DraftList = async ({ className }: Props) => {
  const drafts = await getPosts({ published: false });
  const listClassName = cn("space-y-4", className);

  return (
    <ul className={listClassName}>
      {drafts.map((draft) => (
        <li key={draft.id}>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-lg text-primary hover:underline decoration-2">
                <Link className="block" href={`/admin/post/edit/${draft.id}`}>
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
            <CardFooter className="flex justify-end">
              <DeletePostButton id={draft.id} />
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};
