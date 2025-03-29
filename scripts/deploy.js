import hre from "hardhat";

async function main() {
    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");

    const nftMarketplace = await NFTMarketplace.deploy("My NFT Marketplace", "MNFT");

    await nftMarketplace.waitForDeployment();

    const contractAddress = await nftMarketplace.getAddress();

    console.log(`NFTMarketplace deployed to: ${contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });