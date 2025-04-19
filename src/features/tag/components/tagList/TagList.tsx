import Link from "next/link";
import { getTags } from "../../serverFunctions/getTags";

export const TagList = async () => {
  const tags = await getTags();

  return (
    <ul className="flex flex-wrap gap-2 mt-6">
      {tags.map((tag) => (
        <Link href={`tags/${tag.name}`} key={tag.id}>
          <span className="border border-primary inline-block px-2 hover:underline">
            #{tag.name}
          </span>
        </Link>
      ))}
    </ul>
  );
};
