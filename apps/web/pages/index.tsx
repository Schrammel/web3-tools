import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useIsHydrated } from 'components/providers/IsHydratedProvider'
import { useAddRecentTransaction } from 'components/providers/TransactionsProvider'
import { sampleNft } from 'contracts'
import { useState } from 'react'
import { format } from 'utils/format'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

function MintNft() {
  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    address: sampleNft.address[polygonMumbai.id],
    chainId: polygonMumbai.id,
    abi: sampleNft.abi,
    functionName: 'mint',
    args: [address!],
  })
  const addTx = useAddRecentTransaction()
  const [isMinting, setMinting] = useState(false)
  const { refetch } = useSampleNFTBalance()
  const { write: mint } = useContractWrite({
    ...config,
    chainId: polygonMumbai.id,
    onMutate() {
      setMinting(true)
    },
    onSuccess(tx) {
      tx.wait().then((param: any) => {
        setMinting(false)
        refetch()
        addTx({
          hash: param.bundleTransactionHash as `0x${string}`,
          meta: { type: 'mint', name: 'Sample Nft' },
        })
      })
    },
  })

  return (
    <button
      disabled={true}
      onClick={() => mint?.()}
      className="bg-primary disabled:text-grey-500 disabled:bg-grey-200 rounded-xl px-4 py-2 font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:shadow-none disabled:hover:scale-100"
    >
      {isMinting ? 'Minting...' : 'Mint SampleNFT'}
    </button>
  )
}

const useSampleNFTBalance = () => {
  const { address } = useAccount()
  return useContractRead({
    abi: sampleNft.abi,
    address: sampleNft.address[polygonMumbai.id],
    args: [address!],
    chainId: polygonMumbai.id,
    functionName: 'balanceOf',
    select: (b) => [b.toBigInt(), 0] as const,
  })
}

function YourSampleNfts() {
  const { address } = useAccount()
  const { data: balance } = useSampleNFTBalance()

  return (
    <a
      className="flex gap-2 rounded-xl p-2 pr-3 transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
      href={`https://mumbai.polygonscan.com/token/0x34be7f35132e97915633bc1fc020364ea5134863?a=${address}`}
    >
      <div className="bg-grey-200 h-8 w-8 rounded-lg" />
      <div className="flex flex-col">
        <span className="text-xs font-medium">SampleNFT</span>
        <span className="text-grey-500 font-mono text-xs">
          You own {format(balance, { digits: 0 })}
        </span>
      </div>
    </a>
  )
}

export default function Page() {
  const isHydrated = useIsHydrated()
  const { isConnected } = useAccount()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 p-4">
      <ConnectButton />
      {isHydrated && isConnected && (
        <>
          <MintNft />
          <YourSampleNfts />
        </>
      )}
    </div>
  )
}
