import { ethers } from "ethers";

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "email", "type": "string" },
      { "internalType": "string", "name": "ipfsHash", "type": "string" }
    ],
    "name": "storeFile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserFiles",
    "outputs": [
      {
        "internalType": "struct FileStorage.File[]",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const provider = new ethers.providers.AlchemyProvider("homestead", ALCHEMY_API_KEY);
const signer = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

export const storeFileOnBlockchain = async (email, ipfsHash) => {
  try {
    const tx = await contract.storeFile(email, ipfsHash);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error storing file on blockchain:", error);
  }
};

export const getUserFiles = async () => {
  try {
    const files = await contract.getUserFiles();
    return files;
  } catch (error) {
    console.error("Error fetching user files:", error);
  }
};
