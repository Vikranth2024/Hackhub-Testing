require('dotenv').config()
const { ethers } = require('ethers')

const Alchemy = process.env.ALCHEMY_API_KEY;
const network = 'homestead';
const provider = new ethers.providers.AlchemyProvider(network, Alchemy);

async function getLatestBlockNumber() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log(`Latest block number: ${blockNumber}`);
    } catch (error) {
        console.error('Error fetching block number:', error);
    }
}
getLatestBlockNumber();
