const hre = require('hardhat');

async function main() {
  const Distributor = await ethers.getContractFactory('Distributor');
  const distributor = await Distributor.deploy(
    '0xB67754f5b4C704A24d2db68e661b2875a4dDD197',
    '0xa251b5EAa9E67F2Bc8b33F33e20E91552Bf85566',
  );

  await distributor.deployed();
  console.log('Distributor is deployed to:', distributor.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
