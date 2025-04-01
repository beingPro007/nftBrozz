// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract NFTMarketplace is ERC721URIStorage, Ownable {
  uint256 private _tokenIds;

  struct Listing {
    address seller;
    uint256 price;
    bool isListed;
  }

  mapping(uint256 => Listing) public listings;

  event NFTMinted(address owner, uint256 tokenId, string tokenURI);
  event NFTListed(uint256 tokenId, uint256 price, address seller);
  event NFTBought(
    uint256 tokenId,
    address buyer,
    address seller,
    uint256 price
  );

  constructor(
    string memory name,
    string memory symbol
  ) ERC721(name, symbol) Ownable(msg.sender) {}

  function mintNFT(string memory tokenURI) public returns (uint256) {
    _tokenIds++;
    uint256 newItemId = _tokenIds;

    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);

    emit NFTMinted(msg.sender, newItemId, tokenURI);
    return newItemId;
  }

  function listNFT(uint256 tokenId, uint256 price) public {
    require(ownerOf(tokenId) == msg.sender, "You don't own this NFT");
    require(price > 0, 'Price must be greater than zero');

    listings[tokenId] = Listing(msg.sender, price, true);
    emit NFTListed(tokenId, price, msg.sender);
  }

  function buyNFT(uint256 tokenId) public payable {
    require(listings[tokenId].isListed, 'NFT is not for sale');
    require(msg.value >= listings[tokenId].price, 'Insufficient funds');

    address seller = listings[tokenId].seller;
    uint256 price = listings[tokenId].price;

    listings[tokenId].isListed = false;
    _transfer(seller, msg.sender, tokenId);
    payable(seller).transfer(price);

    emit NFTBought(tokenId, msg.sender, seller, price);
  }

  function getAllMintedNFTs() public view returns (uint256[] memory) {
    uint256 totalNFTs = _tokenIds;
    uint256[] memory tokenIds = new uint256[](totalNFTs);

    for (uint256 i = 0; i < totalNFTs; i++) {
      tokenIds[i] = i + 1;
    }

    return tokenIds;
  }

  function getListingDetails(
    uint256 tokenId
  ) public view returns (address, uint256, bool) {
    Listing memory listing = listings[tokenId];
    return (listing.seller, listing.price, listing.isListed);
  }

  event DebugLog(
    string message,
    address sender,
    uint256 tokenId,
    uint256 price
  );
}
