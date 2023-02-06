const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() { 
  // DummyOracle:0x4ff2885AA7dE1aD34073aa28C5f773f225c0b0Eb
  // StablePriceOracle:0xD358B98AEA50BBA96A6b233c570aF31C3cEf2c6C
  // ReverseRegistrar:0x209222F7518203D50831519c0a06520691FeAE1F
  // ETHRegistrarController:0xaC6Ae1E6AB5fd01ac26bC03da8f8C9eB2876f02f
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ensAddr = '0x14b885Fab57F4119F36A0C0E258D238518690dec'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  const baseRegistrarAddr = '0x954658e2864A7A5bDB02E590ce784DC7AAbF9941'
  const baseRegistrar = await ethers.getContractAt('BaseRegistrarImplementation', baseRegistrarAddr)
  const nameWrapperAddr = '0x94c576120f7383dBEc463f8fE646DfA0B434353C'
  const nameWrapper = await ethers.getContractAt('NameWrapper', nameWrapperAddr)

  const DummyOracle = await ethers.getContractFactory("DummyOracle")
  const StablePriceOracle = await ethers.getContractFactory("StablePriceOracle")
  const ReverseRegistrar = await ethers.getContractFactory("ReverseRegistrar")
  
  const dummyOracle = await DummyOracle.deploy(100000000);
  await dummyOracle.deployed()
  console.log('Deployed dummyOracle to:', dummyOracle.address);
  const stablePriceOracle = await StablePriceOracle.deploy(dummyOracle.address, [0, 0, 4, 2, 1]);
  await stablePriceOracle.deployed()
  console.log('Deployed StablePriceOracle to:', stablePriceOracle.address);
  const reverseRegistrar = await ReverseRegistrar.deploy(registry.address);
  await reverseRegistrar.deployed()
  console.log('Deployed ReverseRegistrar to:', reverseRegistrar.address);
  // const reverseRegistrarAddr = '0x209222F7518203D50831519c0a06520691FeAE1F'
  // const reverseRegistrar = await ethers.getContractAt('ReverseRegistrar', reverseRegistrarAddr)
  // const stablePriceOracleAddr = '0xD358B98AEA50BBA96A6b233c570aF31C3cEf2c6C'
  // const stablePriceOracle = await ethers.getContractAt('StablePriceOracle', stablePriceOracleAddr)
  await setupReverseRegistrar(registry, reverseRegistrar, accounts);
  
  const ETHRegistrarController = await ethers.getContractFactory("ETHRegistrarController")
  const ethRegistrarController = await ETHRegistrarController.deploy(baseRegistrar.address, stablePriceOracle.address, 600, 86400, reverseRegistrar.address, nameWrapper.address);
  await ethRegistrarController.deployed()
  console.log('Deployed ETHRegistrarController to:', ethRegistrarController.address);

  const nameWrapperResult = await nameWrapper.setController(ethRegistrarController.address, true);
  console.log('nameWrapperResult :', nameWrapperResult);
  const baseRegistrarResult = await baseRegistrar.addController(nameWrapper.address);
  console.log('baseRegistrarResult :', baseRegistrarResult);
  const reverseRegistrarResult = await reverseRegistrar.setController(ethRegistrarController.address, true);
  console.log('reverseRegistrarResult :', reverseRegistrarResult);
};

async function setupReverseRegistrar(ens, reverseRegistrar, accounts) {
  await ens.setSubnodeOwner(ZERO_HASH, labelhash("reverse"), accounts[0]);
  await ens.setSubnodeOwner(namehash.hash("reverse"), labelhash("addr"), reverseRegistrar.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });