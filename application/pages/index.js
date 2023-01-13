import {
  useContract,
  useNFTs,
  Web3sdksNftMedia,
  Web3Button,
} from "@web3sdks/react";

const contractAddress = "0xFA4811420E8502719F86DD04473eB2B7dFB6C828";

export default function Home() {
  const { contract } = useContract(contractAddress);
  const { data: nfts, isLoading: isReadingNfts } = useNFTs(contract);

  return (
    <div>
      <h2>My NFTs</h2>
      {isReadingNfts ? (
        <p>Loading...</p>
      ) : (
        <div>
          {nfts.map((nft) => (
            <>
              <Web3sdksNftMedia
                key={nft.tokenId}
                metadata={nft.metadata}
                height={200}
              />
              <h3>{nft.metadata.name}</h3>
            </>
          ))}
        </div>
      )}

      <Web3Button
        contractAddress={contractAddress}
        action={(contract) =>
          contract.erc721.mint({
            name: "Hello world!",
          })
        }
      >
        Mint NFT
      </Web3Button>
    </div>
  );
}
