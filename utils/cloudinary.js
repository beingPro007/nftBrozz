import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
});

const uploadToCloudinary = async (localFilePath = req.files?.upload-image[0]?.path) => {
    try {

        if (!localFilePath) {
            console.log("Image path is null", localFilePath);            
            return null;
        }

        const uploadedImage = await cloudinary.
            uploader.
            upload(localFilePath, { resource_type: "auto" });
        if (!uploadedImage) {
            return new Error("Image Upload failed", { cause: "API errors" });
        }

        console.log("Image uploaded successfully!!", uploadedImage.url);
        fs.unlinkSync(localFilePath);
        return uploadedImage;
    } catch (error) {
        console.log("Error occured while uploading the content", error.message);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadToCloudinary }