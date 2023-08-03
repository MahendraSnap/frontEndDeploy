const ethers = require('ethers');

const Marketplace = require('./artifacts/Marketplace.json'); 
const NFT = require('./artifacts/NFT.json');
const NFTAirdrop = require('./artifacts/NFTAirdrop.json');
const TicketQueue = require('./artifacts/TicketQueue.json');


export const deployNFT = async function (_name:string, _symbol:string, _contractURI:string)  {
    if (window.ethereum) {
        const provider = await new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        try {
            const factory = await new ethers.ContractFactory(NFT.abi, NFT.bytecode, signer);
            const contract = await factory.deploy(_name, _symbol, _contractURI);
            await contract.waitForDeployment();
            console.log('NFT Contract deployed at:', await contract.getAddress());
        } catch (error) {
            console.error('Error deploying NFT contract:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}

export const deployMarketplace = async function (_listPrice:number)  {
    if (window.ethereum) {
        const provider = await new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        try {
            const factory = await new ethers.ContractFactory(Marketplace.abi, Marketplace.bytecode, signer);
            const contract = await factory.deploy(ethers.parseEther(_listPrice.toString()));
            await contract.waitForDeployment();
            console.log('Marketplace Contract deployed at:', await contract.getAddress());
        } catch (error) {
            console.error('Error deploying Marketplace contract:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}

export const deployNFTAirdrop = async function (_name:string, _symbol:string, _contractURI:string)  {
    if (window.ethereum) {
        const provider = await new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        try {
            const factory = await new ethers.ContractFactory(NFTAirdrop.abi, NFTAirdrop.bytecode, signer);
            const contract = await factory.deploy(_name, _symbol, _contractURI);
            await contract.waitForDeployment();
            console.log('NFTAirdrop Contract deployed at:', await contract.getAddress());
        } catch (error) {
            console.error('Error deploying NFTAirdrop contract:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}

export const deployTicketQueue = async function ()  {
    if (window.ethereum) {
        const provider = await new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        try {
            const factory = new ethers.ContractFactory(TicketQueue.abi, TicketQueue.bytecode, signer);
            const contract = await factory.deploy();
            await contract.deployed();
            console.log('TicketQueue Contract deployed at:', await contract.getAddress());
        } catch (error) {
            console.error('Error deploying TicketQueue contract:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}

