import { modalType } from "../../types/ModaStatus";

export interface Iprops {
  txState: modalType;
  msgLink: string;
  visible: modalType;
  onClose(value: modalType): void;
}
