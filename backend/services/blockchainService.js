// const { ethers } = require("ethers");

// const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);

// console.log("Environment Variables:", process.env);

// const privateKey = process.env.PRIVATE_KEY?.trim();
// console.log("Private Key:", privateKey);
// console.log("Private Key Length:", privateKey?.length);
// const wallet = new ethers.Wallet(privateKey, provider);
// const contractABI = require("../abi/contractABI.json");
// const contractAddress = process.env.CONTRACT_ADDRESS;
// const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// console.log(process.env.PRIVATE_KEY);

// const storeOnBlockchain = async (email, ipfsHash, timestamp) => {
//   const tx = await contract.storeFile(email, ipfsHash, timestamp);
//   await tx.wait();
//   return tx.hash;
// };

// module.exports = { storeOnBlockchain };

const { ethers, keccak256, toUtf8Bytes } = require("ethers");
require("dotenv").config(); // Ensure environment variables are loaded

// Connect to Polygon RPC
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);

// Validate private key
const privateKey = process.env.PRIVATE_KEY?.trim();
if (!privateKey || privateKey.length !== 64) {
  throw new Error("Invalid private key");
}

// Create a wallet instance
const wallet = new ethers.Wallet(privateKey, provider);

// Load contract ABI & address
const fileStorageABI = require('../FileStorageABI.json');
const contractABI = fileStorageABI.abi;  // ✅ Extract the ABI
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Store file details on blockchain
 * @param {string} email - User's email
 * @param {string} ipfsHash - IPFS hash of the file
 * @returns {string} Transaction hash
 */
const storeOnBlockchain = async (email, ipfsHash) => {
  const emailHash = keccak256(toUtf8Bytes(email)); // 🔥 Hash email before sending
  const tx = await contract.storeFile(emailHash, ipfsHash);
  await tx.wait(); // Wait for confirmation
  return tx.hash;
};

module.exports = { storeOnBlockchain };