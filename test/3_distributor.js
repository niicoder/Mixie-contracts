const { expect } = require('chai');

describe('Mixie', function () {
  let mixieAccessControl;
  let mixie;
  let mix;
  let distributor;
  let owner;
  let user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const MixieAccessControl = await ethers.getContractFactory('MixieAccessControl');
    mixieAccessControl = await MixieAccessControl.deploy();
    await mixieAccessControl.deployed();

    const Mixie = await ethers.getContractFactory('Mixie');
    mixie = await Mixie.deploy('Mixie', 'MIXIE', mixieAccessControl.address);
    await mixie.deployed();

    const Mix = await ethers.getContractFactory('Mix');
    mix = await Mix.deploy(ethers.utils.parseEther('1000000'), 'Mix', 'MIX');
    await mix.deployed();

    const Distributor = await ethers.getContractFactory('Distributor');
    distributor = await Distributor.deploy(mix.address, mixie.address);
    await distributor.deployed();

    await mixieAccessControl.addMinterRole(distributor.address);
  });

  it('Deployment', async function () {
    expect(await mix.balanceOf(owner.address)).to.equal(ethers.utils.parseEther('1000000'));
    expect(await mixieAccessControl.hasMinterRole(distributor.address)).to.equal(true);
  });

  it('Should able to GET NFT', async function () {
    await mix.approve(distributor.address, ethers.utils.parseEther('1000000'));
    await distributor.connect(owner).getNFT();
    expect(await mix.balanceOf(owner.address)).to.equal(ethers.utils.parseEther('950000'));
    expect(await mixie.balanceOf(owner.address)).to.equal(1);
    expect(await mix.totalSupply()).to.equal(ethers.utils.parseEther('950000'));

    await distributor.connect(owner).getNFT();
    expect(await mix.balanceOf(owner.address)).to.equal(ethers.utils.parseEther('902485.5'));
    expect(await mixie.balanceOf(owner.address)).to.equal(2);
    expect(await mix.totalSupply()).to.equal(ethers.utils.parseEther('902485.5'));
  });
});
