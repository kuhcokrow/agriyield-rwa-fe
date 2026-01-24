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
    [chains[0].id]: http(),
    [chains[1].id]: http(),
    [chains[2].id]: http(),
    [chains[3].id]: http(),
    [chains[4].id]: http(),
  },
})
