// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DITCert is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Certificate {
        string courseTitle;
        string organization;
        string issueDate;
        string expiryDate;
        uint duration;  
        string certificateId; 
    }

    mapping(uint256 => Certificate) private certificates;

    constructor() ERC721("Druk Information and Technology NFT Certification", "DITCert") {}

    //mint Certificate
    function mintCertificate(
        address recipient,
        string memory courseTitle,
        string memory issueDate,
        string memory expiryDate,
        uint duration
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        string memory certificateId = generateCertificateId(courseTitle, newTokenId);

        certificates[newTokenId] = Certificate(
            courseTitle,
            "Druk Information and Technology",
            issueDate,
            expiryDate,
            duration,
            certificateId
        );

        _mint(recipient, newTokenId);

        return newTokenId;
    }

    //view certificate details
    function viewCertificate(uint256 tokenId) public view returns (Certificate memory) {
        require(_exists(tokenId), "Certificate does not exist");
        return certificates[tokenId];
    }

    //check ownership
    function checkOwnerOf(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    // generate certificate ID
    function generateCertificateId(string memory courseTitle, uint256 tokenId) internal pure returns (string memory) {
        string memory shortName = getCourseShortName(courseTitle);
        return string(abi.encodePacked("DIT_", shortName, "_", toString(tokenId)));
    }

    //create a short name for the course
    function getCourseShortName(string memory courseTitle) internal pure returns (string memory) {
        bytes memory strBytes = bytes(courseTitle);
        string memory shortName = "";
        for (uint i = 0; i < strBytes.length; i++) {
            if (i == 0 || strBytes[i - 1] == " ") {
                shortName = string(abi.encodePacked(shortName, strBytes[i]));
            }
        }
        return shortName;
    }

    //function to convert uint to string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
