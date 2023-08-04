import { connectorsForWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, Provider } from '@wagmi/core'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { SocialWalletConnectorOptions } from '@zerodevapp/wagmi/dist/connectors/AbstractSocialWalletConnector'
import {
  discordWallet,
  enhanceWalletWithAAConnector,
  githubWallet,
  googleWallet,
  twitterWallet,
} from '@zerodevapp/wagmi/rainbowkit'
import { multicallProvider } from 'multicall-provider/wagmi'
import { PropsWithChildren } from 'react'
import { createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

const {
  chains,
  provider: _provider,
  webSocketProvider,
} = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: 'Kng1p_dEJaldM51_qK6aqP9YvBY0cVxf' })],
)

const appName = 'Starter App'
const AA_Options = {
  projectId: 'f1d73987-30a5-4fce-b3cc-343c339095de',
} satisfies SocialWalletConnectorOptions

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({ chains }),
      // rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ chains, appName }),
      safeWallet({ chains }),
    ].map((wallet) => enhanceWalletWithAAConnector(wallet, AA_Options)),
  },
  {
    groupName: 'Social',
    wallets: [
      googleWallet({ options: AA_Options }),
      githubWallet({ options: AA_Options }),
      discordWallet({ options: AA_Options }),
      twitterWallet({ options: AA_Options }),
    ],
  },
])

export type SupportedChainId = (typeof chains)[number]['id']

const provider = multicallProvider(_provider, { timeWindow: 50, batchSize: 500, logs: true })
const singleton_providers: Record<number, Provider> = {}
export const getProvider = ({ chainId }: { chainId: number }) => {
  if (!singleton_providers[chainId]) singleton_providers[chainId] = provider({ chainId })
  return singleton_providers[chainId]
}

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export function WagmiProvider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={{
          ...lightTheme(),
          fonts: { body: 'var(--font-sans)' },
        }}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
