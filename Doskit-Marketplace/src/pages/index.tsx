import type { NextPage } from "next";
import {
  useActiveListings,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import Link from "next/link";
import NFTCard from "../components/NFTCard";

const Home: NextPage = () => {
  const address = useAddress();

  const { contract } = useContract(
    '0x675295C86E2e52Af2Efd74dA610ac8E9713a3944',
    'marketplace'
  );

  const { data: nfts, isLoading } = useActiveListings(contract);

  if (isLoading)
    return (
      <div className={"mb-3 flex w-screen justify-center"}>Loading ...</div>
    );

  return (
    <div className={"space-y-4 p-2"}>
      <div className={"flex space-x-4"}>
        <div className={"text-2xl font-semibold"}>Doskit</div>
        <Link href={`profile/${address}`}>
          <div className={"cursor-pointer text-2xl font-semibold"}>
            Marketplace
          </div>
        </Link>
      </div>
      <div className={`nft-grid`}>
        {nfts &&
          nfts.map((nft) => {
            return (
              <Link
                href={`/assets/${nft.id}`}
                key={nft.assetContractAddress + nft.id}
              >
                
                  <NFTCard
                    nft={{
                      name: nft.asset.name as string,
                      tokenUri: nft.asset.image as string,
                      price: nft.buyoutCurrencyValuePerToken?.displayValue,
                    }}
                  />
                
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
