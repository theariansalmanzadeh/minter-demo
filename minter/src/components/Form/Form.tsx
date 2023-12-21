import { useRef, useState } from "react";
import { pageTab } from "./types";
import { Button } from "primereact/button";
import MintToken from "../MintToken/MintToken";
import SendToken from "../SendToken/SendToken";
import { Toast } from "primereact/toast";
import { ethers } from "ethers";

function Form({ contract }: Iprops) {
  const toast = useRef<Toast>(null);
  const [page, setPage] = useState(pageTab.mint);
  const [tokenMinted, setTokenMinted] = useState(0);

  const content = () => {
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
        <SendToken
          contract={contract}
          tokenMinted={tokenMinted}
          toast={toast}
        />
      );
  };

  return (
    <div className="bg-white">
      <div className="mx-[1rem] md:mx-[3rem] pt-1 h-[18rem] mb-5 md:pt-2 flex flex-col items-center gap-4">
        {content()}
      </div>
      <div className="flex gap-5 justify-center">
        <Button
          className="nav-btn"
          disabled={page === pageTab.mint}
          onClick={() => page === pageTab.send && setPage(pageTab.mint)}
        >
          Prev
        </Button>
        <Button
          className="nav-btn"
          disabled={page === pageTab.send}
          onClick={() => page === pageTab.mint && setPage(pageTab.send)}
        >
          Next
        </Button>
      </div>
      <Toast
        ref={toast}
        pt={{
          root: { className: "rounded-lg" },
          message: { className: "bg-red-300" },
          content: { className: "text-red-500" },
          icon: { className: "w-10 h-10 self-center" },
        }}
      />
    </div>
  );
}

export default Form;

interface Iprops {
  contract: ethers.Contract;
}
