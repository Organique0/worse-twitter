import { v2 as _cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

const cloudinary = () => {
  const config = useRuntimeConfig();

  _cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  });

  return _cloudinary;
}

export const uploadToCloudinary = (image: any) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary().uploader.upload(image, (error: UploadApiErrorResponse, data: UploadApiResponse) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    })
  })
}