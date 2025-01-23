import { cn } from "@/lib/utils";
import { getPosts } from "../../serverFunctions/getPosts";
import { PostListItem } from "./PostListItem";

type Props = {
  className?: string;
};

export const PostList = async ({ className }: Props) => {
  const posts = await getPosts({ published: true });
  const listClassName = cn("space-y-4", className);

  return (
    <ul className={listClassName}>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ul>
  );
};
