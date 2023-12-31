import React, { useRef, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ethers } from "ethers";
import TxStatusDialog from "../TxStatusDialog/TxStatusDialog";
import { modalType } from "../../types/ModaStatus";
import { CgSpinner } from "react-icons/cg";
import { Iprops } from "./types";

function MintToken({ contract, toast, setTokenMinted }: Iprops) {
  const [mintAmount, setMintAmount] = useState(0);
  const [isBtnLocked, setIsBtnLocked] = useState(false);
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
    if (isBtnLocked) return;
    if (mintAmount === 0) {
      showAddressError("no Amount set");
      return;
    }
    try {
      setIsBtnLocked(true);

      const tx = await contract.mint(
        ethers.utils.parseEther(mintAmount.toString())
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
      setTokenMinted(mintAmount);
    } catch (e) {
      setIsBtnLocked(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      e.code === 4001 && setIsModal(modalType.failed);
    }
  };
  return (
    <React.Fragment>
      <h3 className="font-semibold text-black">Mint a number of Tokens</h3>
      <InputNumber
        className="w-full rounded-md inputs"
        min={0}
        maxFractionDigits={2}
        max={1000}
        placeholder="0.00"
        value={mintAmount === 0 ? null : mintAmount}
        onChange={(e) => setMintAmount(e.value ?? 0)}
      />
      <Button
        className="relative flex self-stretch justify-center mt-2 md:mt-5 action-btn"
        disabled={isBtnLocked}
        onClick={() => mintHandler()}
      >
        {isBtnLocked && (
          <CgSpinner className="animate-spin absolute left-[30%] md:left-[40%]" />
        )}
        <span>Mint</span>
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

export default MintToken;
