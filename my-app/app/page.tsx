'use client'

import Image from 'next/image'
import { useState } from 'react'
import {deployNFT, deployMarketplace, deployNFTAirdrop, deployTicketQueue} from '../eth/deployer'



export default function Home() {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [nftContractAddress, setNFTContractAddress] = useState("");
  const [marketplaceContractAddress, setMarketplaceContractAddress] = useState("");
  const [nftAirdropContractAddress, setNFTAirdropContractAddress] = useState("");
  const [ticketQueueContractAddress, setTicketQueueContractAddress] = useState("");

  interface Ethereum {
    request(args: any): Promise<any>;
    // Add more properties and methods from the Ethereum provider API
  }

  interface Window {
    ethereum?: Ethereum;
  }

  const downloadTxtFile = (contractName:string, contractAddress:string) => {
  const formattedContent = `Contract Address ${contractName}: ${contractAddress}`;

  const element = document.createElement('a');
  const file = new Blob([formattedContent], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${contractName}_address.txt`;
  document.body.appendChild(element);
  element.click();
};

const deployNFTContract = async (name:string, symbol:string, contractURI:string) => {
  try {
    const deployedAddress:any = await deployNFT(name, symbol, contractURI);
    setNFTContractAddress(deployedAddress);
  } catch (error) {
    console.error('Error deploying NFT contract:', error);
  }
};

const deployMarketPLaceContract = async (listPrice:number) => {
  try {
    const deployedAddress:any = await deployMarketplace(listPrice);
    setMarketplaceContractAddress(deployedAddress);
  } catch (error) {
    console.error('Error deploying NFT contract:', error);
  }
};

const deployNFTAirdropContract = async (name:string, symbol:string, contractURI:string) => {
  try {
    const deployedAddress:any = await deployNFTAirdrop(name, symbol, contractURI);
    setNFTAirdropContractAddress(deployedAddress);
  } catch (error) {
    console.error('Error deploying NFT contract:', error);
  }
};

const deployTicketQueueContract = async () => {
  try {
    const deployedAddress:any = await deployTicketQueue();
    setTicketQueueContractAddress(deployedAddress);
  } catch (error) {
    console.error('Error deploying NFT contract:', error);
  }
};

  const connectToMetamask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsMetamaskConnected(true);
      } else {
        console.error('Metamask not installed');
      }
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  };

  return (
    <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
    <div className="group rounded-lg border border-transparent px-5 py-4 ">
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Deploy Smart Contract
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        Deploy your smart contract using Metamask.
      </p>
      {isMetamaskConnected ? (
        <div className="mt-4">
          <table>
            <tbody>
              <tr>
                <td>
                <button
                    onClick={() => deployNFTContract(
                      (document.getElementById('nftName')as HTMLInputElement).value,
                      (document.getElementById('nftSymbol')as HTMLInputElement).value,
                      (document.getElementById('nftContractURI')as HTMLInputElement).value
                    )}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Deploy NFT Contracts
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="nftName"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Symbol"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="nftSymbol"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Contract URI"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="nftContractURI"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => deployMarketPLaceContract(
                      parseFloat((document.getElementById('marketplaceListPrice') as HTMLInputElement).value)
                    )}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                  >
                    Deploy Marketplace Contracts
                  </button>
                </td>
                <td colSpan={3}>
                  <input
                    type="number"
                    placeholder="List Price"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="marketplaceListPrice"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => deployNFTAirdropContract(
                      (document.getElementById('nftAirdropName') as HTMLInputElement).value,
                      (document.getElementById('nftAirdropSymbol') as HTMLInputElement).value,
                      (document.getElementById('nftAirdropContractURI')as HTMLInputElement).value
                    )}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
                  >
                    Deploy NFTAirdrop Contract
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="nftAirdropName"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Symbol"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="nftAirdropSymbol"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Contract URI"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="nftAirdropContractURI"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <button
                    onClick={() => deployTicketQueueContract()}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Deploy TicketQueue Contract
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {nftContractAddress && (
          <div className="mb-2">
          <p>NFT Contract Address: {nftContractAddress}</p>
          <button
            onClick={() => downloadTxtFile('NFT', nftContractAddress)}
            className="mt-2 px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Download Address
          </button>
          </div>
          )}

          {marketplaceContractAddress && (
          <div className="mb-2">
          <p>MarketPlaces Contract Address: {marketplaceContractAddress}</p>
          <button
            onClick={() => downloadTxtFile('Marketplace', marketplaceContractAddress)}
            className="mt-2 px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Download Address
          </button>
          </div>
          )}

          {nftAirdropContractAddress && (
          <div className="mb-2">
          <p>NFT Airdrop Contract Address: {nftAirdropContractAddress}</p>
          <button
            onClick={() => downloadTxtFile('NFT-Airdrop', nftAirdropContractAddress)}
            className="mt-2 px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Download Address
          </button>
          </div>
          )}

          {ticketQueueContractAddress && (
          <div className="mb-2">
          <p>TicketQueue Contract Address: {ticketQueueContractAddress}</p>
          <button
            onClick={() => downloadTxtFile('Ticket&Queue', ticketQueueContractAddress)}
            className="mt-2 px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Download Address
          </button>
          </div>
          )}

        </div>
      ) : (
        <button
          onClick={connectToMetamask}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Connect to Metamask
        </button>
      )}
    </div>
  </div>
  
);
}
