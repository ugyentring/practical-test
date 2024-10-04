import { useState } from "react";
import { getContract } from "../utils/ethers";

const ViewCertificate = () => {
  const [tokenId, setTokenId] = useState("");
  const [certificate, setCertificate] = useState(null);

  const viewCertificate = async () => {
    try {
      const certContract = getContract();
      const certDetails = await certContract.viewCertificate(tokenId);
      setCertificate(certDetails);
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };

  return (
    <div>
      <h1>View Certificate</h1>
      <input
        type="text"
        placeholder="Certificate ID (Token ID)"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={viewCertificate}>View</button>

      {certificate && (
        <div>
          <h3>Course Title: {certificate.courseTitle}</h3>
          <p>Organization: {certificate.organization}</p>
          <p>Issue Date: {certificate.issueDate}</p>
          <p>Expiry Date: {certificate.expiryDate}</p>
          <p>Duration: {certificate.duration} hours</p>
          <p>Certificate ID: {certificate.certificateId}</p>
        </div>
      )}
    </div>
  );
};

export default ViewCertificate;
