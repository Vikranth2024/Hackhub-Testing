// import React, { useState, useRef } from 'react';
// import Button from './Button';
// import FileCard from './FileCard';


// const mockFiles = [
//   {
//     id: '1',
//     name: 'project-proposal.pdf',
//     type: 'application/pdf',
//     size: '2.4 MB',
//     dateUploaded: 'May 15, 2023'
//   },
//   {
//     id: '2',
//     name: 'profile-picture.jpg',
//     type: 'image/jpeg',
//     size: '1.8 MB',
//     dateUploaded: 'May 14, 2023'
//   },
//   {
//     id: '3',
//     name: 'presentation-video.mp4',
//     type: 'video/mp4',
//     size: '24.6 MB',
//     dateUploaded: 'May 10, 2023'
//   },
//   {
//     id: '4',
//     name: 'contract-agreement.docx',
//     type: 'application/docx',
//     size: '567 KB',
//     dateUploaded: 'May 5, 2023'
//   }
// ];

// const Dashboard = () => {
//   const [files, setFiles] = useState(mockFiles);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const fileInputRef = useRef(null);
  
//   const handleUploadClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };
  
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       handleFileUpload(file);
//     }
//   };
  
//   const handleFileUpload = (file) => {
//     setIsUploading(true);
//     setUploadProgress(0);
    
//     const interval = setInterval(() => {
//       setUploadProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval);
          
//           const newFile = {
//             id: `${Date.now()}`,
//             name: file.name,
//             type: file.type || 'application/octet-stream',
//             size: formatFileSize(file.size),
//             dateUploaded: new Date().toLocaleDateString('en-US', {
//               month: 'short',
//               day: 'numeric',
//               year: 'numeric'
//             })
//           };
          
//           setTimeout(() => {
//             setFiles(prev => [newFile, ...prev]);
//             setIsUploading(false);
//             setUploadProgress(0);
//           }, 500);
          
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 200);
//   };
  
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
    
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
    
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="page-content">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">My Files</h1>
//           <p className="text-muted-foreground mt-1">
//             Securely stored on IPFS and verified with your DID-NFT
//           </p>
//         </div>
        
//         <div className="flex">
//           <input 
//             type="file" 
//             ref={fileInputRef} 
//             onChange={handleFileChange} 
//             className="hidden" 
//           />
//           <Button 
//             onClick={handleUploadClick}
//             disabled={isUploading}
//             leftIcon={
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M16 12L12 8M12 8L8 12M12 8V20M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             }
//           >
//             Upload File
//           </Button>
//         </div>
//       </div>
    
//       {isUploading && (
//         <div className="mb-8 animate-fade-in">
//           <div className="glass-morphism p-4 rounded-lg">
//             <div className="flex justify-between text-sm mb-1">
//               <span>Uploading to IPFS...</span>
//               <span>{uploadProgress}%</span>
//             </div>
//             <div className="bg-secondary rounded-full h-2 overflow-hidden">
//               <div 
//                 className="bg-primary h-full transition-all duration-300 ease-out"
//                 style={{ width: `${uploadProgress}%` }}
//               />
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">
//               Your file is being uploaded to IPFS and linked to your DID-NFT
//             </p>
//           </div>
//         </div>
//       )}
//       <div className="grid gap-4 md:grid-cols-2">
//         {files.map((file) => (
//           <FileCard key={file.id} file={file} />
//         ))}
//       </div>
      
//       {files.length === 0 && !isUploading && (
//         <div className="neo-morphism p-8 rounded-lg text-center">
//           <div className="text-5xl mb-4">📁</div>
//           <h3 className="text-xl font-medium mb-2">No files yet</h3>
//           <p className="text-muted-foreground mb-4">
//             Upload your first file to get started
//           </p>
//           <Button 
//             onClick={handleUploadClick}
//             variant="outline"
//           >
//             Upload a File
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useRef, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Button from './Button';
import FileCard from './FileCard';
import contractABI from '../contracts/SecureFileStorage.json';

const CONTRACT_ADDRESS = "YOUR_SMART_CONTRACT_ADDRESS_HERE";
const FILEBASE_API_KEY = "YOUR_FILEBASE_API_KEY";
const IPFS_GATEWAY = "https://ipfs.filebase.io/ipfs/"; // Filebase IPFS gateway

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserFiles();
  }, []);

  const fetchUserFiles = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
    try {
      const fileData = await contract.getUserFiles();
      const formattedFiles = fileData.map(file => ({
        id: file.fileId,
        name: file.fileName,
        ipfsHash: file.ipfsHash,
        size: file.size,
        dateUploaded: new Date(file.timestamp * 1000).toLocaleDateString()
      }));
      setFiles(formattedFiles);
    } catch (error) {
      console.error("Error fetching files: ", error);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    await handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://api.filebase.io/v1/ipfs/upload", formData, {
        headers: {
          "Authorization": `Bearer ${FILEBASE_API_KEY}`,
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      const ipfsHash = response.data.cid;
      const generatedKey = prompt("Enter a secret key to encrypt this file:");
      if (!generatedKey) {
        alert("Upload cancelled.");
        setIsUploading(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      const tx = await contract.uploadFile(file.name, ipfsHash, generatedKey);
      await tx.wait();
      alert("File uploaded successfully!");
      fetchUserFiles();
    } catch (error) {
      console.error("Upload error: ", error);
    }

    setIsUploading(false);
  };

  const handleFileAccess = async (file) => {
    const enteredKey = prompt("Enter your access key:");
    if (!enteredKey) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
    try {
      const response = await contract.accessFile(enteredKey);
      if (response !== "Access Denied") {
        window.open(IPFS_GATEWAY + response, "_blank");
      } else {
        alert("Incorrect key. Access denied!");
      }
    } catch (error) {
      console.error("Access error: ", error);
    }
  };

  return (
    <div className="page-content">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">My Files</h1>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <Button onClick={handleUploadClick} disabled={isUploading}>Upload File</Button>
      </div>
      
      {isUploading && (
        <div className="mb-8">
          <div className="p-4 rounded-lg bg-gray-200">
            <p>Uploading to IPFS... {uploadProgress}%</p>
          </div>
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2">
        {files.map((file) => (
          <FileCard key={file.id} file={file} onAccess={() => handleFileAccess(file)} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
