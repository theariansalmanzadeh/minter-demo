import { useCallback } from "react";
import { formatBalance } from "../utils/web3";
import { ethers } from "ethers";

function useBalance(
  userAddress: IProps["userAddress"],
  contract: IProps["contract"],
  provider: IProps["provider"] = undefined
) {
  function formatAccount(address: string) {
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  }

  const getUserBalance = useCallback(
    async (
      setBalanceToken: IBalanceCoin["setBalanceToken"],
      setBalance: IBalanceCoin["setBalance"],
      setLoading: IBalanceCoin["setLoading"]
    ) => {
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
    },
    [provider, userAddress, contract]
  );

  const getUserBalanceTokens = useCallback(
    async (
      setLoadingBalance: IBalanceToken["setLoadingBalance"],
      setOwnedAmount: IBalanceToken["setOwnedAmount"],
      address: IBalanceToken["address"]
    ) => {
      setLoadingBalance(true);
      try {
        const _bal = await contract.balanceOf(address);
        setOwnedAmount(formatBalance(_bal));
        setLoadingBalance(false);
      } catch (e) {
        setLoadingBalance(false);
      }
    },
    [contract]
  );

  return {
    formatAccount,
    getUserBalance,
    getUserBalanceTokens,
  };
}

export default useBalance;

interface IProps {
  userAddress: string;
  contract: ethers.Contract;
  provider: ethers.providers.Web3Provider | undefined;
}

interface IBalanceCoin {
  setBalanceToken: (value: string) => void;
  setBalance: (value: string) => void;
  setLoading: (value: boolean) => void;
}

interface IBalanceToken {
  setLoadingBalance: (value: boolean) => void;
  setOwnedAmount: (value: string) => void;
  address: string;
}
