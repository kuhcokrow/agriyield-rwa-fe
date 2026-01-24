import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { chains } from './chains'

export const config = getDefaultConfig({
  appName: 'Web3 Frontend Starter',
  projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
  chains,
  ssr: false,
})
