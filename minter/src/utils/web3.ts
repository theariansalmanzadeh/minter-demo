import { ethers } from "ethers";

export const formatBalance = (value: ethers.BigNumber) => {
  return Number(ethers.utils.formatEther(value)).toFixed(4).toString();
};

export const isAddressValid = (address: string) => {
  return ethers.utils.isAddress(address);
};
