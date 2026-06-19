import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const uploadOnCloudinary = async (localfilepath) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    try {
        if (!localfilepath) return null

        const uploadResult = await cloudinary.uploader.upload(localfilepath, { resource_type: 'auto' });

        // console.log(uploadResult,"Result from cloudinary")

        // Optimize delivery by resizing and applying auto-format and auto-quality
        // const optimizeUrl = cloudinary.url('shoes', {
        //     fetch_format: 'auto',
        //     quality: 'auto'
        // });

        // console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        // const autoCropUrl = cloudinary.url('shoes', {
        //     crop: 'auto',
        //     gravity: 'auto',
        //     width: 500,
        //     height: 500,
        // });

        // console.log(autoCropUrl);
        
        fs.unlinkSync(localfilepath);//remove local saved temporary file as the upload operation failed


        return uploadResult;

    } catch (error) {
        // console.log(error);

        fs.unlinkSync(localfilepath);//remove local saved temporary file as the upload operation failed
        return null;
    }
}

export {uploadOnCloudinary};