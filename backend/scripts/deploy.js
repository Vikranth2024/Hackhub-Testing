// const { ethers } = require("hardhat");

// async function main() {
//   const FileStorage = await ethers.deployContract("FileStorage"); // ✅ Ethers v6 deployment method
//   await FileStorage.waitForDeployment();

//   console.log("FileStorage deployed to:", await FileStorage.getAddress());
// }

// main().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });


const hre = require("hardhat");

async function main() {
  const FileStorage = await hre.ethers.getContractFactory("FileStorage");
  const fileStorage = await FileStorage.deploy();
  await fileStorage.waitForDeployment();

  console.log("FileStorage deployed to:", await fileStorage.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
