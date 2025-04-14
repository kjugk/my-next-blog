import { Post } from "@prisma/client";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface Props {
  post: Post;
}

function getDate(post: Post): string | null {
  const formatString = "yyyy-MM-dd HH:mm";

  if (post.published) {
    if (post.publishedAt === null) return null;

    return format(post.publishedAt, formatString);
  }

  return format(post.updatedAt, formatString);
}

export const PostListItem = ({ post }: Props) => {
  return (
    <li>
      <Link className="block group" href={`/posts/${post.id}`}>
        <h2 className="font-bold text-primary text-xl group-hover:underline underline-offset-3">
          {post.title}
        </h2>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <Calendar size={16} />
          <span>{getDate(post)}</span>
        </div>

        <div className="line-clamp-3 mt-3 text-sm md:text-base">
          {post.body}
        </div>
      </Link>
    </li>
  );
};
