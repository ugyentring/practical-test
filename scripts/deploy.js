const { ethers } = require("hardhat");

async function main() {
  const DITCert = await ethers.getContractFactory("DITCert");

  const ditCert = await DITCert.deploy();
  await ditCert.deployed();

  console.log("DITCert deployed to:", ditCert.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
