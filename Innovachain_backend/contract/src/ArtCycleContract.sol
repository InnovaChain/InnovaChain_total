// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArtCycleContract {

    struct WatermarkAccount {
        string[] data;
    }

    mapping(address => WatermarkAccount) private watermarkAccounts;

    event WatermarkInserted(address indexed account, string watermark);
    
    function insert(string memory watermark) public {
        require(bytes(watermark).length > 0, "Watermark cannot be empty");
        WatermarkAccount storage account = watermarkAccounts[msg.sender];
        account.data.push(watermark);
        emit WatermarkInserted(msg.sender, watermark);
    }
    function getWatermarkByIndex(uint256 index) public view returns (string memory) {
        WatermarkAccount storage account = watermarkAccounts[msg.sender];
        require(index < account.data.length, "Index out of bounds");
        return account.data[index];
    }
}
