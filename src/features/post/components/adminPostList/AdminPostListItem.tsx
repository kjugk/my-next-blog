import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@prisma/client";
import Link from "next/link";
import { PostTimeStamp } from "../timestamp/TimeStamp";
import Heading from "@/components/typography/heading/Heading";

interface Props {
  post: Post;
}

export const AdminPostListItem = ({ post }: Props) => {
  return (
    <li>
      <Card>
        <Link className="block group" href={`/admin/posts/${post.id}/edit`}>
          <CardHeader>
            <CardTitle>
              <Heading
                as="h2"
                size="xl"
                className="text-primary group-hover:underline underline-offset-3"
              >
                {post.title}
              </Heading>
            </CardTitle>
            <CardDescription className="flex gap-2 items-center">
              <PostTimeStamp post={post} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="line-clamp-2">{post.body}</div>
          </CardContent>
        </Link>
      </Card>
    </li>
  );
};
