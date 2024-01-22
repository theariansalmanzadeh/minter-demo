import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React from "react";
import { IPorpsInputs } from "./types";

function Inputs({
  fromAmount,
  toAddress,
  ownedAmount,
  loadingBalance,
  setFromAmount,
  setToAddress,
}: IPorpsInputs) {
  const loadingAnimation = () => (
    <div className="h-full w-[8rem] z-10 animate-pulse absolute top-0 left-0">
      <div className="w-full h-full rounded-md bg-slate-400"></div>
    </div>
  );
  return (
    <div>
      <InputNumber
        className="w-full rounded-md inputs"
        min={0}
        maxFractionDigits={2}
        max={1000000}
        placeholder="0.00"
        value={fromAmount}
        onChange={(e) => setFromAmount(e.value ?? 0)}
      />
      <div className="relative self-start -mt-2 font-semibold text-black">
        {loadingBalance && loadingAnimation()}
        <span
          className="cursor-pointer hover:text-primary hover:duration-300"
          onClick={() => setFromAmount(parseFloat(ownedAmount))}
        >
          Max :
        </span>
        <span>{ownedAmount}</span>
      </div>
      <InputText
        className="w-full inputs"
        placeholder="Destination Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
    </div>
  );
}

export default Inputs;
