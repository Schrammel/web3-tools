import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { IsHydratedProvider } from './IsHydratedProvider'
import { TransactionsProvider } from './TransactionsProvider'
import { WagmiProvider } from './WagmiProvider'

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <IsHydratedProvider>
      <TransactionsProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider>{children}</WagmiProvider>
        </QueryClientProvider>
      </TransactionsProvider>
    </IsHydratedProvider>
  )
}
