import { useAccount, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import { chains } from '../configs/chains'

export function Dashboard() {
  const { address, chainId } = useAccount()
  const { data: balance } = useBalance({
    address,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Wallet Address
          </h3>
          <p className="text-gray-600 text-sm font-mono">
            {address}
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Balance
          </h3>
          <p className="text-gray-600">
            {balance ? `${formatEther(balance.value)} ${balance.symbol}` : 'Loading...'}
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Network
          </h3>
          <p className="text-gray-600">
            {chains.find(chain => chain.id === chainId)?.name || 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  )
}