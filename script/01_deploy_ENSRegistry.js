const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() { 
  // sepolia->ENSRegistry:0x14b885Fab57F4119F36A0C0E258D238518690dec / 0x9e1a67543C3cA29BEA41F623a1F005BeD67d1220
  // goerli->ENSRegistry:0xcdf0caD9452d83ca3BDb03fd4e26275F2E712E43
  const ENSRegistry = await ethers.getContractFactory("ENSRegistry")

  const ens = await ENSRegistry.deploy()
  await ens.deployed()
  console.log('Deployed to:', ens.address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });