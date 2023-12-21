import React, { RefObject, useRef, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ethers } from "ethers";
import TxStatusDialog from "../TxStatusDialog/TxStatusDialog";
import { modalType } from "../../types/ModaStatus";

function MintToken({ contract, toast, setTokenMinted }: Iprops) {
  const [mintAmount, setMintAmount] = useState(0);
  const [isModal, setIsModal] = useState<modalType>(modalType.idle);
  const blockHashRef = useRef<string | null>(null);
  const showAddressError = (msg: string) => {
    if (toast.current === null) return;
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 20000,
    });
  };

  const mintHandler = async () => {
    if (mintAmount === 0) {
      showAddressError("no Amount set");
      return;
    }
    try {
      const tx = await contract.mint(
        ethers.utils.parseEther(mintAmount.toString())
      );
      setIsModal(modalType.ongiong);
      const res = await tx.wait();
      console.log(res);
      if (res.status === 1) {
        setIsModal(modalType.success);
        blockHashRef.current = res.blockHash;
      } else if (res.status === 0) {
        blockHashRef.current = res.transactionHash;
        setIsModal(modalType.failed);
      }
      setTokenMinted(mintAmount);
    } catch (e) {
      console.log(e);

      setIsModal(modalType.failed);
    }
  };
  return (
    <React.Fragment>
      <h3 className="font-semibold text-black">Mint a number of Tokens</h3>
      <InputNumber
        className="inputs w-full rounded-md"
        min={0}
        maxFractionDigits={2}
        max={1000}
        placeholder="0.00"
        value={mintAmount === 0 ? null : mintAmount}
        onChange={(e) => setMintAmount(e.value ?? 0)}
      />
      <Button
        className="mt-2 md:mt-5 self-stretch action-btn"
        label="Mint"
        onClick={() => mintHandler()}
      />
      <TxStatusDialog
        txState={isModal}
        msgLink={blockHashRef.current as string}
        visible={isModal}
        onClose={setIsModal}
      />
    </React.Fragment>
  );
}

export default MintToken;

interface Iprops {
  contract: ethers.Contract;
  toast: RefObject<Toast>;
  setTokenMinted: (value: number) => void;
}
