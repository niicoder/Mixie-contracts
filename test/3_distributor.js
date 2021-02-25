const { expect } = require('chai');

describe('Mixie', function () {
  it('Should deploy', async function () {
    const MixieAccessControl = await ethers.getContractFactory('MixieAccessControl');
    const mixieAccessControl = await MixieAccessControl.deploy();
    await mixieAccessControl.deployed();

    const Mixie = await ethers.getContractFactory('Mixie');
    const mixie = await Mixie.deploy('Mixie', 'MIXIE', mixieAccessControl.address);

    await mixie.deployed();
    expect(await mixie.getCurrentTokenId()).to.equal(1200);
  });
});
