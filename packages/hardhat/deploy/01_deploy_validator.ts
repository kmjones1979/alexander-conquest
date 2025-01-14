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

  console.log("Deploying Validator...");
  await deploy("Validator", {
    from: deployer,
    args: [owner, conquestAddress],
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
