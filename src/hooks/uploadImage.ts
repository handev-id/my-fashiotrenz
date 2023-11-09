import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";

export const useUploadImage = (folderName: string) => {
  const [file, setFile] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [progressImg, setProgressImg] = useState<number>(0);
  const handleFile = (e: any) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const uploadImage = () => {
    const storageRef = ref(storage, `${folderName}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressImg(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    file && uploadImage();
  }, [file]);

  return {
    file,
    imageUrl,
    setImageUrl,
    progressImg,
    handleFile,
    setProgressImg,
  };
};
