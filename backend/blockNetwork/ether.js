require('dotenv').config();
const { ethers } = require('ethers');

// Load API Key from .env
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Validate API Key
if (!ALCHEMY_API_KEY) {
    console.error("❌ Alchemy API Key is missing! Check your .env file.");
    process.exit(1);
}

// Network Configuration
const network = 'homestead'; // Ethereum Mainnet
const provider = new ethers.providers.AlchemyProvider(network, ALCHEMY_API_KEY);

// ✅ Function to Get Latest Block Number (Web3 Equivalent)
async function getLatestBlockNumber() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log(`✅ Latest Block Number: ${blockNumber}`);
    } catch (error) {
        console.error('❌ Error fetching block number:', error.message);
    }
}

// ✅ Function to Get ETH Balance (Web3 Equivalent)
async function getEthBalance(address) {
    try {
        const balance = await provider.getBalance(address);
        console.log(`💰 Balance of ${address}: ${ethers.utils.formatEther(balance)} ETH`);
    } catch (error) {
        console.error('❌ Error fetching balance:', error.message);
    }
}

// ✅ Function to Send ETH (Web3 Equivalent)
async function sendEth(privateKey, to, amountInEth) {
    try {
        const wallet = new ethers.Wallet(privateKey, provider);
        const tx = await wallet.sendTransaction({
            to,
            value: ethers.utils.parseEther(amountInEth),
        });
        console.log(`📤 Transaction Sent! Hash: ${tx.hash}`);
        await tx.wait(); // Wait for confirmation
        console.log(`✅ Transaction Mined!`);
    } catch (error) {
        console.error('❌ Error sending ETH:', error.message);
    }
}

// ✅ Function to Get Transaction Details (Web3 Equivalent)
async function getTransaction(txHash) {
    try {
        const tx = await provider.getTransaction(txHash);
        console.log(`🔍 Transaction Details:`, tx);
    } catch (error) {
        console.error('❌ Error fetching transaction:', error.message);
    }
}

// ✅ Function to Get Gas Price (Web3 Equivalent)
async function getGasPrice() {
    try {
        const gasPrice = await provider.getGasPrice();
        console.log(`⛽ Current Gas Price: ${ethers.utils.formatUnits(gasPrice, "gwei")} GWEI`);
    } catch (error) {
        console.error('❌ Error fetching gas price:', error.message);
    }
}

// 🏃‍♂️ Run Example Functions
getLatestBlockNumber();
getEthBalance("0x742d35Cc6634C0532925a3b844Bc454e4438f44e"); // Example: Bitfinex Wallet
getGasPrice();

// 🔴 Uncomment and fill details to test sending ETH
// sendEth("YOUR_PRIVATE_KEY", "RECEIVER_ADDRESS", "0.01");

// 🔴 Uncomment to check a transaction
// getTransaction("YOUR_TX_HASH");
