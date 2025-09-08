export interface UploadImageProps {
  form: {
    images: any[];
    [key: string]: any;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}