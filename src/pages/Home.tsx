import { useAccount } from 'wagmi'

export function Home() {
  const { address, isConnected } = useAccount()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Web3 Frontend Starter
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern starter template for building Web3 applications
        </p>

        {isConnected ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              Connected!
            </h2>
            <p className="text-green-700 text-sm">
              Wallet Address: {address}
            </p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-blue-700 text-sm">
              Click the connect button in the header to get started
            </p>
          </div>
        )}
      </div>
    </div>
  )
}