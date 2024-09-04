import cloudinary from "@/lib/cloudinaryconfig/cloudinary";
import { Buffer } from "buffer"; // Ensure Buffer is available in the browser

export const uploadImage = async (file: File, folder: string) => {
  try {
    // Convert file to array buffer and then to buffer
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: folder,
          upload_preset: "next_cloudinary",
        },
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload error:", err);
            return reject(err);
          }
          console.log("Upload result:", result);
          resolve(result);
        }
      );

      // Write the bytes to the upload stream
      uploadStream.end(bytes);
    });
  } catch (error: any) {
    console.error("Error uploading image:", error.message);
    throw new Error("Image upload failed");
  }
};
