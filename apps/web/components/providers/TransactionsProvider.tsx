'use client'

import { PropsWithChildren } from 'react'

import {
  StoredTransaction,
  ToastsViewport,
  TransactionStatusToastProps,
  TransactionsStoreProvider,
  TypedUseAddRecentTransaction,
  TypedUseRecentTransactions,
  useAddRecentTransaction as _useAddRecentTransaction,
  useRecentTransactions as _useRecentTransactions,
  createTransactionsStore,
} from '@pcnv/txs-react'

import { EmojiToast } from '@pcnv/txs-react/toasts/EmojiToast'
import '@pcnv/txs-react/toasts/EmojiToast/styles.css'

type TransactionMetaToStatusLabel = {
  [Meta in TransactionType as Meta['type']]: (
    meta: Omit<Meta, 'type'>,
  ) => Record<StoredTransaction['status'], string>
}

const transactionsStore = createTransactionsStore()

type TransactionType = { type: 'mint'; name: string }

const typeToStatusDescription = {
  mint: ({ name }) => ({
    pending: `Minting ${name}`,
    confirmed: `Successfully minted ${name}`,
    failed: `Failed to mint ${name}`,
  }),
} satisfies TransactionMetaToStatusLabel

function Toast(props: TransactionStatusToastProps<TransactionType>) {
  const { meta, status } = props.transaction
  const description = typeToStatusDescription[meta.type](meta)[status]
  return <EmojiToast {...props} colorScheme="light" description={description} />
}

export const useRecentTransactions: TypedUseRecentTransactions<TransactionType> =
  _useRecentTransactions
export const useAddRecentTransaction: TypedUseAddRecentTransaction<TransactionType> =
  _useAddRecentTransaction

export function TransactionsProvider({ children }: PropsWithChildren) {
  return (
    <TransactionsStoreProvider store={transactionsStore}>
      <ToastsViewport TransactionStatusComponent={Toast} placement="top-end" />
      {children}
    </TransactionsStoreProvider>
  )
}
