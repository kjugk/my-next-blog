import { Post } from "@prisma/client";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

function getDate(post: Post): string | null {
  const formatString = "yyyy-MM-dd HH:mm";

  if (post.published) {
    if (post.publishedAt === null) return null;

    return format(post.publishedAt, formatString);
  }

  return format(post.updatedAt, formatString);
}

export const PostTimeStamp = ({ post }: { post: Post }) => {
  const date = getDate(post);

  if (!date) return null;

  return (
    <div className="h-8 inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
      <Calendar size={16} />
      <span className="relative top-0.5">{date}</span>
    </div>
  );
};
