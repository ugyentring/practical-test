import { ethers } from "ethers";
import DITCertAbi from "../../../artifacts/contracts/DITCert.sol/DITCert.json";

const contractAddress = "0xbd10B39Bf10529664d4F2C65d885e67E3daec306";

export const getProvider = async () => {
  if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
    return Promise.resolve(new ethers.providers.Web3Provider(window.ethereum));
  } else {
    throw new Error("MetaMask is not installed or not detected.");
  }
};

export const getContract = async () => {
  try {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      DITCertAbi.abi,
      signer
    );
    return contract;
  } catch (error) {
    console.error("Error getting contract:", error);
    throw new Error("Failed to get contract.");
  }
};
