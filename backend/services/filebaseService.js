const axios = require("axios");

const uploadToIPFS = async (file) => {
  const apiKey = process.env.FILEBASE_ACCESS_KEY;
  const secretKey = process.env.FILEBASE_SECRET_KEY;
  const bucketName = process.env.FILEBASE_BUCKET_NAME;

  const url = `https://s3.filebase.com/${bucketName}/${file.originalname}`;

  const response = await axios.put(url, file.buffer, {
    headers: {
      "Content-Type": file.mimetype,
      "x-amz-access-key": apiKey,
      "x-amz-secret-key": secretKey,
    },
  });

  if (response.status === 200) {
    return `ipfs://${response.data.Hash}`;
  } else {
    throw new Error("File upload failed");
  }
};

module.exports = { uploadToIPFS };
