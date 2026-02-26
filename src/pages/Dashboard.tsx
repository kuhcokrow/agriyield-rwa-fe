import { useState, useEffect } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { formatEther, isAddress } from 'viem'
import { chains } from '../configs/chains'
import { useIsKYCed, useKYCOwner, useApproveKYC, useRevokeKYC } from '../hooks/useKYC'
import { useNFTBalance, useNextTokenId, useNFTInfo, useVaultInfo } from '../hooks/useContracts'
import { KYC_REGISTRY_ADDRESS, YIELD_NOTE_NFT_ADDRESS, AGRI_VAULT_ADDRESS } from '../configs/contract'

export function Dashboard() {
  const { address, chainId } = useAccount()
  const { data: balance } = useBalance({
    address,
  })

  // KYC Status
  const { isKYCed, isLoading: isLoadingKYC, refetch: refetchKYC } = useIsKYCed(address)
  const { owner: kycOwner } = useKYCOwner()

  // NFT Info
  const { balance: nftBalance, isLoading: isLoadingNFTBalance } = useNFTBalance(address)
  const { nextTokenId, isLoading: isLoadingNextToken } = useNextTokenId()
  const { name: nftName, symbol: nftSymbol } = useNFTInfo()

  // Vault Info
  const { owner: vaultOwner } = useVaultInfo()

  const isKYCAdmin = address && kycOwner && address.toLowerCase() === kycOwner.toLowerCase()
  const isVaultAdmin = address && vaultOwner && address.toLowerCase() === vaultOwner.toLowerCase()

  // KYC Management (Admin only)
  const [targetAddress, setTargetAddress] = useState<string>('')
  const [checkAddress, setCheckAddress] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')
  const { isKYCed: targetIsKYCed } = useIsKYCed(
    checkAddress && isAddress(checkAddress) ? checkAddress as `0x${string}` : undefined
  )
  const approveKYC = useApproveKYC()
  const revokeKYC = useRevokeKYC()

  // Handle approve KYC
  const handleApprove = () => {
    if (!targetAddress) {
      setValidationError('Please enter an address')
      return
    }
    if (!isAddress(targetAddress)) {
      setValidationError('Invalid Ethereum address')
      return
    }
    setValidationError('')
    approveKYC.approveKYC(targetAddress as `0x${string}`)
  }

  // Handle revoke KYC
  const handleRevoke = () => {
    if (!targetAddress) {
      setValidationError('Please enter an address')
      return
    }
    if (!isAddress(targetAddress)) {
      setValidationError('Invalid Ethereum address')
      return
    }
    setValidationError('')
    revokeKYC.revokeKYC(targetAddress as `0x${string}`)
  }

  // Handle check status
  const handleCheck = () => {
    if (!targetAddress) {
      setValidationError('Please enter an address')
      return
    }
    if (!isAddress(targetAddress)) {
      setValidationError('Invalid Ethereum address')
      return
    }
    setValidationError('')
    setCheckAddress(targetAddress)
  }

  // Auto-refresh and clear form on success
  useEffect(() => {
    if (approveKYC.isSuccess || revokeKYC.isSuccess) {
      const timer = setTimeout(() => {
        refetchKYC()
        setTargetAddress('')
        setCheckAddress('')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [approveKYC.isSuccess, revokeKYC.isSuccess, refetchKYC])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your AgriYield RWA platform</p>
      </div>

      {/* Wallet Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Wallet Address
          </h3>
          <p className="text-gray-600 text-sm font-mono break-all">
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

      {/* Admin Overview Stats */}
      {(isKYCAdmin || isVaultAdmin) && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🎯 Platform Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 border-l-4 border-green-500">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Yield Notes
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {isLoadingNextToken ? '...' : (nextTokenId?.toString() || '0')}
              </p>
              <p className="text-xs text-gray-500 mt-1">Minted NFTs</p>
            </div>

            <div className="glass-card p-6 border-l-4 border-blue-500">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Your Holdings
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {isLoadingNFTBalance ? '...' : (nftBalance?.toString() || '0')}
              </p>
              <p className="text-xs text-gray-500 mt-1">NFTs owned</p>
            </div>

            <div className="glass-card p-6 border-l-4 border-purple-500">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Admin Role
              </h3>
              <p className="text-lg font-bold text-gray-900">
                {isKYCAdmin && isVaultAdmin ? 'Full Admin' : isKYCAdmin ? 'KYC Admin' : 'Vault Admin'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Access level</p>
            </div>

            <div className="glass-card p-6 border-l-4 border-yellow-500">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Platform Status
              </h3>
              <p className="text-lg font-bold text-green-600">
                ✓ Active
              </p>
              <p className="text-xs text-gray-500 mt-1">All systems operational</p>
            </div>
          </div>
        </div>
      )}

      {/* KYC Status - Compliance Gate */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          KYC Status - Compliance Gate
        </h2>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Your KYC Verification Status
              </h3>
              <p className="text-sm text-gray-600">
                KYC verification is required to participate in the platform
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isKYCed 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-red-100 text-red-800 border-2 border-red-300'
            }`}>
              {isLoadingKYC ? 'Checking...' : (isKYCed ? '✓ APPROVED' : '✗ NOT APPROVED')}
            </span>
          </div>
          
          {!isLoadingKYC && (
            <div className={`p-4 rounded-lg ${isKYCed ? 'bg-green-50' : 'bg-yellow-50'}`}>
              <p className="text-sm">
                {isKYCed 
                  ? '✓ You are whitelisted and can participate in deposits and NFT transfers.' 
                  : '⚠️ Please contact the administrator to complete KYC verification.'}
              </p>
            </div>
          )}

          {isKYCAdmin && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 font-medium">
                🛡️ You are the KYC Registry Admin
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Vault & NFT Status */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Vault & NFT Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NFT Holdings */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your NFT Holdings
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Collection:</span>
                <span className="font-medium">{nftName || 'Loading...'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Symbol:</span>
                <span className="font-medium">{nftSymbol || 'Loading...'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Your Balance:</span>
                <span className="font-semibold text-xl text-primary-600">
                  {isLoadingNFTBalance ? '...' : (nftBalance?.toString() || '0')} NFTs
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Minted:</span>
                <span className="font-medium">
                  {isLoadingNextToken ? '...' : (nextTokenId?.toString() || '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Vault Status */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              AgriVault Status
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Vault Owner:</span>
                <p className="font-mono text-xs break-all mt-1">
                  {vaultOwner || 'Loading...'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Your Status:</span>
                <div className="mt-2 space-y-2">
                  <div className={`flex items-center gap-2 ${isKYCed ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{isKYCed ? '✓' : '✗'}</span>
                    <span className="text-sm">KYC Verified</span>
                  </div>
                  {isVaultAdmin && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <span>🛡️</span>
                      <span className="text-sm font-medium">Vault Administrator</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Management - Admin Only */}
      {isKYCAdmin && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🛡️ KYC Management (Admin)
          </h2>
          
          {/* Whitelist Management */}
          <div className="glass-card p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Whitelist Investor
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Approve or revoke KYC status for investor addresses
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Investor Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="0x..."
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {validationError && (
                  <p className="text-red-600 text-sm mt-1">{validationError}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleApprove}
                  disabled={approveKYC.isPending || approveKYC.isConfirming}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {approveKYC.isPending || approveKYC.isConfirming ? 'Processing...' : '✓ Approve KYC'}
                </button>
                <button
                  onClick={handleRevoke}
                  disabled={revokeKYC.isPending || revokeKYC.isConfirming}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {revokeKYC.isPending || revokeKYC.isConfirming ? 'Processing...' : '✗ Revoke KYC'}
                </button>
              </div>

              {/* Transaction Status */}
              {approveKYC.hash && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Approve Transaction:</strong>{' '}
                    <span className="font-mono text-xs break-all">{approveKYC.hash}</span>
                  </p>
                </div>
              )}
              {revokeKYC.hash && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-900">
                    <strong>Revoke Transaction:</strong>{' '}
                    <span className="font-mono text-xs break-all">{revokeKYC.hash}</span>
                  </p>
                </div>
              )}
              {approveKYC.isSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900">
                    ✓ KYC approved successfully!
                  </p>
                </div>
              )}
              {revokeKYC.isSuccess && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-900">
                    ✓ KYC revoked successfully!
                  </p>
                </div>
              )}
              {(approveKYC.error || revokeKYC.error) && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-900">
                    Error: {(approveKYC.error || revokeKYC.error)?.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Check KYC Status */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Check KYC Status
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Verify if an address has completed KYC verification
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="checkAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Address to Check
                </label>
                <div className="flex gap-2">
                  <input
                    id="checkAddress"
                    type="text"
                    placeholder="0x..."
                    value={targetAddress}
                    onChange={(e) => setTargetAddress(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleCheck}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    Check Status
                  </button>
                </div>
              </div>

              {checkAddress && isAddress(checkAddress) && (
                <div className={`p-6 rounded-lg border-2 ${
                  targetIsKYCed 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-red-50 border-red-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">
                      {targetIsKYCed ? '✓ KYC Approved' : '✗ KYC Not Approved'}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      targetIsKYCed 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-red-200 text-red-800'
                    }`}>
                      {targetIsKYCed ? 'WHITELISTED' : 'NOT WHITELISTED'}
                    </span>
                  </div>
                  <p className="text-sm font-mono break-all text-gray-700">
                    {checkAddress}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {targetIsKYCed 
                      ? 'This address is approved and can participate in the platform.' 
                      : 'This address needs KYC approval before participating.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contract Addresses */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Smart Contract Addresses
        </h2>
        <div className="glass-card p-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">KYC Registry</h4>
              <p className="font-mono text-xs text-gray-600 break-all">{KYC_REGISTRY_ADDRESS}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Yield Note NFT</h4>
              <p className="font-mono text-xs text-gray-600 break-all">{YIELD_NOTE_NFT_ADDRESS}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">AgriVault</h4>
              <p className="font-mono text-xs text-gray-600 break-all">{AGRI_VAULT_ADDRESS}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}