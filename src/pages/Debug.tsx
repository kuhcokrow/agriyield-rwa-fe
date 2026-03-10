import { useAccount } from 'wagmi'
import { useKYCOwner } from '../hooks/useKYC'
import { KYC_REGISTRY_ADDRESS } from '../configs/contract'

export function Debug() {
  const { address: currentWallet, isConnected, chainId } = useAccount()
  const { owner: contractOwner, isLoading } = useKYCOwner()

  const isMatch = currentWallet && contractOwner && 
    currentWallet.toLowerCase() === contractOwner.toLowerCase()

  const formatAddress = (addr?: string) => {
    if (!addr) return 'Not available'
    return addr
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Debug Info</h1>

        {/* Connection Status */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Wallet Connection</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Connected:</span>
              <span className={`font-mono font-bold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Chain ID:</span>
              <span className="font-mono font-bold text-gray-900">{chainId || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Current Wallet */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Current Wallet</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Address:</p>
            <p className="font-mono text-sm break-all text-gray-900 font-bold">
              {formatAddress(currentWallet)}
            </p>
          </div>
        </div>

        {/* Contract Configuration */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">KYC Registry Contract</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Expected Address (from config):</p>
            <p className="font-mono text-sm break-all text-gray-900 font-bold mb-4">
              {KYC_REGISTRY_ADDRESS}
            </p>
          </div>
        </div>

        {/* Contract Owner */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contract Owner</h2>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading owner...</p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Owner Address:</p>
              <p className="font-mono text-sm break-all text-gray-900 font-bold">
                {formatAddress(contractOwner)}
              </p>
            </div>
          )}
        </div>

        {/* Comparison */}
        <div className={`glass-card p-6 ${isMatch ? 'bg-green-50' : 'bg-red-50'}`}>
          <h2 className="text-xl font-bold mb-4">
            {isMatch ? (
              <span className="text-green-700">✓ Match!</span>
            ) : (
              <span className="text-red-700">✗ Mismatch!</span>
            )}
          </h2>
          
          {isMatch ? (
            <div className="text-green-700">
              <p className="font-semibold mb-2">Your wallet is the contract owner!</p>
              <p className="text-sm">You should have admin access to the dashboard.</p>
              <p className="text-sm mt-2">If you still see "Access Denied", try:</p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Refresh the page</li>
                <li>Clear browser cache</li>
                <li>Disconnect and reconnect wallet</li>
              </ul>
            </div>
          ) : (
            <div className="text-red-700">
              <p className="font-semibold mb-2">Wallet mismatch detected!</p>
              <p className="text-sm">Your current wallet is NOT the contract owner.</p>
              <p className="text-sm mt-2">Solution:</p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Switch to wallet: <span className="font-mono break-all">{contractOwner}</span></li>
                <li>Or transfer ownership to current wallet (requires contract owner access)</li>
              </ul>
            </div>
          )}
        </div>

        {/* Help */}
        <div className="glass-card p-6 bg-blue-50">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Troubleshooting</h2>
          <div className="text-blue-800 text-sm space-y-2">
            <p>📌 <strong>Expected scenario:</strong> Current Wallet and Owner should match</p>
            <p>📌 <strong>Check network:</strong> Make sure you're on the correct blockchain where contract was deployed</p>
            <p>📌 <strong>Contract verification:</strong> Go to Blockscout and verify contract details match above addresses</p>
            <p>📌 <strong>RPC issue:</strong> If data looks wrong, try switching networks and back</p>
          </div>
        </div>
      </div>
    </div>
  )
}
