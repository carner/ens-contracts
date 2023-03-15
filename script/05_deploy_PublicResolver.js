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
  // sepolia->PublicResolver:0xFe41939A98b6719dCBA8C3C057dCDE14260CcAD0
  // sepolia->PublicResolver:0x225048D9bD5e0697B2B206Bed2c3AD44a091202f
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  if (false){
    const ensAddr = '0x8E5b3A32Cf8eb64590380364bA56b88BA643eb55'
    const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
    const nameWrapperAddr = '0x3D39A068d844024B16731400a67d3578ac2679c5'
    const nameWrapper = await ethers.getContractAt('NameWrapper', nameWrapperAddr)
  
    // deploy PublicResolver
    const PublicResolver = await ethers.getContractFactory("PublicResolver")
    // const publicResolver = await PublicResolver.deploy(registry.address, nameWrapper.address, accounts[0], accounts[0]);
    const publicResolver = await PublicResolver.deploy(registry.address, nameWrapper.address);
    await publicResolver.deployed()
    console.log('Deployed PublicResolver to:', publicResolver.address);
  } else {
    const publicResolverAddr = '0x225048D9bD5e0697B2B206Bed2c3AD44a091202f'
    const publicResolver = await ethers.getContractAt('PublicResolver', publicResolverAddr)
    console.log('Deployed PublicResolver to:', publicResolver.address);
    // await setupResolver(registry, publicResolver, accounts)

    // let provider = ethers.getDefaultProvider();
    // let privateKey = '89365960fc250d3ae8ac2ac2f2df93e08bad0bfa88c41d2ba1f90e534be4959';
    // let wallet = new ethers.Wallet(privateKey, provider);
    // let contractWithSigner = publicResolver.connect(wallet)

    // const tx = await publicResolver.setInterface(namehash.hash('eth'), "0x018fac06", "0xA98EE5D25eF3Fd9179a038C34ad14802aB216F2C")
    // console.log("tx = ", tx)
    // await tx.wait();

    // const tx1 = await publicResolver['setAddr(bytes32,address)'](namehash.hash('resolver.eth'), "0x225048D9bD5e0697B2B206Bed2c3AD44a091202f")
    // console.log("tx1 = ", tx1)
    // await tx1.wait();

    // const tx2 = await publicResolver['setAddr(bytes32,address)'](namehash.hash('eth-usd.data.eth'), "0xEB6B12a48072e1457ed83Bc5C9B600FbC5D78CBD")
    // console.log("tx2 = ", tx2)
    // await tx2.wait();

    // const tx3 = await publicResolver['setAddr(bytes32,address)'](namehash.hash('eth-usd.data.eth'), "0xEB6B12a48072e1457ed83Bc5C9B600FbC5D78CBD")
    // console.log("tx3 = ", tx3)
    // await tx3.wait();

    console.log("d=", namehash.hash('eth'))
    console.log("d=", namehash.hash('oracle'))
  }
};

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver");
  const resolverLabel = labelhash("resolver");
  // const tx1 = await ens.setSubnodeOwner(ZERO_HASH, resolverLabel, accounts[0]);
  // console.log('tx1 to:', tx1);
  // const tx2 = await ens.setResolver(resolverNode, resolver.address);
  // console.log('tx2 to:', tx2);
  const tx3 = await resolver['setAddr(bytes32,address)'](resolverNode, resolver.address);
  console.log('tx3 to:', tx3);
  const tx4 = await resolver['setInterface(bytes32,bytes4,address)'](namehash.hash('eth'), '0x018fac06', '0x949cfa4105e21854f4a0563f5bFeCb4b42a4d963');
  console.log('tx4 to:', tx4);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });