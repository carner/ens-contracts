const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() {
  // PublicResolver:0x5A46b8789d59Cc1665E86bBc61F1005d38BDcB68
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ensAddr = '0x14b885Fab57F4119F36A0C0E258D238518690dec'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  const nameWrapperAddr = '0x94c576120f7383dBEc463f8fE646DfA0B434353C'
  const nameWrapper = await ethers.getContractAt('NameWrapper', nameWrapperAddr)

  const PublicResolver = await ethers.getContractFactory("PublicResolver")

  const publicResolver = await PublicResolver.deploy(registry.address, nameWrapper.address, accounts[0], accounts[0]);
  await publicResolver.deployed()
  console.log('Deployed PublicResolver to:', publicResolver.address);
  setupResolver(registry, publicResolver, accounts)
};

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver");
  const resolverLabel = labelhash("resolver");
  await ens.setSubnodeOwner(ZERO_HASH, resolverLabel, accounts[0]);
  await ens.setResolver(resolverNode, resolver.address);
  await resolver['setAddr(bytes32,address)'](resolverNode, resolver.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });