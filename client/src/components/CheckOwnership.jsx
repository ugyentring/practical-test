import { useState } from "react";
import { getContract } from "../utils/ethers";

const CheckOwnership = () => {
  const [tokenId, setTokenId] = useState("");
  const [owner, setOwner] = useState(null);

  const checkOwner = async () => {
    try {
      const certContract = getContract();
      const ownerAddress = await certContract.checkOwnerOf(tokenId);
      setOwner(ownerAddress);
    } catch (error) {
      console.error("Error checking ownership:", error);
    }
  };

  return (
    <div>
      <h1>Check Certificate Ownership</h1>
      <input
        type="text"
        placeholder="Certificate ID (Token ID)"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={checkOwner}>Check Owner</button>

      {owner && <p>Owner Address: {owner}</p>}
    </div>
  );
};

export default CheckOwnership;
