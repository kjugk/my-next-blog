import { getMarkedInstance } from "@/services/markdown";

type Props = {
  body: string;
};

export const HtmlPreview = ({ body }: Props) => {
  const marked = getMarkedInstance();

  return (
    <div className="px-4 border rounded prose dark:prose-invert max-w-full bg-transparent">
      <div dangerouslySetInnerHTML={{ __html: marked.parse(body) }} />
    </div>
  );
};
