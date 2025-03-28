// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {}

    function mintNFT(string memory tokenURI) public returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
