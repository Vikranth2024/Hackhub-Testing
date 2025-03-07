const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = require("../abi/contractABI.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const storeOnBlockchain = async (email, ipfsHash, timestamp) => {
  const tx = await contract.storeFile(email, ipfsHash, timestamp);
  await tx.wait();
  return tx.hash;
};

module.exports = { storeOnBlockchain };
