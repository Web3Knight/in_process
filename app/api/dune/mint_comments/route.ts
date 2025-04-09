import getCrossmintCommentEvents from "@/lib/dune/getCrossmintCommentEvents";
import getSmartWalletMintCommentEvents from "@/lib/dune/getSmartWalletMintCommentEvents";
import getTokenContractMintCommentEvents from "@/lib/dune/getTokenContractMintCommentEvents";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const tokenContract = req.nextUrl.searchParams.get("tokenContract");
  const tokenId = req.nextUrl.searchParams.get("tokenId");

  try {
    const tokenContractEvents: DuneDecodedEvent[] =
      await getTokenContractMintCommentEvents(tokenContract as string);
    const smartWalletEvents: DuneDecodedEvent[] =
      await getSmartWalletMintCommentEvents(tokenContract as string);
    const crossmintEvents: DuneDecodedEvent[] = await getCrossmintCommentEvents(
      tokenContract as string,
    );
    const formattedEvents = [
      ...tokenContractEvents,
      ...smartWalletEvents,
      ...crossmintEvents,
    ].map((transaction: DuneDecodedEvent) => {
      const mintCommentEvent = transaction.logs.find(
        (log) => log?.decoded?.name === "MintComment",
      );
      if (!mintCommentEvent) return;
      const data: any = {
        chainId: transaction.chain_id,
        chain: transaction.chain,
      };
      mintCommentEvent?.decoded?.inputs.forEach((input) => {
        data[`${input.name}`] = input.value;
      });
      data.timestamp = new Date(transaction.block_time).getTime();
      data.blockNumber = transaction.block_number;
      data.transactionHash = transaction.hash;
      return data;
    });
    return Response.json(
      tokenId
        ? formattedEvents.filter((e) => e.tokenId === tokenId)
        : formattedEvents,
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
