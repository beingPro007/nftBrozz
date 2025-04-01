import { ethers } from 'ethers';
import contractABI from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const CONTRACT_ADDRESS = '0x3539e7804AAaf4aB7b2404b34d7fc0465dA8E521';

async function retrieveAllNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(
        `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_METAMASK_INFURA_API_KEY}`
    );
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

    try {
        const tokenIds = await contract.getAllMintedNFTs(); // Use your contract's function

        // Use Promise.all to fetch all metadata in parallel
        const nftDataArray = await Promise.all(
            tokenIds.map(async (tokenId) => {
                try {
                    const uri = await contract.tokenURI(tokenId);
                    const owner = await contract.ownerOf(tokenId);
                    const response = await fetch(uri);
                    const metadata = await response.json();

                    return {
                        tokenId: tokenId.toString(),
                        owner,
                        name: metadata.name,
                        image: metadata.image,
                        description: metadata.description,
                        attributes: metadata.attributes
                    };
                } catch (error) {
                    console.error(`Error fetching metadata for Token ID ${tokenId}:`, error);
                    return null;
                }
            })
        );

        return nftDataArray.filter((nft) => nft !== null);
    } catch (error) {
        console.error("Error fetching NFTs:", error);
        return [];
    }
}

export default retrieveAllNFTs;
