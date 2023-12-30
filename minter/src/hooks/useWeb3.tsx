import { useEffect, useMemo } from "react";
import {
  useConnectKit,
  useParticleProvider,
} from "@particle-network/connectkit";
import { useEthereum } from "@particle-network/auth-core-modal";
import { isEVMProvider } from "@particle-network/connectors";
import { contractAddress } from "../assets/content/content.ts";
import contAbi from "../assets/data/tokenMinterAbi.json";
import { EthereumGoerli } from "@particle-network/chains";
import { ethers } from "ethers";

function useWeb3() {
  const { provider: authProvider, address } = useEthereum();
  const particleProvider = useParticleProvider();
  const connectKit = useConnectKit();
  connectKit.on("chainChanged", (chain) => {
    if (chain != undefined && chain.id !== 5)
      connectKit.switchChain(EthereumGoerli);
  });

  const provider = useMemo(() => {
    if (particleProvider === undefined && authProvider === undefined) return;
    if (particleProvider && isEVMProvider(particleProvider))
      return new ethers.providers.Web3Provider(particleProvider);
    else if (authProvider && isEVMProvider(authProvider))
      return new ethers.providers.Web3Provider(authProvider);
  }, [particleProvider, authProvider]);

  const signer = useMemo(() => {
    if (!provider) return;

    return provider.getSigner();
  }, [provider]);
  const contract = useMemo(
    () => new ethers.Contract(contractAddress, contAbi, signer),
    [signer]
  );

  useEffect(() => {
    (async () => {
      const chain = await provider?.getNetwork();
      if (chain?.chainId !== 5) connectKit.switchChain(EthereumGoerli);
    })();
  }, [provider, connectKit]);
  return {
    address,
    contract,
    provider,
    signer,
  };
}

export default useWeb3;
