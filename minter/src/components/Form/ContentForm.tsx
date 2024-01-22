import { RefObject } from "react";
import { pageTab } from "./types";
import SendToken from "../SendToken/SendToken";
import MintToken from "../MintToken/MintToken";
import { ethers } from "ethers";
import { Toast } from "primereact/toast";

function ContentForm({
  page,
  tokenMinted,
  contract,
  setTokenMinted,
  toast,
}: Iprops) {
  if (page === pageTab.mint)
    return (
      <MintToken
        contract={contract}
        setTokenMinted={setTokenMinted}
        toast={toast}
      />
    );
  else if (page === pageTab.send)
    return (
      <SendToken contract={contract} tokenMinted={tokenMinted} toast={toast} />
    );
}

export default ContentForm;

interface Iprops {
  setTokenMinted: (value: number) => void;
  page: pageTab;
  contract: ethers.Contract;
  toast: RefObject<Toast>;
  tokenMinted: number;
}
