const ethers = require('ethers');

const MockAgregator = require('./artifacts/MockAggregator.json');

export const deployMockAgg = async function (_price:number)  {
    if (window.ethereum) {
        const provider = await new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        try {
            const factory = await new ethers.ContractFactory(MockAgregator.abi, MockAgregator.bytecode, signer);
            const contract = await factory.deploy(ethers.parseEther(_price.toString()));
            await contract.waitForDeployment();
            console.log('NFT Contract deployed at:', await contract.getAddress());
            return await contract.getAddress();
        } catch (error) {
            console.error('Error deploying NFT contract:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}


