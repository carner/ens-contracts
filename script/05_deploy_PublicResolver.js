const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() {
  // sepolia->PublicResolver:0x5A46b8789d59Cc1665E86bBc61F1005d38BDcB68
  // goerli->PublicResolver:0x3b9151C81E1Faa8d942B9eC45317B60b55352c4b
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ensAddr = '0xcdf0caD9452d83ca3BDb03fd4e26275F2E712E43'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  const nameWrapperAddr = '0xea23330b98a4f66e830c6b2EAa8286667D2DfEB0'
  const nameWrapper = await ethers.getContractAt('NameWrapper', nameWrapperAddr)

  // const PublicResolver = await ethers.getContractFactory("PublicResolver")
  // const publicResolver = await PublicResolver.deploy(registry.address, nameWrapper.address, accounts[0], accounts[0]);
  // await publicResolver.deployed()

  const publicResolverAddr = '0x3b9151C81E1Faa8d942B9eC45317B60b55352c4b'
  const publicResolver = await ethers.getContractAt('PublicResolver', publicResolverAddr)
  console.log('Deployed PublicResolver to:', publicResolver.address);
  await setupResolver(registry, publicResolver, accounts)
};

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver");
  const resolverLabel = labelhash("resolver");
  const tx1 = await ens.setSubnodeOwner(ZERO_HASH, resolverLabel, accounts[0]);
  console.log('tx1 to:', tx1);
  const tx2 = await ens.setResolver(resolverNode, resolver.address);
  console.log('tx2 to:', tx2);
  const tx3 = await resolver['setAddr(bytes32,address)'](resolverNode, resolver.address);
  console.log('tx3 to:', tx3);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });