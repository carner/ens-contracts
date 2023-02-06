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
  // ETHRegistrarController:0x4E1Ca943150383e859B7bD1EEdD8d6fae93137b3
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  // const ensAddr = '0x14b885Fab57F4119F36A0C0E258D238518690dec'
  // const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  // const baseRegistrarAddr = '0x63021B8d41Fa55Ba3679820c9493A8F0c634027f'
  // const baseRegistrar = await ethers.getContractAt('BaseRegistrarImplementation', baseRegistrarAddr)
  // const nameWrapperAddr = '0x1ffb30b7e2D85E34c5d74b3eCC5B3AA31481c189'
  // const nameWrapper = await ethers.getContractAt('NameWrapper', nameWrapperAddr)

  // const dummyOracleAddr = '0x4ff2885AA7dE1aD34073aa28C5f773f225c0b0Eb'
  // const dummyOracle = await ethers.getContractAt("DummyOracle", dummyOracleAddr)
  // const stablePriceOracleAddr = '0xD358B98AEA50BBA96A6b233c570aF31C3cEf2c6C'
  // const stablePriceOracle = await ethers.getContractAt("StablePriceOracle", stablePriceOracleAddr)
  const reverseRegistrarAddr = '0x209222F7518203D50831519c0a06520691FeAE1F'
  const reverseRegistrar = await ethers.getContractAt("ReverseRegistrar", reverseRegistrarAddr)
  
  // const dummyOracle = await DummyOracle.deploy(100000000);
  // await dummyOracle.deployed()
  // console.log('Deployed dummyOracle to:', dummyOracle.address);
  // const stablePriceOracle = await StablePriceOracle.deploy(dummyOracle.address, [0, 0, 4, 2, 1]);
  // await stablePriceOracle.deployed()
  // console.log('Deployed StablePriceOracle to:', stablePriceOracle.address);
  // const reverseRegistrar = await ReverseRegistrar.deploy(registry.address);
  // await reverseRegistrar.deployed()
  // console.log('Deployed ReverseRegistrar to:', reverseRegistrar.address);
  // const reverseRegistrarAddr = '0x209222F7518203D50831519c0a06520691FeAE1F'
  // const reverseRegistrar = await ethers.getContractAt('ReverseRegistrar', reverseRegistrarAddr)
  // const stablePriceOracleAddr = '0xD358B98AEA50BBA96A6b233c570aF31C3cEf2c6C'
  // const stablePriceOracle = await ethers.getContractAt('StablePriceOracle', stablePriceOracleAddr)
  // await setupReverseRegistrar(registry, reverseRegistrar, accounts);
  
  // deploy registrar
  // const ETHRegistrarController = await ethers.getContractFactory("ETHRegistrarController")
  // const ethRegistrarController = await ETHRegistrarController.deploy(baseRegistrar.address, stablePriceOracle.address, 60, 86400, reverseRegistrar.address, nameWrapper.address);
  // await ethRegistrarController.deployed()
  // console.log('Deployed ETHRegistrarController to:', ethRegistrarController.address);

  // const nameWrapperResult = await nameWrapper.setController(ethRegistrarController.address, true);
  // console.log('nameWrapperResult :', nameWrapperResult);
  // const baseRegistrarResult = await baseRegistrar.addController(nameWrapper.address);
  // console.log('baseRegistrarResult :', baseRegistrarResult);
  const registrarAddr = '0x4E1Ca943150383e859B7bD1EEdD8d6fae93137b3'
  const reverseRegistrarResult = await reverseRegistrar.setController(registrarAddr, true);
  console.log('reverseRegistrarResult :', reverseRegistrarResult);

  // console.log('eth label :', labelhash("eth"));
  // console.log('eth node :', namehash.hash("eth"));

  // console.log('dao label :', labelhash("dao"));
  // console.log('dao node :', namehash.hash("dao"));
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