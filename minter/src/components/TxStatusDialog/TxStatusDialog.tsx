import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { modalType } from "../../types/ModaStatus";
import {
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Chip } from "primereact/chip";

function TxStatusDialog({
  txState,
  msgLink,
  visible,
  onClose,
}: {
  txState: modalType;
  msgLink: string;
  visible: modalType;
  onClose(value: modalType): void;
}) {
  const borderColor = (status: modalType) => {
    switch (status) {
      case modalType.success:
        return "border-green-500";
      case modalType.failed:
        return "border-red-500";
      case modalType.ongiong:
        return "border-slate-600";
    }
  };

  const content = () => {
    if (txState === modalType.ongiong) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h5 className="text-center">Trasaction status</h5>
          <div className="my-10">
            <ProgressSpinner />
          </div>
          <p>Transaction {txState}</p>
        </div>
      );
    } else if (txState === modalType.failed || txState === modalType.success) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h5 className="text-center">Trasaction status</h5>
          <div className="mt-10">
            <p className="text-center">Transaction {txState}</p>
          </div>
          {txState === modalType.success ? (
            <FaRegCheckCircle className="mt-5 text-green-500" size={70} />
          ) : (
            <FaRegTimesCircle className="mt-5 text-red-700" size={70} />
          )}
          <Chip
            label="see Tx"
            className="mt-3 bg-slate-400 py-1 px-4 rounded-2xl cursor-pointer"
            icon={<FaExternalLinkAlt className="mr-3" />}
            onClick={() => {
              window.open(
                `https://goerli.etherscan.io/tx/${msgLink}`,
                "_blank",
                "noreferrer"
              );
            }}
          />
        </div>
      );
    }
  };

  return (
    <Dialog
      visible={visible !== modalType.idle}
      draggable={false}
      resizable={false}
      dismissableMask={true}
      className={`w-5/6 md:w-4/6 lg:w-2/6 h-[20rem] bg-slate-500 border-2 backdrop-blur-md rounded-md ${borderColor(
        txState
      )}`}
      onHide={() => {
        onClose(modalType.idle);
      }}
      pt={{
        mask: { className: "backdrop-blur-sm" },
      }}
    >
      {content()}
    </Dialog>
  );
}

export default TxStatusDialog;
