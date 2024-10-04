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
    <div className="flex flex-col items-center p-5 space-y-4">
      <h1 className="text-2xl font-bold">View Certificate</h1>
      <input
        type="text"
        placeholder="Certificate ID (Token ID)"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
      />
      <button
        onClick={viewCertificate}
        className="bg-black text-white p-2 rounded-md w-full max-w-xs hover:bg-gray-800"
      >
        View Certificate
      </button>

      {certificate && (
        <div className="border border-gray-300 p-4 rounded-md w-full max-w-md bg-gray-50">
          <h3 className="text-lg font-semibold">Certificate Details</h3>
          <p>
            <span className="font-bold">Course Title:</span>{" "}
            {certificate.courseTitle}
          </p>
          <p>
            <span className="font-bold">Organization:</span>{" "}
            {certificate.organization}
          </p>
          <p>
            <span className="font-bold">Issue Date:</span>{" "}
            {certificate.issueDate}
          </p>
          <p>
            <span className="font-bold">Expiry Date:</span>{" "}
            {certificate.expiryDate}
          </p>
          <p>
            <span className="font-bold">Duration:</span> {certificate.duration}{" "}
            hours
          </p>
          <p>
            <span className="font-bold">Certificate ID:</span>{" "}
            {certificate.certificateId}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewCertificate;
