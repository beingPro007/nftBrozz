import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const router = Router();

router.post("/upload-image", upload.single("cloudinary-image"), async (req, res) => {
    const uploadedImage = await uploadToCloudinary(req.file.path);
    if (!uploadedImage) return res.status(500).json({ error: "Upload failed" });
    
    res.json({ imageUrl: uploadedImage.url });
});

export default router;