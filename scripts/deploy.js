const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory for your NFT contract
  const DITCert = await ethers.getContractFactory("DITCert");

  // Deploy the contract
  const ditCert = await DITCert.deploy();

  // Wait for the deployment to finish
  await ditCert.deployed();

  // Log the address of the deployed contract
  console.log("DITCert deployed to:", ditCert.address);
}

// Run the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
