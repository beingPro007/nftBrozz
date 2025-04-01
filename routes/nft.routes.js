import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

router.post("/upload-image", upload.single("cloudinary-image"), async (req, res) => {
    if (!req.file) {
        throw new ApiError("Error in getting the file path!!", 400);
    }
    const uploadedImage = await uploadToCloudinary(req.file?.path);
    if (!uploadedImage) return res.status(500).json({ error: "Upload failed" });

    res.json({ imageUrl: uploadedImage.url });
});

export default router;