import Resize from "react-image-file-resizer";
import { toast } from "react-toastify";
import { removeImage, uploadFiles } from "../../api/uploadFile";
import useEcomStore from "../../store/ecomStore";

function UploadFiles({ form, setForm, isLoading, setIsLoading }) {
  const { token } = useEcomStore((state) => state);

  const handleOnchange = (e) => {
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
            } catch (error) {
              setIsLoading(false);
              toast.error(error.message);
            }
          },
          "base64"
        );
      }
    }
  };

  const handleRemoveImage = async (public_id) => {
    try {
      setIsLoading(true);
      await removeImage(token, public_id);
      let fillterImages = form.images.filter(
        (image) => image.public_id !== public_id
      );
      setForm({
        ...form,
        images: fillterImages,
      });
      setIsLoading(false);
      toast.error("Removed successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        {form.images.map((image, index) => (
          <div
            key={index}
            className=" relative mb-2 rounded-xl shadow-sm  w-20 h-20 "
          >
            <img
              src={image.url}
              className="w-20 h-20 rounded-xl  "
              alt="image"
            />
            <div
              onClick={() => handleRemoveImage(image.public_id)}
              className="text-white hover:scale-105 hover:cursor-pointer  font-bold text-xs bg-black absolute top-1 right-1 h-5 w-5 text-center rounded flex items-center justify-center"
            >
              X
            </div>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="images">
          <div className="my-2">
            <span className="bg-green-400 text-green-900 px-4 py-3 rounded-2xl hover:bg-green-500 hover:cursor-pointer">
              Upload Images
            </span>
          </div>
        </label>
        <input
          type="file"
          id="images"
          className=""
          multiple
          onChange={handleOnchange}
          hidden
          accept="image/*"
        />
      </div>
    </div>
  );
}
export default UploadFiles;