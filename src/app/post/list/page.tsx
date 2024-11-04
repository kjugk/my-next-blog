import { getPosts } from "@/features/post/serverFunctions/getPosts";

export default async function Page() {
  const posts = await getPosts();

  return <div>{posts.length}</div>;
}
