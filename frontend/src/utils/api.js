import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadFile = async (email, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("File upload error:", error);
    return null;
  }
};
