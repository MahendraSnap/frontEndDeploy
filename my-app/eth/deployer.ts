const ethers = require('ethers');

const MockAgregator = require('./artifacts/MockAggregator.json');

export const deployMockAgg = async function (_price:number)  {
    if (window.ethereum) {
        const provider = await new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        try {
            const factory = await new ethers.ContractFactory(MockAgregator.abi, MockAgregator.bytecode, signer);
            const contract = await factory.deploy(ethers.parseUnits(_price.toString(), 8));
            await contract.waitForDeployment();
            console.log('MockAgg Contract deployed at:', await contract.getAddress());
            return await contract.getAddress();
        } catch (error) {
            console.error('Error deploying MockAgg contract:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}


