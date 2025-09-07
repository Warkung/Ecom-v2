import { useState } from "react";
import { toast } from "react-toastify";
import { uploadFiles } from "../../api/uploadFile";
import useEcomStore from "../../store/ecomStore";
import Resize from "react-image-file-resizer";

interface UploadImageProps {
  form: {
    images: any[];
    [key: string]: any;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UploadImage({
  form,
  setForm,
  setIsLoading,
}: UploadImageProps) {
  const { token } = useEcomStore((state) => state);
  const [image, setImage] = useState("");

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      let allFiles = form.images;
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`);
          continue;
        }
        Resize.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          async (file) => {
            try {
              setIsLoading(true);
              const res = await uploadFiles(token, file);
              allFiles.push(res.data);
              setForm({
                ...form,
                images: allFiles,
              });
              setIsLoading(false);
            } catch (error: any) {
              setIsLoading(false);
              toast.error(error.message);
            }
          },
          "base64"
        );
      }
    }
  };

  return (
    <div>
      <input onChange={handleOnchange} type="file" name="images" multiple />
    </div>
  );
}
