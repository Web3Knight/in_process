import { CHAIN_ID } from "../consts";
import { DuneDecodedEvent } from "@/types/dune";
import getSmartWallet from "../getSmartWallet";
import { MINT_COMMENT_EVENT_SIGNATURE } from "../events";

const getCrossmintCommentEvents = async (
  tokenContract: string,
): Promise<DuneDecodedEvent[]> => {
  const smartWallet = await getSmartWallet();
  if (!smartWallet) return [];
  const options = {
    method: "GET",
    headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
  };
  const params: any = {
    decode: "true",
    chain_ids: `${CHAIN_ID}`,
    topic0: MINT_COMMENT_EVENT_SIGNATURE,
    log_address: tokenContract,
  };

  const urlSearchParams = new URLSearchParams(params);

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/0xa105C311fA72b8Fb78c992EcbDb8b02Ea5bd394d?${urlSearchParams}`,
    options,
  );
  if (!response.ok) throw Error("failed to call Dune API.");

  const data = await response.json();
  const transactions: DuneDecodedEvent[] = data.transactions;
  return transactions;
};

export default getCrossmintCommentEvents;
