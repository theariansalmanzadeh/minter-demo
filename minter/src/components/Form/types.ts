import { ethers } from "ethers";

export enum pageTab {
  mint = "1",
  send = "2",
}

export interface Iprops {
  contract: ethers.Contract;
}
