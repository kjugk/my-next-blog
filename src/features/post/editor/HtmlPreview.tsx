import { getMarkedInstance } from "@/services/markdown";

type Props = {
  body: string;
};

export const HtmlPreview = ({ body }: Props) => {
  const marked = getMarkedInstance();

  return (
    <div className="p-4 border rounded prose max-w-full bg-base-100">
      <div dangerouslySetInnerHTML={{ __html: marked.parse(body) }} />
    </div>
  );
};
