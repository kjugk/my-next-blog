import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      {/* TODO: 抽象的な List として切り出す */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-lg text-primary hover:underline decoration-2">
            <Link className="block" href={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </CardTitle>
          <CardDescription className="flex gap-2 items-center">
            <Calendar size={16} />
            <span>{getDate(post)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="line-clamp-2">{post.body}</div>
        </CardContent>
      </Card>
    </li>
  );
};
