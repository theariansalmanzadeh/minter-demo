import React, { useRef, useState } from "react";

//prime components
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { CgSpinner } from "react-icons/cg";

//types
import { Iprops } from "./types";
import { modalType } from "../../types/ModaStatus";

//custom hooks
import useTrasaction from "@/hooks/useTrasaction";
import useShowToast from "@/hooks/useShowToast";

//component
import TxStatusDialog from "../TxStatusDialog/TxStatusDialog";

function MintToken({ contract, toast, setTokenMinted }: Iprops) {
  const { mintHandler } = useTrasaction();
  const { showAddressError } = useShowToast(toast);

  const [mintAmount, setMintAmount] = useState(0);
  const [isBtnLocked, setIsBtnLocked] = useState(false);
  const [isModal, setIsModal] = useState<modalType>(modalType.idle);

  const blockHashRef = useRef<string | null>(null);

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
        onClick={() =>
          mintHandler(
            showAddressError,
            setTokenMinted,
            setIsBtnLocked,
            setIsModal,
            isBtnLocked,
            mintAmount,
            contract,
            blockHashRef
          )
        }
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
