import type { NextPage } from "next";
import { ConnectWallet, useActiveListings, useAddress, useContract } from "@thirdweb-dev/react";
import Link from "next/link";
import NFTCard from "../components/NFTCard";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract('0x675295C86E2e52Af2Efd74dA610ac8E9713a3944', 'marketplace');
  const { data: nfts, isLoading } = useActiveListings(contract);

  if (isLoading)
    return (
      <div className="mb-3 flex w-screen justify-center">Loading ...</div>
    );

  return (
<div className="p-2">
  <nav className="flex items-center justify-between px-6 py-3 bg-gray-800">
    <div className="flex items-center">
      <img src="" alt="Logo" />
      <h1 className="text-2xl font-semibold text-white ml-2">Doskit Marketplace</h1>
    </div>
    <div className="flex">
      <ConnectWallet />
    </div>
  </nav>
  <main className="min-h-screen">
    <div className={`nft-grid`}>
      <div className="flex flex-wrap">
        {nfts &&
          nfts.map((nft, index) => {
            return (
              <Link
                href={`/assets/${nft.id}`}
                key={nft.assetContractAddress + nft.id}
              >
                <div className="w-3/3">
                  <NFTCard
                    nft={{
                      name: nft.asset.name as string,
                      tokenUri: nft.asset.image as string,
                      price: nft.buyoutCurrencyValuePerToken?.displayValue,
                    }}
                  />
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  </main>
  <footer className="h-16 bg-gray-800 text-white text-center">
    <p>Copyright © Doskit Marketplace 2023. Built by Kazeem Dosunmu.</p>
  </footer>
</div>

  );
};

export default Home;