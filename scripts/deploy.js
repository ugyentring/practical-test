async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const DITCert = await ethers.getContractFactory("DITCert");
  const certContract = await DITCert.deploy();
  console.log("DITCert deployed to:", certContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



