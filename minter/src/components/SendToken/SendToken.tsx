import React, { useCallback, useEffect, useRef, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ethers } from "ethers";
import { useAccount } from "@particle-network/connectkit";
import { useEthereum } from "@particle-network/auth-core-modal";
import { formatBalance, isAddressValid } from "../../utils/web3";
import TxStatusDialog from "../TxStatusDialog/TxStatusDialog";
import { modalType } from "../../types/ModaStatus";
import { CgSpinner } from "react-icons/cg";
import { Iprops } from "./types";

function SendToken({ contract, toast, tokenMinted }: Iprops) {
  const account = useAccount();
  const { address } = useEthereum();
  const [isBtnLocked, setIsBtnLocked] = useState(false);
  const [fromAmount, setFromAmount] = useState(tokenMinted);
  const [toAddress, setToAddress] = useState("");
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [ownedAmount, setOwnedAmount] = useState("-");
  const [isModal, setIsModal] = useState<modalType>(modalType.idle);
  const blockHashRef = useRef<string | null>(null);

  const showAddressError = (msg: string) => {
    if (toast.current === null) return;
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 5000,
    });
  };

  const loadingAnimation = () => (
    <div className="h-full w-[8rem] z-10 animate-pulse absolute top-0 left-0">
      <div className=" rounded-md bg-slate-400 h-full w-full"></div>
    </div>
  );

  const sendTokenHandler = async () => {
    if (fromAmount === 0) {
      showAddressError("Wrong Input amount");
      return;
    }
    if (toAddress === "" || !isAddressValid(toAddress)) {
      showAddressError("Wrong Address");
      return;
    }
    if (parseFloat(ownedAmount) === 0) {
      showAddressError("No funds");
      return;
    }
    try {
      const tx = await contract.transfer(
        toAddress,
        ethers.utils.parseEther(fromAmount.toString())
      );
      const res = await tx.wait();
      if (res.status === 1) {
        setIsModal(modalType.success);
        blockHashRef.current = res.transactionHash;
      } else if (res.status === 0) {
        blockHashRef.current = res.transactionHash;
        setIsModal(modalType.failed);
      }
      setIsBtnLocked(false);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      e.code === 4001 && setIsModal(modalType.failed);
      setIsBtnLocked(false);
    }
  };

  const getUserBalance = useCallback(
    async (address: string) => {
      setLoadingBalance(true);
      try {
        const _bal = await contract.balanceOf(address);
        setOwnedAmount(formatBalance(_bal));
        setLoadingBalance(false);
      } catch (e) {
        setLoadingBalance(false);
      }
    },
    [contract]
  );

  useEffect(() => {
    const userAddress = (account || address) ?? "";
    getUserBalance(userAddress);
  }, [account, address, getUserBalance]);
  return (
    <React.Fragment>
      <h3 className="text-black font-semibold">Send Token to a adress</h3>
      <InputNumber
        className="inputs w-full rounded-md"
        min={0}
        maxFractionDigits={2}
        max={1000000}
        placeholder="0.00"
        value={fromAmount}
        onChange={(e) => setFromAmount(e.value ?? 0)}
      />
      <div className="text-black self-start -mt-2 font-semibold relative">
        {loadingBalance && loadingAnimation()}
        <span
          className="cursor-pointer hover:text-primary hover:duration-300"
          onClick={() => setFromAmount(parseFloat(ownedAmount))}
        >
          Max :
        </span>
        <span>{ownedAmount}</span>
      </div>
      <InputText
        className="inputs w-full"
        placeholder="Destination Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <Button
        className="self-stretch action-btn"
        disabled={isBtnLocked}
        onClick={() => sendTokenHandler()}
      >
        {isBtnLocked && (
          <CgSpinner className="animate-spin absolute left-[30%] md:left-[40%]" />
        )}
        <span>Send</span>
      </Button>
      <TxStatusDialog
        txState={isModal}
        msgLink={blockHashRef.current as string}
        visible={isModal}
        onClose={setIsModal}
      />
    </React.Fragment>
  );
}

export default SendToken;
