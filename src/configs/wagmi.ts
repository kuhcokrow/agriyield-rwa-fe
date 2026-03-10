import { createConfig, http } from 'wagmi'
import { mantleSepolia } from './chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mantleSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
  ],
  transports: {
    [mantleSepolia.id]: http('https://rpc.sepolia.mantle.xyz'),
  },
})
