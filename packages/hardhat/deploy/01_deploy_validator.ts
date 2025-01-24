import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
/**
 * Deploys a contract named "Validator" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployValidator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const conquest = await hre.ethers.getContract<Contract>("Conquest", deployer);
  const conquestAddress = await conquest.getAddress();

  const owner = "0x007e483cf6df009db5ec571270b454764d954d95";
  const functionsRouterAddress = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0"; // Functions Router address for sepolia
  const donId = "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000"; // DON ID for sepolia

  console.log("Deploying Validator...");
  await deploy("Validator", {
    from: deployer,
    args: [owner, conquestAddress, functionsRouterAddress, donId],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const Validator = await hre.ethers.getContract<Contract>("Validator", deployer);
  const validatorAddress = await Validator.getAddress();
  console.log("Validator deployed at", validatorAddress);

  // console.log("Adding Validator as minter on Basecamp...");
  // await basecamp.addMinter(validatorAddress);
};

export default deployValidator;

deployValidator.tags = ["Validator"];
