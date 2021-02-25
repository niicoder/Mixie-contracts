//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./MixieAccessControl.sol";

contract Mixie is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds = Counters.Counter(1200);
    MixieAccessControl accessControl;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        MixieAccessControl _accessControl
    ) ERC721(_tokenName, _tokenSymbol) {
        accessControl = _accessControl;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function awardItem(address player, string memory _tokenURI)
        public
        returns (uint256)
    {
        require(accessControl.hasMinterRole(_msgSender()), "Not Minter!");
        uint256 newTokenId = _tokenIds.current();
        _tokenIds.increment();
        _safeMint(player, newTokenId);
        // _setTokenURI(newTokenId, _tokenURI);

        return newTokenId;
    }
}
