//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./Alexander.sol";

contract Conquest is Ownable, ReentrancyGuard {
    IERC20 public alexanderToken; // The ERC20 token contract
    uint256 private constant TWO_WEEKS = 14 days;

    struct Stake {
        uint256 amount;
        uint256 stakedAt;
    }

    mapping(address => Stake) private stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event WithdrawnETH(address indexed user, uint256 amount);

    constructor(address _owner, address _alexanderToken) Ownable(_owner) {
        require(_owner != address(0), "Zero owner address");
        require(_alexanderToken != address(0), "Zero token address");
        alexanderToken = IERC20(_alexanderToken);
    }

    /**
     * Function to stake $ALEXANDER tokens
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(alexanderToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        stakes[msg.sender].amount += amount;
        stakes[msg.sender].stakedAt = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    /**
     * Function to unstake $ALEXANDER tokens
     * @param amount Amount of tokens to unstake
     */
    function unstake(uint256 amount) external nonReentrant {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No tokens staked");
        require(amount <= userStake.amount, "Amount exceeds staked amount");

        // Reset the staked amount to zero
        userStake.amount -= amount;

        emit Unstaked(msg.sender, amount);
    }

    /**
     * Function to withdraw staked tokens after the cooldown period
     */
    function withdraw() external nonReentrant {
        Stake storage userStake = stakes[msg.sender];
        uint256 amount = userStake.amount;
        require(amount == 0, "Unstake first"); 
        require(block.timestamp >= userStake.stakedAt + TWO_WEEKS, "Cooldown period not over");
        
        require(alexanderToken.transfer(msg.sender, amount), "Transfer failed");
        
        emit Withdrawn(msg.sender, amount);
    }

    /**
     * Function to withdraw ETH from the contract
     */
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        (bool success,) = msg.sender.call{value: balance}("");
        require(success, "ETH transfer failed");
        emit WithdrawnETH(msg.sender, balance);
    }

    /**
     * Function to get the staked amount of a user
     * @param user Address of the user
     * @return Amount of tokens staked by the user
     */
    function getStakedAmount(address user) external view returns (uint256) {
        return stakes[user].amount;
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
