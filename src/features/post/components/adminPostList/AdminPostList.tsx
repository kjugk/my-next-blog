import { cn } from "@/lib/utils";
import { getPosts } from "../../serverFunctions/getPosts";
import { AdminPostListItem } from "./AdminPostListItem";

type Props = {
  className?: string;
  published?: boolean;
};

export const AdminPostList = async ({ className, published }: Props) => {
  const posts = await getPosts({ published });
  const listClassName = cn("space-y-4", className);

  return (
    <ul className={listClassName}>
      {posts.map((post) => (
        <AdminPostListItem key={post.id} post={post} />
      ))}
    </ul>
  );
};
