import {v2 as cloudinary} from 'cloudinary';

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
      return result;
    } catch (error) {
      console.error(error);
    }
};

export {uploadOnCloudinary}