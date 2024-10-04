import { ethers } from "ethers";
import DITCertAbi from "../artifacts/contracts/DITCert.sol/DITCert.json";

const contractAddress = "";

export const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getContract = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, DITCertAbi.abi, signer);
};
