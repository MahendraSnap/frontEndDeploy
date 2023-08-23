'use client'

import Image from 'next/image'
import { useState } from 'react'
import {deployAggregator, UpdateApprovedAddress, ViewApprovedAddress, ViewLatestAnswer} from '../eth/Aggregator'



export default function Home() {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [nftContractAddress, setNFTContractAddress] = useState("");
  const [nameDeployer, setnameDeployer] = useState("");
  const [approvedAddress, setApprovedAddress] = useState("");
  const [latestAnswer, setLatestAnswer] = useState("");

  const downloadTxtFile = (contractName:string, contractAddress:string) => {
  const formattedContent = `Contract Address ${contractName}: ${contractAddress}`;

  const element = document.createElement('a');
  const file = new Blob([formattedContent], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${contractName}_address.txt`;
  document.body.appendChild(element);
  element.click();
};

const deployAggregatorContract = async (price:number, name:string) => {
  try {
    const deployedAddress:any = await deployAggregator(price);
    setnameDeployer(name);
    setNFTContractAddress(deployedAddress);
  } catch (error) {
    console.error('Error deploying NFT contract:', error);
  }
};

const getAggregatorApprovedAddress = async (ContractAddress:string) => {
  try {
    setApprovedAddress(await ViewApprovedAddress(ContractAddress));
  } catch (error) {
    console.error('Error deploying NFT contract:', error);
  }
};

const getAggregatorLatestAnswer = async (ContractAddress:string) => {
  try {
    setLatestAnswer(await ViewLatestAnswer(ContractAddress));
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
                    onClick={() => deployAggregatorContract(
                      parseFloat((document.getElementById('price') as HTMLInputElement).value),
                      (document.getElementById('Name')as HTMLInputElement).value
                    )}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Deploy Aggregator
                  </button>
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Input the Price"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="price"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Input Your Name"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="Name"
                  />
                </td>
              </tr>
            </tbody>
            {nftContractAddress && (
          <div className="mb-2">
          <p>thanks {nameDeployer}! 
            Aggregator Contract Address: {nftContractAddress}</p>
          </div>
            )}
            <tbody>
              <tr>
                <td>
                <button
                    onClick={() => getAggregatorLatestAnswer(
                      (document.getElementById('ContractAddressAA')as HTMLInputElement).value
                    )}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    View latest Answer
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Contract Address"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="ContractAddressAA"
                  />
                </td>
              </tr>
                {latestAnswer && (
                  <div className="mb-2">
                  <p>: {latestAnswer}</p>
                  </div>
                )}
            </tbody>
            <tbody>
              <tr>
                <td>
                <button
                    onClick={() => UpdateApprovedAddress(
                      (document.getElementById('ContractAddress')as HTMLInputElement).value,
                      (document.getElementById('NewApprovedAddress')as HTMLInputElement).value
                    )}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Change Approved Address
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Contract Address"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="ContractAddress"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="New Approved Address"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="NewApprovedAddress"
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>
                <button
                    onClick={() => getAggregatorApprovedAddress(
                      (document.getElementById('ContractAddressA')as HTMLInputElement).value
                    )}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    View Approved Address
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Contract Address"
                    className="px-4 py-2 bg-grey-100 text-black rounded-md"
                    id="ContractAddressA"
                  />
                </td>
              </tr>
              {approvedAddress && (
          <div className="mb-2">
          <p>Aggregator Contract, Approved Address: {approvedAddress}</p>
          </div>
          )}
            </tbody>
          </table>
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
