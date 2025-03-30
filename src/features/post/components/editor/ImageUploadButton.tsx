import { Button } from "@/components/ui/button";
import { uploadFileToS3 } from "../../serverFunctions/uploadImage";
import { Image } from "lucide-react";

type Props = {
  onUploadCompleted: (result: { url: string; fileName: string }) => void;
};

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

export const ImageUploadButton = ({ onUploadCompleted }: Props) => {
  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            if (file.size > MAX_FILE_SIZE) {
              window.alert(
                "ファイルサイズが3MBを超えています。別のファイルを選択してください。",
              );
              return;
            }
            uploadFileToS3(file).then((url) => {
              onUploadCompleted({
                url,
                fileName: file.name,
              });
            });
          }
        };
        input.click();
      }}
    >
      <Image />
    </Button>
  );
};
