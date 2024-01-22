//@ts-ignore
import profileLogo from "@/assets/images/profile.jpg?w=40";
import React, { useEffect, useState } from "react";

//particle hooks
import { useAccount } from "@particle-network/connectkit";
import { useEthereum } from "@particle-network/auth-core-modal";

//custom hooks
import useBalance from "@/hooks/useBalance";

//types
import { Iprops } from "./types";
import { ethers } from "ethers";

//custom components
import DisconnectBtn from "./DisconnectBtn";

function Profile({ contract, provider }: Iprops) {
  const account = useAccount();
  const { address } = useEthereum();

  const userAddress = address || account;

  const { formatAccount, getUserBalance } = useBalance(
    userAddress as string,
    contract,
    provider as ethers.providers.Web3Provider
  );

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const [balanceToken, setBalanceToken] = useState("");

  useEffect(() => {
    getUserBalance(setBalanceToken, setBalance, setLoading);
  }, [getUserBalance]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute top-0 left-0 z-10 w-full h-full animate-pulse">
          <div className="w-full h-full opactiy-10 bg-slate-400"></div>
        </div>
      )}
      <div className="flex flex-col items-start w-full gap-3 px-2 py-5 text-black md:px-4">
        <div className="flex items-center gap-2 lg:block">
          <img className="w-10" src={profileLogo} alt="profile Avatar" />
          <h2>Account:</h2>
          <span className="block text-sm md:text-lg">
            {formatAccount(userAddress as string)}
          </span>
        </div>
        <div className="text-left">Balance :{balance} Goerli Eth</div>
        <div>Tokens owned :{balanceToken}</div>
        <div>Chain: Goerli</div>
        <DisconnectBtn />
      </div>
    </div>
  );
}

const ProfileComp = React.memo(Profile);

export default ProfileComp;
