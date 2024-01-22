import { Toast } from "primereact/toast";
import { RefObject } from "react";

function useShowToast(toast: Iprops["toast"]) {
  function showAddressError(msg: string) {
    if (toast.current === null) return;
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 20000,
    });
  }
  return {
    showAddressError,
  };
}

export default useShowToast;

interface Iprops {
  toast: RefObject<Toast>;
}
