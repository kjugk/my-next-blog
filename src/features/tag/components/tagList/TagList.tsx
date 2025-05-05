import Link from "next/link";
import { getTags } from "../../serverFunctions/getTags";

export const TagList = async () => {
  const tags = await getTags();

  return (
    <ul className="flex flex-wrap gap-2 mt-6">
      {tags.map((tag) => (
        <Link
          href={`tags/${encodeURIComponent(tag.name)}`}
          key={tag.id}
          className="border border-primary text-primary inline-block px-2 hover:underline underline-offset-2"
        >
          #{tag.name}
        </Link>
      ))}
    </ul>
  );
};
