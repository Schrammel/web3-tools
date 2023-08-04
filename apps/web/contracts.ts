import { Chain, polygonMumbai } from '@wagmi/chains'
import { Abi, Address } from 'abitype'
import { nftAbi } from './abis'

type Contract = { abi: Abi; address: Record<Chain['id'], Address> }

export const sampleNft = {
  abi: nftAbi,
  address: {
    [polygonMumbai.id]: '0x34bE7f35132E97915633BC1fc020364EA5134863',
  },
} satisfies Contract
