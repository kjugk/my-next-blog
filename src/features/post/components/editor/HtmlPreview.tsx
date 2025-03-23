import { getMarkedInstance } from "@/services/markdown";

type Props = {
  body: string;
};

export const HtmlPreview = ({ body }: Props) => {
  const marked = getMarkedInstance();

  return (
    <div className="mt-5 p-4 border rounded prose dark:prose-invert max-w-full bg-base-100 overflow-y-auto">
      <div dangerouslySetInnerHTML={{ __html: marked.parse(body) }} />
    </div>
  );
};
