/**
 * Utility functions for blockchain interactions
 */

import { ethers } from "ethers";

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
};

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  return new ethers.providers.Web3Provider(window.ethereum);
};

export const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const isValidAddress = (address) => {
  return ethers.utils.isAddress(address);
};

export const verifySignature = (message, signature, address) => {
  try {
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (err) {
    return false;
  }
};

export const getCurrentNetwork = async () => {
  const provider = getProvider();
  const network = await provider.getNetwork();
  return network;
};

export const switchNetwork = async (chainId) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (err) {
    if (err.code === 4902) {
      throw new Error("Network not found in MetaMask");
    }
    throw err;
  }
};
