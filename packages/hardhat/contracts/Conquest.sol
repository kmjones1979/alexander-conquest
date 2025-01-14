//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Conquest is Ownable {
    
    constructor(address _owner) Ownable(_owner) {
    }

    /**
     * Function to withdraw all ETH from the contract
     */
    function withdraw() public onlyOwner {
        (bool success, ) = msg.sender.call{ value: address(this).balance }("");
        require(success, "Failed to send Ether");
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
