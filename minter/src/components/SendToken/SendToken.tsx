import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "@particle-network/connectkit";
import { useEthereum } from "@particle-network/auth-core-modal";
import { isAddressValid } from "@/utils/web3";
import TxStatusDialog from "../TxStatusDialog/TxStatusDialog";
import { modalType } from "../../types/ModaStatus";
import { Iprops } from "./types";
import Inputs from "./Inputs";
import useShowToast from "@/hooks/useShowToast";
import useBalance from "@/hooks/useBalance";
import SendBtn from "./SendBtn";

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
  const { showAddressError } = useShowToast(toast);

  const userAddress = (account || address) ?? "";
  const { getUserBalanceTokens } = useBalance(userAddress, contract);

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
      setIsBtnLocked(true);
      const tx = await contract.transfer(
        toAddress,
        ethers.utils.parseEther(fromAmount.toString())
      );
      setIsModal(modalType.ongiong);
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

  useEffect(() => {
    getUserBalanceTokens(setLoadingBalance, setOwnedAmount, userAddress);
  }, [userAddress, getUserBalanceTokens]);
  return (
    <React.Fragment>
      <h3 className="font-semibold text-black">Send Token to a adress</h3>
      <Inputs
        fromAmount={fromAmount}
        toAddress={toAddress}
        ownedAmount={ownedAmount}
        loadingBalance={loadingBalance}
        setFromAmount={setFromAmount}
        setToAddress={setToAddress}
      />
      <SendBtn isBtnLocked={isBtnLocked} sendTokenHandler={sendTokenHandler} />
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
