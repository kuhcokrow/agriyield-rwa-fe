import { createConfig, http } from 'wagmi'
import { chains } from './chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
  ],
  transports: {
    5003: http('https://rpc.sepolia.mantle.xyz'),
  },
})
