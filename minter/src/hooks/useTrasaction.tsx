import { useAuthCore } from "@particle-network/auth-core-modal";
import { sendTxWithParticle } from "@/utils/transaction";
import { useEthereum } from "@particle-network/auth-core-modal";

import { ethers } from "ethers";
import { modalType } from "@/types/ModaStatus";
import { MutableRefObject } from "react";

function useTrasaction() {
  const { provider, address, sendTransaction } = useEthereum();
  const auth = useAuthCore();

  const mintHandler = async (
    showAddressError: ImintHandler["showAddressError"],
    setTokenMinted: ImintHandler["setTokenMinted"],
    setIsBtnLocked: ImintHandler["setIsBtnLocked"],
    setIsModal: ImintHandler["setIsModal"],
    isBtnLocked: ImintHandler["isBtnLocked"],
    mintAmount: ImintHandler["mintAmount"],
    contract: ImintHandler["contract"],
    blockHashRef: ImintHandler["blockHashRef"]
  ) => {
    if (isBtnLocked) return;
    if (mintAmount === 0) {
      showAddressError("no Amount set");
      return;
    }
    executeMint(
      setIsBtnLocked,
      contract,
      mintAmount,
      setTokenMinted,
      blockHashRef,
      setIsModal
    );
  };

  async function executeMint(
    setIsBtnLocked: IexecuteMint["setIsBtnLocked"],
    contract: IexecuteMint["contract"],
    mintAmount: IexecuteMint["mintAmount"],
    setTokenMinted: IexecuteMint["setTokenMinted"],
    blockHashRef: IexecuteMint["blockHashRef"],
    setIsModal: IexecuteMint["setIsModal"]
  ) {
    try {
      if (!auth.userInfo) {
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
      } else {
        if (address && auth) {
          console.log("ok");

          await sendTxWithParticle(
            sendTransaction,
            contract,
            address,
            mintAmount,
            provider
          );
        }
      }
    } catch (e) {
      console.log(e);

      setIsBtnLocked(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      e.code === 4001 && setIsModal(modalType.failed);
    }
  }
  return { executeMint, mintHandler };
}

export default useTrasaction;

interface IexecuteMint {
  setIsBtnLocked: (value: boolean) => void;
  setIsModal: (value: modalType) => void;
  setTokenMinted: (value: number) => void;
  contract: ethers.Contract;
  mintAmount: number;
  blockHashRef: MutableRefObject<string | null>;
}

interface ImintHandler extends IexecuteMint {
  showAddressError: (value: string) => void;
  isBtnLocked: boolean;
}
