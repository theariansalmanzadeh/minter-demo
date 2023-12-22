import { ethers } from "ethers";

export interface Iprops {
  provider: ethers.providers.Web3Provider | undefined;
  contract: ethers.Contract;
}
