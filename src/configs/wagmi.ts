import { createConfig, http } from 'wagmi'
import { mantleSepolia } from './chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mantleSepolia],
  connectors: [injected()],
  transports: {
    [mantleSepolia.id]: http('https://rpc.sepolia.mantle.xyz'),
  },
})
