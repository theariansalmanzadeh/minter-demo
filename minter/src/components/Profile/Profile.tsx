import { ethers } from "ethers";
import profileLogo from "../../assets/images/profile.jpg";
import { Button } from "primereact/button";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useAccount, useParticleConnect } from "@particle-network/connectkit";
import { useEthereum } from "@particle-network/auth-core-modal";
import { useConnect } from "@particle-network/auth-core-modal";
import { formatBalance } from "../../utils/web3";

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
    <div className="h-full w-full relative">
      {loading && (
        <div className="h-full w-full z-10 animate-pulse absolute top-0 left-0">
          <div className="opactiy-10 bg-slate-400 h-full w-full"></div>
        </div>
      )}
      <div className="w-full flex flex-col items-start gap-3 py-5 px-2 md:px-4 text-black">
        <div className="flex lg:block items-center gap-2">
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
          className="mt-10 self-stretch bg-red-900 text-white justify-center gap-2"
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

interface Iprops {
  provider: ethers.providers.Web3Provider | undefined;
  contract: ethers.Contract;
}
