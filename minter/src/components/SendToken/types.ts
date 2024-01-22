import { ethers } from "ethers";
import { Toast } from "primereact/toast";
import { RefObject } from "react";

export interface Iprops {
  contract: ethers.Contract;
  toast: RefObject<Toast>;
  tokenMinted: number;
}

export interface IPropsSendBtn {
  isBtnLocked: boolean;
  sendTokenHandler: () => void;
}

export interface IPorpsInputs {
  fromAmount: number;
  toAddress: string;
  ownedAmount: string;
  loadingBalance: boolean;
  setFromAmount: (value: number) => void;
  setToAddress: (value: string) => void;
}
