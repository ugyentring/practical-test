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
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-xl font-bold">Check Certificate Ownership</h1>
      <input
        type="text"
        placeholder="Certificate ID (Token ID)"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <button
        onClick={checkOwner}
        className="bg-black text-white p-2 rounded-md w-full"
      >
        Check Owner
      </button>

      {owner && (
        <p className="mt-2 text-green-600">
          Owner Address: <span className="font-bold">{owner}</span>
        </p>
      )}
    </div>
  );
};

export default CheckOwnership;
