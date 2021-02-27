const hre = require('hardhat');

async function main() {
  const MixieAccessControl = await hre.ethers.getContractFactory('MixieAccessControl');
  const mixieAccessControl = await MixieAccessControl.deploy();
  await mixieAccessControl.deployed();

  console.log('MixieAccessControl is deployed at:', mixieAccessControl.address);

  const Mixie = await hre.ethers.getContractFactory('Mixie');
  const mixie = await Mixie.deploy('Mixie', 'MIXIE', mixieAccessControl.address);
  await mixie.deployed();

  console.log('Mixie deployed to:', mixie.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
