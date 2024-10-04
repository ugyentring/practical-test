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
      // Check if Ethereum is available
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        setIsMinting(false);
        return;
      }

      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Validate inputs
      if (!courseTitle || !issueDate || !expiryDate || !duration) {
        alert("Please fill in all fields.");
        setIsMinting(false);
        return;
      }

      if (new Date(issueDate) >= new Date(expiryDate)) {
        alert("Expiry date must be after issue date.");
        setIsMinting(false);
        return;
      }

      const certContract = getContract();
      const tx = await certContract.mintCertificate(
        window.ethereum.selectedAddress,
        courseTitle,
        issueDate,
        expiryDate,
        duration
      );
      await tx.wait();
      alert("Certificate minted successfully!");
    } catch (error) {
      console.error("Error minting certificate:", error);
      alert(
        "An error occurred while minting the certificate. Please try again."
      );
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div>
      <h1>Mint Certificate</h1>
      <input
        type="text"
        placeholder="Course Title"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
      />
      <input
        type="date"
        placeholder="Issue Date"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="Expiry Date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (hrs)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={mintCertificate} disabled={isMinting}>
        {isMinting ? "Minting..." : "Mint Certificate"}
      </button>
    </div>
  );
};

export default MintCertificate;
