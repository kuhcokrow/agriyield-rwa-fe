import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { isAddress } from 'viem'
import { Shield, Settings, CheckCircle, XCircle, AlertCircle, Users, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useKYCOwner, useApproveKYC, useRevokeKYC, useIsKYCed, useTransferOwnership } from '../hooks/useKYC'
import { useIsAdmin } from '../hooks/useAdmin'
import { KYC_REGISTRY_ADDRESS } from '../configs/contract'
import { ADMIN_WHITELIST } from '../configs/admin'
import { Spinner } from '@/components/ui/spinner'

type MenuItem = {
  id: string
  label: string
  icon: typeof Shield
  ownership?: 'admin' | 'owner'
}

const menuItems: MenuItem[] = [
  { id: 'kyc', label: 'KYC Registry', icon: Shield },
  { id: 'admin', label: 'Admin Management', icon: Users, ownership: 'owner' },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Dashboard() {
  const { address } = useAccount()
  const { owner: kycOwner, isLoading: isLoadingOwner } = useKYCOwner()
  const { isAdmin, isOwner } = useIsAdmin()
  const [activeMenu, setActiveMenu] = useState('kyc')
  const [adminInput, setAdminInput] = useState('')
  const [adminError, setAdminError] = useState('')

  // Transfer Ownership State
  const [transferInput, setTransferInput] = useState('')
  const [transferError, setTransferError] = useState('')
  const [transferConfirm, setTransferConfirm] = useState(false)
  const transferOwnershipHook = useTransferOwnership()

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
    if (!checkAddress) {
      setValidationError('Please enter an address')
      return
    }
    if (!isAddress(checkAddress)) {
      setValidationError('Invalid Ethereum address')
      return
    }
    setValidationError('')
  }

  const handleTransferOwnership = () => {
    if (!transferInput) {
      setTransferError('Please enter an address')
      return
    }
    if (!isAddress(transferInput)) {
      setTransferError('Invalid Ethereum address')
      return
    }
    if (transferInput.toLowerCase() === kycOwner?.toLowerCase()) {
      setTransferError('New owner is same as current owner')
      return
    }
    setTransferError('')
    transferOwnershipHook.transferOwnership(transferInput as `0x${string}`)
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

  // Handle transfer ownership success
  useEffect(() => {
    if (transferOwnershipHook.isSuccess) {
      const timer = setTimeout(() => {
        setTransferInput('')
        setTransferConfirm(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [transferOwnershipHook.isSuccess])

  // Loading owner
  if (isLoadingOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner className="size-12 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
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
            {menuItems
              .filter((item) => {
                // Hide owner-only items from non-owners
                if (item.ownership === 'owner' && !isOwner) return false
                return true
              })
              .map((item) => {
              const Icon = item.icon
              const isActive = activeMenu === item.id
              return (
                <Button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 ${isActive ? '' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
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
                      {approveKYC.isPending || approveKYC.isConfirming ? (
                        <>
                          <Spinner className="size-5" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Approve KYC
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleRevoke}
                      disabled={revokeKYC.isPending || revokeKYC.isConfirming || !targetAddress}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      {revokeKYC.isPending || revokeKYC.isConfirming ? (
                        <>
                          <Spinner className="size-5" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5" />
                          Revoke KYC
                        </>
                      )}
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
                      value={checkAddress}
                      onChange={(e) => {
                        setCheckAddress(e.target.value)
                        setValidationError('')
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                    />
                    <Button
                      onClick={handleCheckStatus}
                      disabled={!targetAddress || isCheckingStatus}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      {isCheckingStatus ? (
                        <>
                          <Spinner className="size-4" />
                          Checking...
                        </>
                      ) : (
                        'Check Status'
                      )}
                    </Button>
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

          {activeMenu === 'admin' && isOwner && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
                <p className="text-gray-600 mt-2">Manage admin whitelist for the platform</p>
              </div>

              {/* Admin Whitelist */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Admin Whitelist</h3>
                
                {ADMIN_WHITELIST.length === 0 ? (
                  <p className="text-gray-600 mb-6">No additional admins whitelisted yet.</p>
                ) : (
                  <div className="mb-6 space-y-2">
                    {ADMIN_WHITELIST.map((admin: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <p className="font-mono text-sm text-gray-900 break-all">{admin}</p>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          Admin
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Add Admin to Whitelist</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Add a wallet address to grant admin access. This list is hardcoded in config.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="admin-address" className="block text-sm font-medium text-gray-700 mb-2">
                        Wallet Address
                      </label>
                      <input
                        id="admin-address"
                        type="text"
                        placeholder="0x..."
                        value={adminInput}
                        onChange={(e) => {
                          setAdminInput(e.target.value)
                          setAdminError('')
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                      />
                      {adminError && (
                        <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          {adminError}
                        </p>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm text-blue-900 mb-3">
                        <span className="font-semibold">How to add admin:</span>
                      </p>
                      <ol className="text-xs text-blue-800 space-y-2 list-decimal list-inside">
                        <li>Copy the wallet address above</li>
                        <li>Edit <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono">src/configs/admin.ts</code></li>
                        <li>Add address to ADMIN_WHITELIST array</li>
                        <li>Save and refresh the app</li>
                      </ol>
                    </div>

                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <p className="text-sm text-green-900">
                        <span className="font-semibold">✓ Example:</span> Add <code className="bg-green-100 px-1.5 py-0.5 rounded font-mono text-xs">'0xabc...'</code> to the ADMIN_WHITELIST array
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transfer Ownership */}
              <div className="glass-card p-6 border-l-4 border-orange-500 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <ArrowRight className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Transfer Ownership</h3>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
                  <p className="text-sm text-orange-900 font-medium mb-2">⚠️ Be Careful!</p>
                  <p className="text-xs text-orange-800">
                    Transferring ownership will grant all admin permissions to the new owner. This action can be reversed by the new owner.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Current Owner</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="font-mono text-sm text-gray-900 break-all">{kycOwner}</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="transfer-address" className="block text-sm font-medium text-gray-700 mb-2">
                      New Owner Address
                    </label>
                    <input
                      id="transfer-address"
                      type="text"
                      placeholder="0x..."
                      value={transferInput}
                      onChange={(e) => {
                        setTransferInput(e.target.value)
                        setTransferError('')
                        setTransferConfirm(false)
                      }}
                      disabled={transferOwnershipHook.isPending || transferOwnershipHook.isConfirming}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                    {transferError && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        {transferError}
                      </p>
                    )}
                  </div>

                  {!transferConfirm ? (
                    <button
                      onClick={() => {
                        if (transferInput && isAddress(transferInput)) {
                          setTransferConfirm(true)
                          setTransferError('')
                        } else {
                          setTransferError('Please enter a valid address')
                        }
                      }}
                      disabled={!transferInput || transferOwnershipHook.isPending}
                      className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Review Transfer
                    </button>
                  ) : (
                    <div className="space-y-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm font-semibold text-orange-900">Confirm Transfer</p>
                      <p className="text-xs text-orange-800">
                        You are about to transfer ownership to:
                      </p>
                      <p className="font-mono text-sm text-orange-900 break-all bg-white p-2 rounded border border-orange-300">
                        {transferInput}
                      </p>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleTransferOwnership}
                          disabled={transferOwnershipHook.isPending || transferOwnershipHook.isConfirming}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors text-sm"
                        >
                          {transferOwnershipHook.isPending || transferOwnershipHook.isConfirming ? 'Processing...' : 'Confirm Transfer'}
                        </button>
                        <button
                          onClick={() => {
                            setTransferConfirm(false)
                            setTransferError('')
                          }}
                          disabled={transferOwnershipHook.isPending || transferOwnershipHook.isConfirming}
                          className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {transferOwnershipHook.hash && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900 font-medium mb-1">Transfer Transaction Submitted</p>
                      <p className="text-xs font-mono text-blue-700 break-all">{transferOwnershipHook.hash}</p>
                    </div>
                  )}

                  {transferOwnershipHook.isSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-green-900 font-medium">✓ Ownership transferred successfully!</p>
                        <p className="text-xs text-green-700 mt-1">The contract is now owned by the new address.</p>
                      </div>
                    </div>
                  )}

                  {transferOwnershipHook.error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-900 font-medium mb-1">Transaction Error</p>
                      <p className="text-xs text-red-700">
                        {transferOwnershipHook.error?.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

