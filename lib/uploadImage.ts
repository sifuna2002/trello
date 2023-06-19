import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File | null | undefined) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    '6489d7dd3c779bf7e6ca',
    ID.unique(),
    file
  );

  return fileUploaded;
};

export default uploadImage;