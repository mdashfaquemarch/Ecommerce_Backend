import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
// config

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// uploading file on cloudinary

const uploadOnCloudinary = async (imageLocalPath) => {

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imageLocalPath);
      console.log(result);
      fs.unlinkSync(imageLocalPath)
      return result;
    } catch (error) {
      fs.unlinkSync(imageLocalPath)
      console.error(error);
    }
};

export {uploadOnCloudinary}