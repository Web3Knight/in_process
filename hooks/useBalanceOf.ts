import { getPublicClient } from "@/lib/viem/publicClient";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { useEffect, useState } from "react";
import { Address } from "viem";

const useBalanceOf = () => {
  const [balanceOf, setBalanceOf] = useState<number>(0);
  const { token } = useTokenProvider();
  const { connectedAddress } = useUserProvider();

  useEffect(() => {
    const getBalanceOf = async () => {
      const publicClient = getPublicClient();
      const response = await publicClient.readContract({
        address: token.tokenContractAddress as Address,
        abi: zoraCreator1155ImplABI,
        functionName: "balanceOf",
        args: [connectedAddress as Address, BigInt(token.tokenId)],
      });

      setBalanceOf(parseInt(response.toString(), 10));
    };
    if (token && connectedAddress) getBalanceOf();
  }, [token, connectedAddress]);

  return {
    balanceOf,
  };
};

export default useBalanceOf;
