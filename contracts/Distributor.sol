//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/GSN/Context.sol";

import "./Mix.sol";
import "./Mixie.sol";

contract Distributor is Context {
    using SafeMath for uint256;

    Mix mixToken;
    Mixie mixieToken;
    uint256 requiredMix = 10000 * 10**18;

    constructor(Mix _mixToken, Mixie _mixieToken) {
        mixToken = _mixToken;
        mixieToken = _mixieToken;
    }

    function getNFT() external {
        uint256 tokenId = mixieToken.getCurrentTokenId();

        require(tokenId <= 1300, "Already Filled");
        require(
            mixToken.balanceOf(_msgSender()) >= requiredMix,
            "Not enough Mix"
        );
        mixToken.burnFrom(_msgSender(), requiredMix);
        mixieToken.awardItem(_msgSender(), "");
        requiredMix = requiredMix.mul(95).div(100);
    }
}
