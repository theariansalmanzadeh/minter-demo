import { ethers } from "ethers";
import { Toast } from "primereact/toast";
import { RefObject } from "react";

export interface Iprops {
  contract: ethers.Contract;
  toast: RefObject<Toast>;
  tokenMinted: number;
}
