import { useTokenProvider } from "@/providers/TokenProvider";
import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";
import { formatEther } from "viem";
import CommentSection from "./CommentSection";
import truncated from "@/lib/truncated";

interface MetaAndCommentsProps {
  priceHidden?: boolean;
  commentsHidden?: boolean;
}

const MetaAndComments = ({
  priceHidden = false,
  commentsHidden = false,
}: MetaAndCommentsProps) => {
  const { saleConfig, metadata } = useTokenProvider();
  const { data, isLoading } = saleConfig;
  const { data: meta } = metadata;

  if (!meta) return <Fragment />;

  return (
    <div className="w-full md:max-w-[400px] h-fit">
      <h3 className="text-4xl md:text-5xl font-spectral pt-2 md:pt-4">
        {truncated(meta.name)}
      </h3>
      {!priceHidden && (
        <>
          <div className="space-y-1 md:space-y-2 mt-2 md:mt-4">
            <p className="font-archivo text-sm md:text-lg">
              moment collection price
            </p>
            {isLoading ? (
              <Skeleton className="w-full h-6" />
            ) : (
              <p className="w-2/3 md:w-full font-archivo text-sm md:text-base border border-black rounded-md text-center bg-tan-secondary">
                {data?.pricePerToken === BigInt(0)
                  ? "free"
                  : `${formatEther(BigInt(data?.pricePerToken || 0))} eth`}
              </p>
            )}
          </div>
        </>
      )}
      {!commentsHidden && <CommentSection />}
    </div>
  );
};

export default MetaAndComments;
