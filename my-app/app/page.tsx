'use client'

import Image from 'next/image'
import { useState } from 'react'
import {deployNFT, deployMarketplace, deployNFTAirdrop, deployTicketQueue} from '../eth/deployer'

export default function Home() {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);

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
                    onClick={() => deployNFT(
                      document.getElementById('nftName').value,
                      document.getElementById('nftSymbol').value,
                      document.getElementById('nftContractURI').value
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
                    onClick={() => deployMarketplace(
                      parseFloat(document.getElementById('marketplaceListPrice').value)
                    )}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                  >
                    Deploy Marketplace Contracts
                  </button>
                </td>
                <td colSpan="3">
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
                    onClick={() => deployNFTAirdrop(
                      document.getElementById('nftAirdropName').value,
                      document.getElementById('nftAirdropSymbol').value,
                      document.getElementById('nftAirdropContractURI').value
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
                <td colSpan="4">
                  <button
                    onClick={() => deployTicketQueue()}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Deploy TicketQueue Contract
                  </button>
                </td>
              </tr>
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
