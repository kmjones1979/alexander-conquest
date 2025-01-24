//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * MOCK Alexander contract for testing purposes. Remove in production.
 */

contract Alexander is Ownable, ERC20 {
    constructor(address _owner) Ownable(_owner) ERC20("Alexander", "ALEXANDER") {
        _mint(_owner, 1000000000000000000000000);
    }
}
