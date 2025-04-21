const upload_preset = import.meta.env.VITE_UPLOAD_PRESET
const cloud_name = import.meta.env.VITE_CLOUD_NAME

const uploadImageToCloudinary = async (file) =>{

  const uploadData = new FormData()

  uploadData.append('file',file)
  uploadData.append('upload_preset',upload_preset)
  uploadData.append('cloud_name',cloud_name)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
    method:'post',
    body: uploadData
  })

  const data = await res.json()

  return data

}

export default uploadImageToCloudinary



// const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
// const cloud_name = import.meta.env.VITE_CLOUD_NAME;

// const uploadImageToCloudinary = async (file) => {
//   const uploadData = new FormData();

//   uploadData.append('file', file);
//   uploadData.append('upload_preset', upload_preset);
//   uploadData.append('cloud_name', cloud_name);

//   try {
//     const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//       method: 'POST',
//       body: uploadData,
//     });

//     if (!res.ok) {
//       throw new Error('Image upload failed');
//     }

//     const data = await res.json();

//     return data;
//   } catch (error) {
//     console.error('Error uploading image to Cloudinary:', error);
//     throw error; // Re-throw the error after logging it
//   }
// };

// export default uploadImageToCloudinary;
