import { Button } from "primereact/button";
import { CgSpinner } from "react-icons/cg";
import { IPropsSendBtn } from "./types";

function SendBtn({ isBtnLocked, sendTokenHandler }: IPropsSendBtn) {
  return (
    <Button
      className="relative flex self-stretch justify-center mt-2 md:mt-5 action-btn"
      disabled={isBtnLocked}
      onClick={() => sendTokenHandler()}
    >
      {isBtnLocked && (
        <CgSpinner className="animate-spin absolute left-[30%] md:left-[40%]" />
      )}
      <span>Send</span>
    </Button>
  );
}

export default SendBtn;
