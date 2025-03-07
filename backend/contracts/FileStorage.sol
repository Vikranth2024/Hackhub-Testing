// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FileStorage {
    struct File {
        bytes32 emailHash; // Store email hash instead of raw email
        string ipfsHash;
        uint256 timestamp;
    }

    mapping(address => File[]) private userFiles;

    event FileStored(address indexed user, bytes32 emailHash, string ipfsHash, uint256 timestamp);

    function storeFile(string memory email, string memory ipfsHash) public {
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        bytes32 emailHash = keccak256(abi.encodePacked(email)); // Hash email for security
        userFiles[msg.sender].push(File(emailHash, ipfsHash, block.timestamp));

        emit FileStored(msg.sender, emailHash, ipfsHash, block.timestamp);
    }

    function getUserFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }
}
