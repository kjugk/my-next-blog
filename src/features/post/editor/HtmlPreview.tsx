type Props = {
  body: string;
};

export const HtmlPreview = ({ body }: Props) => {
  return <div className="p-4 border rounded">{body}</div>;
};
