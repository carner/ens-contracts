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
  // sepolia->BaseRegistrarImplementation: 0xE5105eD2FeD2d76A35F33717C226CC30D028aF62
  // goerli->BaseRegistrarImplementation: 0x3f7E94Da6Abc6cf3e45caF20caa313E59A431B31
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ensAddr = '0xcdf0caD9452d83ca3BDb03fd4e26275F2E712E43'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)

  // 1.deploy BaseRegistrarImplementation
  var baseRegistrar;
  if (false) {
    const BaseRegistrar = await ethers.getContractFactory("BaseRegistrarImplementation")
    baseRegistrar = await BaseRegistrar.deploy(registry.address, namehash.hash('eth'));
    await baseRegistrar.deployed()
    console.log('Deployed BaseRegistrarImplementation to:', baseRegistrar.address);
  } else{
    const baseRegistrarAddr = '0x3f7E94Da6Abc6cf3e45caF20caa313E59A431B31' //'0x5f01413C2A99fCd899be0482058637a80a683960' //'0x954658e2864A7A5bDB02E590ce784DC7AAbF9941'
    baseRegistrar = await ethers.getContractAt('BaseRegistrarImplementation', baseRegistrarAddr)
    console.log('BaseRegistrarImplementation address:', baseRegistrar.address);
  }

  // 2.set eth owner
  const setOwner = await registry.setSubnodeOwner(ZERO_HASH, labelhash('eth'), baseRegistrar.address);
  console.log('eth setOwner:', setOwner);
  // const ethAddr = await registry.owner(namehash.hash('eth'))
  // console.log('eth own is:', ethAddr);

  // test
  // const setOwner = await registry.setSubnodeOwner(ZERO_HASH, labelhash('eth'), accounts[0])
  // console.log('eth setOwner:', setOwner);
  // const setResolver = await registry.setResolver(namehash.hash('eth'), '0x3b9151C81E1Faa8d942B9eC45317B60b55352c4b')
  // console.log('eth setResolver:', setResolver);
  // const setResolver = await registry.resolver(namehash.hash('eth'))
  // console.log('eth setResolver:', setResolver);

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