import { Post } from "@prisma/client";
import Link from "next/link";
import { PostTimeStamp } from "../timestamp/TimeStamp";
import Heading from "@/components/typography/heading/Heading";

interface Props {
  post: Post;
}

export const PostListItem = ({ post }: Props) => {
  return (
    <li>
      <Link className="block group" href={`/posts/${post.id}`}>
        <Heading className="text-primary group-hover:underline underline-offset-3">
          {post.title}
        </Heading>

        <div className="mt-1">
          <PostTimeStamp post={post} />
        </div>

        <div className="line-clamp-3 mt-3 text-sm">{post.body}</div>
      </Link>
    </li>
  );
};
