import { useRef, useState } from "react";
//prime components
import { Toast } from "primereact/toast";
//custom components
import { Button } from "primereact/button";
import ContentForm from "./ContentForm";
//types
import { Iprops, pageTab } from "./types";

function Form({ contract }: Iprops) {
  const toast = useRef<Toast>(null);

  const [page, setPage] = useState<pageTab>(pageTab.mint);
  const [tokenMinted, setTokenMinted] = useState(0);

  return (
    <div className="bg-white">
      <div className="mx-[1rem] md:mx-[3rem] pt-1 h-[18rem] mb-5 md:pt-2 flex flex-col items-center gap-4">
        {
          <ContentForm
            page={page}
            tokenMinted={tokenMinted}
            contract={contract}
            setTokenMinted={setTokenMinted}
            toast={toast}
          />
        }
      </div>
      <div className="flex justify-center gap-5">
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
