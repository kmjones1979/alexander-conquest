//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ConquestNFT is Ownable, ERC721 {
    
    constructor() Ownable(msg.sender) ERC721("Crypto Conquest", "CONQUEST") {}

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
