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
  // PublicResolver:0x5A46b8789d59Cc1665E86bBc61F1005d38BDcB68
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  // const ensAddr = '0x14b885Fab57F4119F36A0C0E258D238518690dec'
  // const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  // const resolverLabel = labelhash("testeth");
  // const ttt = await registry.resolver(resolverLabel)
  // console.log("result = ", ttt)
  // const publicResolverAddr = '0x5A46b8789d59Cc1665E86bBc61F1005d38BDcB68'
  // const publicResolver = await ethers.getContractAt('PublicResolver', publicResolverAddr)

  // const resolverNode = namehash.hash("resolver");
  // const resolver111 = await publicResolver['setAddr(bytes32,address)'](resolverNode, publicResolver.address)
  // console.log('Deployed resolver111 to:', resolver111);
  // const resolver = await publicResolver.addr(resolverNode)
  // const resolver = await publicResolver['addr(bytes32)'](resolverNode)
  // const resolver = await publicResolver.methods['addr(bytes32)'](resolverNode)
  // console.log('Deployed PublicResolver addr to:', resolver);

  // const resolverLabel = labelhash("resolver");
  // const addrsddd = await registry.setSubnodeOwner(ZERO_HASH, resolverLabel, accounts[0]);
  // console.log('Deployed PublicResolver to:', addrsddd);
  // const aaaaa = await registry.setResolver(resolverNode, publicResolver.address);
  // console.log('Deployed aaaaa to:', aaaaa);
  // const addrs = await registry.owner(resolverNode)
  // console.log('Deployed PublicResolver to:', addrs);
  // setupResolver(registry, publicResolver, accounts)



  const ethRegistrarControllerAddr = '0x4E1Ca943150383e859B7bD1EEdD8d6fae93137b3' // 0xaF45df6eE7482Efea1CF7b947DF71E1394B0c7De //'0xf6fAF4d30AFd934E3C5b1ad666f6EF6A20CbD0Cc'
  const ethRegistrarController = await ethers.getContractAt('ETHRegistrarController', ethRegistrarControllerAddr)
  console.log("ETHRegistrarController address = ", ethRegistrarController.address)

  const owner = "0x091a90a64A79542Ca48732F1D15cc57e58d41da0"
  const resolver = "0x5A46b8789d59Cc1665E86bBc61F1005d38BDcB68"
  const DAY = 24 * 60 * 60
  const REGISTRATION_TIME = 28 * DAY
  const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF'

  // check register is valid
  // const valid = await ethRegistrarController.valid(tld)
  // console.log("valid = ", valid)
  // const price = await ethRegistrarController.rentPrice(tld, REGISTRATION_TIME)
  // console.log("price = ", price)
  // const available = await ethRegistrarController.available(tld)
  // console.log("available = ", available)
  // if (valid == true && available == true) {
  //   const tx = await ethRegistrarController.makeCommitment(
  //       'testdao',
  //       owner,
  //       REGISTRATION_TIME,
  //       secret,
  //       resolver,
  //       [],
  //       false,
  //       0,
  //   )
  //   console.log("makeCommitment = ", tx)
  //   const tx2 = await ethRegistrarController.commit(tx)
  //   console.log("commit = ", tx2)
  // }
  
  // test register
  // var tx3 = await ethRegistrarController.register(
  //   'testdao',
  //   owner,
  //   REGISTRATION_TIME,
  //   secret,
  //   resolver,
  //   [],
  //   false,
  //   0,
  //   {
  //     value: ethers.utils.parseEther("0.8")
  //   },
  // )
  // console.log("result = ", tx3)



  // 重新注册 ETHRegistrarController
  // const baseRegistrarAddr = '0xE5105eD2FeD2d76A35F33717C226CC30D028aF62'
  // const baseRegistrar = await ethers.getContractAt('BaseRegistrarImplementation', baseRegistrarAddr)
  // const nameWrapperAddr = '0xFc187a1135C15a5e879f1a7B35526A74ca6AA2Db'
  // const nameWrapper = await ethers.getContractAt('NameWrapper', nameWrapperAddr)
  // const stablePriceOracleAddr = '0xD358B98AEA50BBA96A6b233c570aF31C3cEf2c6C'
  // const stablePriceOracle = await ethers.getContractAt('StablePriceOracle', stablePriceOracleAddr)
  // const reverseRegistrarAddr = '0x209222F7518203D50831519c0a06520691FeAE1F'
  // const reverseRegistrar = await ethers.getContractAt('ReverseRegistrar', reverseRegistrarAddr)

  // const ETHRegistrarController = await ethers.getContractFactory("ETHRegistrarController")
  // const ethRegistrarController = await ETHRegistrarController.deploy(baseRegistrar.address, stablePriceOracle.address, 60, 86400, reverseRegistrar.address, nameWrapper.address);
  // await ethRegistrarController.deployed()
  // console.log('Deployed ETHRegistrarController to:', ethRegistrarController.address);

  // const nameWrapperResult = await nameWrapper.setController(ethRegistrarController.address, true);
  // console.log('nameWrapperResult :', nameWrapperResult);
  // const baseRegistrarResult = await baseRegistrar.addController(nameWrapper.address);
  // console.log('baseRegistrarResult :', baseRegistrarResult);
  // const reverseRegistrarResult = await reverseRegistrar.setController(ethRegistrarController.address, true);
  // console.log('reverseRegistrarResult :', reverseRegistrarResult);
  // 重新注册 ETHRegistrarController

  const ensAddr = '0x14b885Fab57F4119F36A0C0E258D238518690dec'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  const testethAddr = await registry.owner(namehash.hash('testdao.dao'))
  console.log('testdao own is:', testethAddr);
  const testethResolverAddr = await registry.resolver(namehash.hash('testdao.dao'))
  console.log('testdao Resolver address is:', testethResolverAddr);
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