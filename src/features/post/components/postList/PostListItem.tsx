import { Post } from "@prisma/client";
import Link from "next/link";
import { PostTimeStamp } from "../timestamp/TimeStamp";

interface Props {
  post: Post;
}

export const PostListItem = ({ post }: Props) => {
  return (
    <li>
      <Link className="block group" href={`/posts/${post.id}`}>
        <h2 className="font-bold text-primary text-xl group-hover:underline underline-offset-3">
          {post.title}
        </h2>

        <div className="mt-1">
          <PostTimeStamp post={post} />
        </div>

        <div className="line-clamp-3 mt-3 text-sm md:text-base">
          {post.body}
        </div>
      </Link>
    </li>
  );
};
