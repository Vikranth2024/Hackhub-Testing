import { ethers } from 'ethers';
import dotenv from 'dotenv';
import YOUR_CONTRACT_ABI from '../abi/contractABI.json'; // Replace YOUR_CONTRACT_ABI

dotenv.config(); // Ensure environment variables are loaded

const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, YOUR_CONTRACT_ABI, provider); // Replace YOUR_CONTRACT_ABI

export async function storeFile(email, ipfsHash) {
  const signer = provider.getSigner();
  const contractWithSigner = contract.connect(signer);
  const tx = await contractWithSigner.storeFile(email, ipfsHash);
  await tx.wait();
  console.log("File stored successfully!");
}

// Function to retrieve a file
export async function retrieveFile(email) {
  try {
    const ipfsHash = await contract.retrieveFile(email);
    console.log("Retrieved IPFS Hash:", ipfsHash);
    return ipfsHash;
  } catch (error) {
    console.error("Error retrieving file:", error);
    return null;
  }
}

// Function to get total files
export async function getTotalFiles() {
  try {
    const totalFiles = await contract.getTotalFiles();
    console.log("Total files:", totalFiles.toString());
    return totalFiles.toString();
  } catch (error) {
    console.error("Error getting total files:", error);
    return "0";
  }
}
