// const axios = require("axios");

// const uploadToIPFS = async (file) => {
//   const apiKey = process.env.FILEBASE_ACCESS_KEY;
//   const secretKey = process.env.FILEBASE_SECRET_KEY;
//   const bucketName = process.env.FILEBASE_BUCKET_NAME;

//   const url = `https://s3.filebase.com/${bucketName}/${file.originalname}`;

//   const response = await axios.put(url, file.buffer, {
//     headers: {
//       "Content-Type": file.mimetype,
//       "x-amz-access-key": apiKey,
//       "x-amz-secret-key": secretKey,
//     },
//   });

//   if (response.status === 200) {
//     return `ipfs://${response.data.Hash}`;
//   } else {
//     throw new Error("File upload failed");
//   }
// };

// module.exports = { uploadToIPFS };

const axios = require("axios");
const FormData = require("form-data");

/**
 * Upload file to Filebase IPFS
 * @param {object} file - File object from multer
 * @returns {string} IPFS URI
 */

const uploadToIPFS = async (file) => {
  const apiKey = process.env.FILEBASE_ACCESS_KEY;
  const secretKey = process.env.FILEBASE_SECRET_KEY;

  const formData = new FormData();
  formData.append("file", file.buffer, file.originalname);

  const response = await axios.post("https://api.filebase.io/v1/ipfs/add", formData, {
    headers: {
      ...formData.getHeaders(),
      "x-amz-access-key": apiKey,
      "x-amz-secret-key": secretKey,
    },
  });

  if (response.status === 200 && response.data.cid) {
    return `ipfs://${response.data.cid}`; // 🔥 Use `cid` for correct IPFS link
  } else {
    throw new Error("File upload failed");
  }
};

module.exports = { uploadToIPFS };
