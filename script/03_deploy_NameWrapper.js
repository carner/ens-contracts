const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() {
  // sepolia->StaticMetadataService:0x0cAc90559e7c66b1b312939112886F3D4827d6F7
  // sepolia->NameWrapper:0x94c576120f7383dBEc463f8fE646DfA0B434353C/0xFc187a1135C15a5e879f1a7B35526A74ca6AA2Db
  // goerli->StaticMetadataService:0x060279520E9749D11e84D0ca1e912Ba6eEd1077C
  // goerli->NameWrapper:0x216127941e7D5A64D5D17Af5bA6b6a92c1911E7D/0xC3DaEa8b4eB379Fe05E869Ad7806Ed22161ccB3c/0xea23330b98a4f66e830c6b2EAa8286667D2DfEB0
  // StaticMetadataService:0xAeD8CC87fBC40FF047138d5ff1024Ef4743874Ac
  // NameWrapper:0x0F69D348c66F7fc674440E777D4E931927B4C8Bf
  // sepolia->StaticMetadataService:0x1cAc474805184F24c9f233E97f0f1C2eDC5AfF4C
  // sepolia->NameWrapper:0x3D39A068d844024B16731400a67d3578ac2679c5
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ensAddr = '0x8E5b3A32Cf8eb64590380364bA56b88BA643eb55'
  const registry = await ethers.getContractAt('ENSRegistry', ensAddr)
  const baseRegistrarAddr = '0x48657eb8D3434060D6E5502624393f420b5b7100'
  const baseRegistrar = await ethers.getContractAt('BaseRegistrarImplementation', baseRegistrarAddr)
  
  // deploy StaticMetadataService
  var staticMetadataService
  if (true) {
    const StaticMetadataService = await ethers.getContractFactory("StaticMetadataService")
    staticMetadataService = await StaticMetadataService.deploy("https://app.eth.domains");
    await staticMetadataService.deployed()
    console.log('Deployed StaticMetadataService to:', staticMetadataService.address);
  } else {
    // const nameWrapperAddr = '0xea23330b98a4f66e830c6b2EAa8286667D2DfEB0'
    // nameWrapper = await ethers.getContractAt('NameWrapper', nameWrapperAddr)
    // console.log('NameWrapper address:', nameWrapper.address);
    const staticMetadataServiceAddr = '0x060279520E9749D11e84D0ca1e912Ba6eEd1077C'
    staticMetadataService = await ethers.getContractAt('StaticMetadataService', staticMetadataServiceAddr)
    console.log('StaticMetadataService address:', staticMetadataService.address);
  }
  
  // deploy NameWrapper
  const NameWrapper = await ethers.getContractFactory("NameWrapper")
  const nameWrapper = await NameWrapper.deploy(registry.address, baseRegistrar.address, staticMetadataService.address);
  await nameWrapper.deployed()
  console.log('Deployed NameWrapper to:', nameWrapper.address);

  // const baseRegistrarResult = await baseRegistrar.addController(nameWrapper.address);
  // console.log('baseRegistrarResult :', baseRegistrarResult);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });