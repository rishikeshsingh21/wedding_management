import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import pLimit from "p-limit";

const limit = pLimit(3); 

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure:true
});

const uploadSingleImage = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `wedding_management/${folder}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

const uploadImagesToCloudinary = async (
  files,
  folder = "services"
) => {
  const uploadPromises = files.map(file =>
    limit(() => uploadSingleImage(file.buffer, folder))
  );

  return Promise.all(uploadPromises);
};

export { uploadImagesToCloudinary };
