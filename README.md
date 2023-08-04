# Account Abstractions Starter

> NextJs monorepo for web3 account abstractions.

## Stack Features

- [Pnpm](https://pnpm.io/installation)
- [Turbo](https://turbo.build/repo/docs/)
- [Wagmi](https://wagmi.sh/core/getting-started)
- [Tailwind](https://tailwindcss.com/)
- [@tanstack/query](https://tanstack.com/query/v4)
- [Dnum](https://github.com/bpierre/dnum)

- [Zerodev](https://zerodev.app/)
  - [Web3Auth](https://web3auth.io/)
  - [Safe](https://safe.global/)
  - [Gelato](https://www.gelato.network/)

Options for complex components:
- [radix ui](https://www.radix-ui.com/)
- [headless ui](https://headlessui.com/)
- [jotai](jotai.org)

### Contracts

> See `contract.ts` and `abis.ts`, create a named export for each contract/abi instead of single export map, to ensure treeshaking works.

> Check `WagmiProvider` for the `zerodev` config of the **account abstractions** sdk used to creates a smart wallet, session keys, batch transactions and sponsors the gas.

### Setup

```sh
pnpm install
pnpm dev
```
### Build & Deploy

```sh
pnpm build
```

### Tests

## Community

Check out the following places for more content:

- Twitter [@ConcaveFi](https://twitter.com/ConcaveFi)
- Discord [concave](https://discord.gg/concave)

## License

[MIT](/LICENSE) License
