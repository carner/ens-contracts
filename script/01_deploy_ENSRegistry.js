const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() { 
  // sepolia->ENSRegistry:0x14b885Fab57F4119F36A0C0E258D238518690dec / 0x9e1a67543C3cA29BEA41F623a1F005BeD67d1220
  // goerli->ENSRegistry:0xA98EE5D25eF3Fd9179a038C34ad14802aB216F2C/0xcdf0caD9452d83ca3BDb03fd4e26275F2E712E43
  // sepolia->ENSRegistry:0x8E5b3A32Cf8eb64590380364bA56b88BA643eb55
  if (false) {
    const ENSRegistry = await ethers.getContractFactory("ENSRegistry")
    const ens = await ENSRegistry.deploy()
    await ens.deployed()
    console.log('Deployed to:', ens.address);
  } else {
    const signers = await ethers.getSigners();
    const accounts = signers.map(s => s.address)

    const ensAddr = '0x8E5b3A32Cf8eb64590380364bA56b88BA643eb55'
    const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
    console.log('ENSRegistry address:', registry.address);

    const setOwner = await registry.setSubnodeOwner(ZERO_HASH, labelhash('eth'), accounts[0])
    console.log('eth setOwner:', setOwner);
    const setResolver = await registry.setResolver(namehash.hash('eth'), '0x225048D9bD5e0697B2B206Bed2c3AD44a091202f')
    console.log('eth setResolver:', setResolver);

    // const setResolver = await registry.resolver(namehash.hash('eth'))
    // console.log('eth setResolver:', setResolver);

    const setResolver6 = await registry.setSubnodeOwner(namehash.hash('eth'), labelhash('resolver'), accounts[0]);
    console.log('eth setResolver6:', setResolver6);
    await setResolver6.wait();
    const setResolver7 = await registry.setResolver(namehash.hash('resolver.eth'), '0x225048D9bD5e0697B2B206Bed2c3AD44a091202f')
    console.log('eth setResolver7:', setResolver7);
    await setResolver7.wait();

    const setResolver2 = await registry.setSubnodeOwner(namehash.hash('eth'), labelhash('data'), accounts[0]);
    console.log('eth setResolver2:', setResolver2);
    await setResolver2.wait();
    const setResolver5 = await registry.setResolver(namehash.hash('data.eth'), '0x225048D9bD5e0697B2B206Bed2c3AD44a091202f')
    console.log('eth setResolver5:', setResolver5);
    await setResolver5.wait();

    const setResolver3 = await registry.setSubnodeOwner(namehash.hash('data.eth'), labelhash('eth-usd'), accounts[0]);
    console.log('eth setResolver3:', setResolver3);
    await setResolver3.wait();
    const setResolver4 = await registry.setResolver(namehash.hash('eth-usd.data.eth'), '0x225048D9bD5e0697B2B206Bed2c3AD44a091202f')
    console.log('eth setResolver4:', setResolver4);
    await setResolver4.wait();
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });