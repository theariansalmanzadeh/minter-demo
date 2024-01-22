/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

export const sendTxWithParticle = async (
  sendTransaction: (value: any) => Promise<string>,
  contract: ethers.Contract,
  userAddress: string,
  amount: number,
  provider: any
) => {
  const method = "particle_abi_encodeFunctionCall";
  const params = [
    contract.address,
    "custom_mint",
    [ethers.utils.parseEther(amount.toString())],
  ];

  console.log(userAddress);

  const result = await provider.request({
    method,
    params,
    from: userAddress,
    chainId: 5,
  });

  const txHash = await sendTransaction({
    to: contract.address,
    value: "0x0",
    data: result,
    chainId: 5,
    gasLevel: "high",
  });
  console.log(txHash);
};
