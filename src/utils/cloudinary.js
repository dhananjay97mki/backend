import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: pocess.env.CLOUDINARY_CLOUD_NAME ,
  api_key: pocess.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localfilePath) => {
  try { 
    if (!localfilePath) return null;

    // Upload the file to Cloudinary
    const respone = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto"
    });

    // File uploaded successfully
    console.log("file uploaded successfully:", response.url);
    return response;

  } catch (error) {
    fs.unlinkSync(localfilePath); // Delete the file
    return null;
  }
};
