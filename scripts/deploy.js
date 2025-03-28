import hardhat from "hardhat";

async function main() {
    const NFTMarketplace = await hardhat.ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy("NFTBrozz", "NFTBZ");

    await nftMarketplace.waitForDeployment(); // Correct way to wait for deployment

    console.log(`NFTMarketplace deployed to: ${await nftMarketplace.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
