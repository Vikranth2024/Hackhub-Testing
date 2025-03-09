// // import axios from 'axios';

// // const api = axios.create({
// //   baseURL: 'http://localhost:8080/api', 
// // });

// // export const registerUser = async (userData) => {
// //   try {
// //     const response = await api.post('/auth/register', userData);
// //     return response.data;
// //   } catch (error) {
// //     throw error.response.data;
// //   }
// // };

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to set the auth token for all requests
// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// };

// // Register User
// export const registerUser = async (userData) => {
//   try {
//     const response = await api.post("/auth/register", userData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Server error" };
//   }
// };

// // Login User
// export const loginUser = async (loginData) => {
//   try {
//     const response = await api.post("/auth/login", loginData);
//     const { token, userId } = response.data;

//     if (token) {
//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", userId);
//       setAuthToken(token);
//     }

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Server error" };
//   }
// };

// // Logout User
// export const logoutUser = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userId");
//   setAuthToken(null);
// };

// // Upload File
// export const uploadFile = async (fileData) => {
//   try {
//     const response = await api.post("/upload", fileData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "File upload failed" };
//   }
// };

// export default api;

import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api", // Use environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the auth token for all requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Register User
export const registerUser  = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error); // Log error for debugging
    throw error.response?.data || { message: "Server error" };
  }
};

// Login User
export const loginUser  = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);
    const { token, userId } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setAuthToken(token);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error); // Log error for debugging
    throw error.response?.data || { message: "Server error" };
  }
};

// Logout User
export const logoutUser  = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  setAuthToken(null);
};

// Upload File
export const uploadFile = async (fileData) => {
  try {
    const response = await api.post("/upload", fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("File upload error:", error); // Log error for debugging
    throw error.response?.data || { message: "File upload failed" };
  }
};

export default api;