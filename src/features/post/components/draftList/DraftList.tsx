import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Link from "next/link";

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
          <div className="font-bold text-lg text-primary">
            <Link href={`/post/edit/${draft.id}`}>{draft.title}</Link>
          </div>
          <div>{draft.updatedAt.toDateString()}</div>
          <div className="line-clamp-2">{draft.body}</div>
        </li>
      ))}
    </ul>
  );
};
