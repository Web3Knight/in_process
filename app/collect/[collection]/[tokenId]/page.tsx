import TokenPage from "@/components/TokenPage";
import { APP_URL, VERCEL_OG } from "@/lib/consts";
import { Metadata, NextPage } from "next";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collection } = await params;
  // eslint-disable-next-line
  const [_, address] = collection.split("%3A");
  const data = await fetch(
    `${VERCEL_OG}/api/token/metadata?collection=${address}&tokenId=${tokenId}`,
  ).then((res) => res.json());

  const title = data.metadata?.name || "In Process";
  const description = data.metadata?.description || "Imagined by LATASHÁ";

  const frame = {
    version: "next",
    imageUrl: `${VERCEL_OG}/api/og/token?collection=${address}&tokenId=${tokenId}`,
    aspectRatio: "3:2",
    button: {
      title: "Collect",
      action: {
        type: "launch_frame",
        name: "In Process",
        url: `${APP_URL}/collect/${collection}/${tokenId}`,
        iconImageUrl: `${VERCEL_OG}/api/og/token?collection=${address}&tokenId=${tokenId}`,
        splashImageUrl: `${VERCEL_OG}/desktop_footer_logo.png`,
        splashBackgroundColor: "#e9ccbb",
      },
    },
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        `${VERCEL_OG}/api/og/token?collection=${address}&tokenId=${tokenId}`,
      ],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

const Token: NextPage = () => <TokenPage />;

export default Token;
