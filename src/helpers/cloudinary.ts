import {
  v2 as cloudinary,
  ConfigAndUrlOptions,
  UploadApiResponse,
} from "cloudinary";

// const multer = require("multer");
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

export async function imageUploadUtil(file: any) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

export const upload = multer({ storage });

// export default { imageUploadUtil };

// : Promise<UploadApiResponse>
