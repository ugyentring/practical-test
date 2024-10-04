import { ethers } from "ethers";
import DITCertAbi from "../../../artifacts/contracts/DITCert.sol/DITCert.json";

const contractAddress = "0xbd10B39Bf10529664d4F2C65d885e67E3daec306";

export const getProvider = () => {
  if (typeof window.ethereum !== "undefined") {
    return new ethers.providers.Web3Provider(window.ethereum);
  } else {
    throw new Error("MetaMask is not installed or not detected.");
  }
};

export const getContract = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, DITCertAbi.abi, signer);
};
