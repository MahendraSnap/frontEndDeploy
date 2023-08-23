const ethers = require('ethers');

const Aggregator = require('./artifacts/Aggregator.json');

export const deployAggregator = async function (_price:number)  {
    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        try {
            const factory = new ethers.ContractFactory(Aggregator.abi, Aggregator.bytecode, signer);
            const contract = await factory.deploy(ethers.parseEther(_price.toString()));
            await contract.waitForDeployment();
            console.log('Aggregator Contract deployed at:', await contract.getAddress());
            return await contract.getAddress();
        } catch (error) {
            console.error('Error deploying Aggregator contract:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}

const getAggregator = async function (contractAddress:string)  {
    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        try {
            const contract = new ethers.BaseContract(contractAddress, Aggregator.abi, provider);
            return contract;
        } catch (error) {
            console.error('Error getAggregator:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}

export const UpdateApprovedAddress = async function (contractAddress:string, approvedAddress:string)  {
    if (window.ethereum) {
        const provider = await new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = await getAggregator(contractAddress);
        try {
            const tx = await contract.connect(signer).updateApprovedAddress(approvedAddress);
            tx.wait();
            console.log('Approved Address Updated Succefuly');
            return await contract.getAddress();
        } catch (error) {
            console.error('Error updating Approved Address:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}

export const ViewApprovedAddress = async function (contractAddress:string)  {
    if (window.ethereum) {
        const contract = await getAggregator(contractAddress);
        try {
            const approvedAddress = await contract.approved();
            //console.log('this Contract Approved Address:', approvedAddress);
            return approvedAddress;
        } catch (error) {
            console.error('Error fetch Approved Address from contract:', error);
        }
    } else {
        console.error('Metamask not found or not connected.');
    }
}


