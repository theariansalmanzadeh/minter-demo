//@ts-ignore
import profileLogo from "../../assets/images/profile.jpg?w=40";
import { Button } from "primereact/button";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useAccount, useParticleConnect } from "@particle-network/connectkit";
import { useEthereum } from "@particle-network/auth-core-modal";
import { useConnect } from "@particle-network/auth-core-modal";
import { formatBalance } from "../../utils/web3";
import { Iprops } from "./types";

function Profile({ contract, provider }: Iprops) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const [balanceToken, setBalanceToken] = useState("");
  const account = useAccount();
  const { address } = useEthereum();
  const particleConnect = useParticleConnect();
  const { disconnect } = useConnect();
  const userAddress = address || account;

  const getUserBalance = useCallback(async () => {
    if (provider === undefined) return;
    setLoading(true);
    try {
      const _balance = await provider.getBalance(userAddress as string);
      const _balToken = await contract.balanceOf(userAddress);
      console.log(_balToken);

      setBalance(formatBalance(_balance));
      setBalanceToken(formatBalance(_balToken));
    } catch (e) {
      setLoading(false);
    }
    setLoading(false);
  }, [provider, userAddress, contract]);

  const formatAccount = (address: string) =>
    `${address.slice(0, 5)}...${address.slice(-4)}`;

  useEffect(() => {
    getUserBalance();
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
        <Button
          className="self-stretch justify-center gap-2 mt-10 text-white bg-red-900"
          onClick={() => {
            disconnect();
            particleConnect.disconnect();
          }}
        >
          Disconnect
          <AiOutlineDisconnect size={24} />
        </Button>
      </div>
    </div>
  );
}

const ProfileComp = React.memo(Profile);

export default ProfileComp;
