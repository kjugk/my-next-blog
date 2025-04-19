import { cn } from "@/lib/utils";
import { getPosts } from "../../serverFunctions/getPosts";
import { PostListItem } from "./PostListItem";
import { Post } from "@prisma/client";
import { getPostsByTagName } from "../../serverFunctions/getPostsByTagName";

type Props = {
  tagName?: string;
  className?: string;
};

export const PostList = async ({ tagName, className }: Props) => {
  let posts: Post[] = [];

  if (tagName) {
    posts = await getPostsByTagName({ tagName });
  } else {
    posts = await getPosts({ published: true });
  }

  const listClassName = cn("space-y-10", className);

  return (
    <ul className={listClassName}>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ul>
  );
};
