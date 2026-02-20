import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for User Avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "event_management_assets/user_profile",
      allowed_formats: ["jpeg", "png", "jpg", "webp"],
    };
  },
});

// Configure Multer Storage for Organizer Logos
const logoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "event_management_assets/organizer-profile",
      allowed_formats: ["jpeg", "png", "jpg", "webp"],
    };
  },
});

export const uploadAvatarCloudinary = multer({ storage: avatarStorage });
export const uploadLogoCloudinary = multer({ storage: logoStorage });

// Helper to delete an image by its URL
export const deleteCloudinaryImage = async (imageUrl: string) => {
  try {
    if (!imageUrl || !imageUrl.includes("cloudinary.com")) return;

    const parts = imageUrl.split("/");
    const filename = parts.pop()?.split(".")[0];
    const folderIndex = parts.findIndex((p) => p === "event_management_assets");
    
    if (filename && folderIndex !== -1) {
      const folderString = parts.slice(folderIndex).join("/");
      const publicId = `${folderString}/${filename}`;
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted old Cloudinary image: ${publicId}`);
    }
  } catch (error) {
    console.error("Failed to delete old image from Cloudinary:", error);
  }
};

export { cloudinary };
