import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { isAddress } from 'viem'
import { Shield, Settings, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useKYCOwner, useApproveKYC, useRevokeKYC, useIsKYCed } from '../hooks/useKYC'
import { KYC_REGISTRY_ADDRESS } from '../configs/contract'

type MenuItem = {
  id: string
  label: string
  icon: typeof Shield
}

const menuItems: MenuItem[] = [
  { id: 'kyc', label: 'KYC Registry', icon: Shield },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Dashboard() {
  const { address } = useAccount()
  const { owner: kycOwner, isLoading: isLoadingOwner } = useKYCOwner()
  const [activeMenu, setActiveMenu] = useState('kyc')
  
  // Check if user is admin
  const isAdmin = address && kycOwner && address.toLowerCase() === kycOwner.toLowerCase()

  // KYC Management State
  const [targetAddress, setTargetAddress] = useState('')
  const [checkAddress, setCheckAddress] = useState('')
  const [validationError, setValidationError] = useState('')
  
  const { isKYCed: targetIsKYCed, isLoading: isCheckingStatus } = useIsKYCed(
    checkAddress && isAddress(checkAddress) ? checkAddress as `0x${string}` : undefined
  )
  const approveKYC = useApproveKYC()
  const revokeKYC = useRevokeKYC()

  // Handlers
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

  const handleCheckStatus = () => {
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

  // Clear form on success
  useEffect(() => {
    if (approveKYC.isSuccess || revokeKYC.isSuccess) {
      const timer = setTimeout(() => {
        setTargetAddress('')
        setCheckAddress('')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [approveKYC.isSuccess, revokeKYC.isSuccess])

  // Loading owner
  if (isLoadingOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            This dashboard is only accessible to platform administrators.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Contract Owner:</span>
            </p>
            <p className="text-xs font-mono text-gray-600 break-all">
              {kycOwner}
            </p>
            <p className="text-sm text-gray-700 mt-3 mb-2">
              <span className="font-semibold">Your Address:</span>
            </p>
            <p className="text-xs font-mono text-gray-600 break-all">
              {address}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1">AgriYield RWA</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeMenu === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Admin Info */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">Admin Access</span>
              </div>
              <p className="text-xs text-green-600 font-mono break-all">
                {address}
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeMenu === 'kyc' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">KYC Registry Management</h1>
                <p className="text-gray-600 mt-2">Manage investor whitelist and compliance</p>
              </div>

              {/* Contract Info */}
              <div className="glass-card p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">KYC Registry Contract</label>
                    <p className="font-mono text-sm text-gray-900 mt-1 break-all">{KYC_REGISTRY_ADDRESS}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Contract Owner</label>
                    <p className="font-mono text-sm text-gray-900 mt-1 break-all">{kycOwner}</p>
                  </div>
                </div>
              </div>

              {/* Approve/Revoke KYC */}
              <div className="glass-card p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Approve or Revoke KYC
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Enter an investor's address to approve or revoke their KYC status
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Investor Wallet Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder="0x..."
                      value={targetAddress}
                      onChange={(e) => {
                        setTargetAddress(e.target.value)
                        setValidationError('')
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                    />
                    {validationError && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        {validationError}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleApprove}
                      disabled={approveKYC.isPending || approveKYC.isConfirming || !targetAddress}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {approveKYC.isPending || approveKYC.isConfirming ? 'Processing...' : 'Approve KYC'}
                    </button>
                    
                    <button
                      onClick={handleRevoke}
                      disabled={revokeKYC.isPending || revokeKYC.isConfirming || !targetAddress}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      {revokeKYC.isPending || revokeKYC.isConfirming ? 'Processing...' : 'Revoke KYC'}
                    </button>
                  </div>

                  {/* Transaction Status */}
                  {approveKYC.hash && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900 font-medium mb-1">Approve Transaction Submitted</p>
                      <p className="text-xs font-mono text-blue-700 break-all">{approveKYC.hash}</p>
                    </div>
                  )}
                  
                  {revokeKYC.hash && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-900 font-medium mb-1">Revoke Transaction Submitted</p>
                      <p className="text-xs font-mono text-orange-700 break-all">{revokeKYC.hash}</p>
                    </div>
                  )}
                  
                  {approveKYC.isSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-green-900 font-medium">
                        ✓ KYC approved successfully!
                      </p>
                    </div>
                  )}
                  
                  {revokeKYC.isSuccess && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-red-600" />
                      <p className="text-sm text-red-900 font-medium">
                        ✓ KYC revoked successfully!
                      </p>
                    </div>
                  )}
                  
                  {(approveKYC.error || revokeKYC.error) && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-900 font-medium mb-1">Transaction Error</p>
                      <p className="text-xs text-red-700">
                        {approveKYC.error?.message || revokeKYC.error?.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Check KYC Status */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Check KYC Status
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Verify the KYC status of any wallet address
                </p>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="0x... (address to check)"
                      value={targetAddress}
                      onChange={(e) => {
                        setTargetAddress(e.target.value)
                        setValidationError('')
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    />
                    <button
                      onClick={handleCheckStatus}
                      disabled={!targetAddress || isCheckingStatus}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      {isCheckingStatus ? 'Checking...' : 'Check Status'}
                    </button>
                  </div>

                  {checkAddress && isAddress(checkAddress) && (
                    <div className={`p-6 rounded-lg border-2 ${
                      targetIsKYCed 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-red-50 border-red-300'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            {targetIsKYCed ? (
                              <>
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <span className="text-green-900">KYC Approved</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-6 h-6 text-red-600" />
                                <span className="text-red-900">KYC Not Approved</span>
                              </>
                            )}
                          </h4>
                          <p className="text-sm font-mono text-gray-700 mt-2 break-all">
                            {checkAddress}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          targetIsKYCed 
                            ? 'bg-green-200 text-green-800' 
                            : 'bg-red-200 text-red-800'
                        }`}>
                          {targetIsKYCed ? 'WHITELISTED' : 'NOT WHITELISTED'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {targetIsKYCed 
                          ? '✓ This address is approved and can participate in the platform.' 
                          : '✗ This address needs KYC approval before participating.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
              <div className="glass-card p-6">
                <p className="text-gray-600">Platform settings will be available here.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
