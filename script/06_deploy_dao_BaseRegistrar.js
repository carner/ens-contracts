const hre = require("hardhat");
const namehash = require('eth-ens-namehash');

const sha3 = require('web3-utils').sha3

const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() {
  // BaseRegistrarImplementation: 0x63021B8d41Fa55Ba3679820c9493A8F0c634027f
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ensAddr = '0x14b885Fab57F4119F36A0C0E258D238518690dec'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)

  // 1.deploy BaseRegistrarImplementation
  var baseRegistrar;
  if (false) {
    const BaseRegistrar = await ethers.getContractFactory("BaseRegistrarImplementation")
    // baseRegistrar = await BaseRegistrar.deploy(registry.address, namehash.hash('eth'));
    baseRegistrar = await BaseRegistrar.deploy(registry.address, namehash.hash('dao'));
    await baseRegistrar.deployed()
    console.log('Deployed BaseRegistrarImplementation to:', baseRegistrar.address);
  } else{
    const baseRegistrarAddr = '0x63021B8d41Fa55Ba3679820c9493A8F0c634027f'
    baseRegistrar = await ethers.getContractAt('BaseRegistrarImplementation', baseRegistrarAddr)
    console.log('BaseRegistrarImplementation address:', baseRegistrar.address);
  }

  // 2.set dao owner
  // const setOwner = await registry.setSubnodeOwner(ZERO_HASH, labelhash('dao'), baseRegistrar.address);
  // console.log('dao setOwner:', setOwner);
  // const ethAddr = await registry.owner(namehash.hash('dao'))
  // console.log('dao own is:', ethAddr);

  // 3.addController
  // const addController = await baseRegistrar.addController(accounts[0])
  // console.log('BaseRegistrarImplementation addController:', addController);

  // 4.test register
  // var available = await baseRegistrar.available(sha3(tld))
  // console.log('available :', available);
  // if (available == true) {
  //   const DAY = 24 * 60 * 60
  //   const REGISTRATION_TIME = 28 * DAY
  //   const result1 = await baseRegistrar.register(sha3(tld), accounts[0], REGISTRATION_TIME)
  //   console.log('result1 :', result1);
  // }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });