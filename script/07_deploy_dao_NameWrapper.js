const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() {
  // StaticMetadataService:0x0cAc90559e7c66b1b312939112886F3D4827d6F7
  // NameWrapper:0x1ffb30b7e2D85E34c5d74b3eCC5B3AA31481c189
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ensAddr = '0x14b885Fab57F4119F36A0C0E258D238518690dec'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  const baseRegistrarAddr = '0x63021B8d41Fa55Ba3679820c9493A8F0c634027f'
  const baseRegistrar = await ethers.getContractAt('BaseRegistrarImplementation', baseRegistrarAddr)
  
  // deploy StaticMetadataService
  var staticMetadataService
  if (false) {
    const StaticMetadataService = await ethers.getContractFactory("StaticMetadataService")
    staticMetadataService = await StaticMetadataService.deploy("https://dao.domains");
    await staticMetadataService.deployed()
    console.log('Deployed StaticMetadataService to:', staticMetadataService.address);
  } else {
    const staticMetadataServiceAddr = '0x0cAc90559e7c66b1b312939112886F3D4827d6F7'
    staticMetadataService = await ethers.getContractAt('StaticMetadataService', staticMetadataServiceAddr)
    console.log('StaticMetadataService address:', staticMetadataService.address);
  }
  
  // deploy NameWrapper
  const NameWrapper = await ethers.getContractFactory("NameWrapper")
  const nameWrapper = await NameWrapper.deploy(registry.address, baseRegistrar.address, staticMetadataService.address);
  await nameWrapper.deployed()
  console.log('Deployed NameWrapper to:', nameWrapper.address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });