import { useState } from "react";
import { getContract } from "../utils/ethers";

const MintCertificate = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [duration, setDuration] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  const mintCertificate = async () => {
    setIsMinting(true);
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      if (!courseTitle || !issueDate || !expiryDate || !duration) {
        alert("Please fill in all fields.");
        return;
      }

      if (new Date(issueDate) >= new Date(expiryDate)) {
        alert("Expiry date must be after issue date.");
        return;
      }

      const certContract = await getContract(); // Await the contract instance
      const gas = await certContract.estimateGas.mintCertificate(
        window.ethereum.selectedAddress,
        courseTitle,
        issueDate,
        expiryDate,
        duration
      );

      const tx = await certContract.mintCertificate(
        window.ethereum.selectedAddress,
        courseTitle,
        issueDate,
        expiryDate,
        duration,
        { gas }
      );

      await tx.wait();
      alert("Certificate minted successfully!");
    } catch (error) {
      console.error("Error minting certificate:", error);
      alert(
        error?.reason ||
          "An error occurred while minting the certificate. Please try again."
      );
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl font-bold">Mint Certificate</h1>
      <input
        type="text"
        placeholder="Course Title"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <input
        type="date"
        placeholder="Issue Date"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <input
        type="date"
        placeholder="Expiry Date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <input
        type="number"
        placeholder="Duration (hrs)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <button
        className="bg-black text-white p-2 rounded-md w-full"
        onClick={mintCertificate}
        disabled={isMinting}
      >
        {isMinting ? "Minting..." : "Mint Certificate"}
      </button>
    </div>
  );
};

export default MintCertificate;
