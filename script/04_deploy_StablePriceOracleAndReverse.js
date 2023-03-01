const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() { 
  // sepolia->DummyOracle:0x4ff2885AA7dE1aD34073aa28C5f773f225c0b0Eb
  // sepolia->StablePriceOracle:0xD358B98AEA50BBA96A6b233c570aF31C3cEf2c6C
  // sepolia->ReverseRegistrar:0x209222F7518203D50831519c0a06520691FeAE1F
  // sepolia->ETHRegistrarController:0xaC6Ae1E6AB5fd01ac26bC03da8f8C9eB2876f02f
  // goerli->DummyOracle:0xC69e58809827901a62Ac927f07e70B967D7E5A5D
  // goerli->StablePriceOracle:0x317AA2668D12b693d465D56D7cC285FdAe14CF08
  // goerli->ReverseRegistrar:0x28f307B46C678F8A6C3BafDF8a7641e7Eee5F20a
  // goerli->ETHRegistrarController:0x949cfa4105e21854f4a0563f5bFeCb4b42a4d963/0x566205C729AE5D293F98eba820D7C51Dc54D82D2/0x7A2F6979D76eDd63C358ef4267FA72e43AEDCe2D/0x84E4920f3D772C84Ca3564523AAd257c0B3bbFBb
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ensAddr = '0xcdf0caD9452d83ca3BDb03fd4e26275F2E712E43'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  const baseRegistrarAddr = '0x3f7E94Da6Abc6cf3e45caF20caa313E59A431B31'
  const baseRegistrar = await ethers.getContractAt('BaseRegistrarImplementation', baseRegistrarAddr)
  const nameWrapperAddr = '0x216127941e7D5A64D5D17Af5bA6b6a92c1911E7D'
  const nameWrapper = await ethers.getContractAt('NameWrapper', nameWrapperAddr)

  const DummyOracle = await ethers.getContractFactory("DummyOracle")
  const StablePriceOracle = await ethers.getContractFactory("StablePriceOracle")
  const ReverseRegistrar = await ethers.getContractFactory("ReverseRegistrar")
  
  // const dummyOracle = await DummyOracle.deploy(100000000);
  // await dummyOracle.deployed()
  // console.log('Deployed dummyOracle to:', dummyOracle.address);
  // const stablePriceOracle = await StablePriceOracle.deploy(dummyOracle.address, [0, 0, 4, 2, 1]);
  // await stablePriceOracle.deployed()
  // console.log('Deployed StablePriceOracle to:', stablePriceOracle.address);
  // const reverseRegistrar = await ReverseRegistrar.deploy(registry.address);
  // await reverseRegistrar.deployed()
  // console.log('Deployed ReverseRegistrar to:', reverseRegistrar.address);
  const reverseRegistrarAddr = '0x28f307B46C678F8A6C3BafDF8a7641e7Eee5F20a'
  const reverseRegistrar = await ethers.getContractAt('ReverseRegistrar', reverseRegistrarAddr)
  const stablePriceOracleAddr = '0x317AA2668D12b693d465D56D7cC285FdAe14CF08'
  const stablePriceOracle = await ethers.getContractAt('StablePriceOracle', stablePriceOracleAddr)
  // await setupReverseRegistrar(registry, reverseRegistrar, accounts);
  
  // const ETHRegistrarController = await ethers.getContractFactory("ETHRegistrarController")
  // const ethRegistrarController = await ETHRegistrarController.deploy(baseRegistrar.address, stablePriceOracle.address, 10, 86400, reverseRegistrar.address, nameWrapper.address);
  // await ethRegistrarController.deployed()
  // console.log('Deployed ETHRegistrarController to:', ethRegistrarController.address);

  // const nameWrapperResult = await nameWrapper.setController(ethRegistrarController.address, true);
  // console.log('nameWrapperResult :', nameWrapperResult);
  // const reverseRegistrarResult = await reverseRegistrar.setController(ethRegistrarController.address, true);
  // console.log('reverseRegistrarResult :', reverseRegistrarResult);

  // const dummyOracleAddr = '0xC69e58809827901a62Ac927f07e70B967D7E5A5D'
  // const dummyOracle = await ethers.getContractAt('DummyOracle', dummyOracleAddr)
  // const tx = await registry.setSubnodeOwner(namehash.hash('eth'), labelhash('data'), accounts[0])
  // console.log("tx : ", tx)
  // const tx1 = await registry.setSubnodeOwner(namehash.hash('data.eth'), labelhash('eth-usd'), dummyOracle.address)
  // console.log("tx1 : ", tx1)

  const tx1 = await registry.setResolver(namehash.hash('eth'), '0x3b9151C81E1Faa8d942B9eC45317B60b55352c4b')
  console.log("tx1 = ", tx1)
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