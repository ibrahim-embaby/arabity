const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryImageUpload = async (file) => {
  try {
    const data = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    throw new Error("internal server error (cloudinary)");
  }
};

const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const data = await cloudinary.uploader.destroy(imagePublicId);
    return data;
  } catch (error) {
    throw new Error("internal server error (cloudinary)");
  }
};

const cloudinaryRemoveMultipleImage = async (publicIds) => {
  try {
    const result = cloudinary.v2.delete_resources(publicIds);
    return result;
  } catch (error) {
    throw new Error("internal server error (cloudinary)");
  }
};

module.exports = {
  cloudinaryImageUpload,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage,
};
