require("@nomiclabs/hardhat-waffle"); // Ensure this line is included if you're using Waffle for testing

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/_dCjeicBuw7abinN1pNM7UEUgv1x-Yho", // Alchemy URL
      accounts: [
        "f84f28305451e17ee99be53d485d897a4aacf7fa3871c7717e8057a951242970", // Your private key (ensure it's kept secure)
      ],
    },
  },
  solidity: {
    version: "0.8.27", // Specify the version of Solidity
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts", // Source path for contracts
    tests: "./test", // Test path
    cache: "./cache", // Cache path
    artifacts: "./artifacts", // Artifacts path
  },
  mocha: {
    timeout: 40000, // Mocha timeout settings
  },
};
