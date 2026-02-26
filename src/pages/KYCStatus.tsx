import { useAccount } from 'wagmi'
import { Shield, CheckCircle, AlertCircle, Mail } from 'lucide-react'
import { useIsKYCed } from '../hooks/useKYC'
import { KYC_REGISTRY_ADDRESS } from '../configs/contract'

export function KYCStatus() {
  const { address, isConnected } = useAccount()
  const { isKYCed, isLoading } = useIsKYCed(address)

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h1>
          <p className="text-gray-600">
            Please connect your wallet to check your KYC verification status.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Shield className="w-4 h-4" />
          <span>KYC Verification</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your KYC Status
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          KYC (Know Your Customer) verification is required to participate in AgriYield RWA platform.
          Check your verification status below.
        </p>
      </div>

      {/* KYC Status Card */}
      <div className="glass-card p-8 mb-8">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking your KYC status...</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verification Status
                </h2>
                <p className="text-sm text-gray-600">
                  Your wallet address KYC verification
                </p>
              </div>
              <div className={`px-6 py-3 rounded-full text-lg font-bold ${
                isKYCed
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-red-100 text-red-800 border-2 border-red-300'
              }`}>
                {isKYCed ? '✓ APPROVED' : '✗ NOT APPROVED'}
              </div>
            </div>

            <div className={`p-6 rounded-lg border-2 ${
              isKYCed
                ? 'bg-green-50 border-green-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-start gap-4">
                {isKYCed ? (
                  <CheckCircle className="w-8 h-8 text-green-600 shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-yellow-600 shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {isKYCed ? 'Your account is verified!' : 'Verification required'}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {isKYCed
                      ? 'Congratulations! Your wallet address has been approved and you can now participate in all platform activities including investing in agricultural yield notes.'
                      : 'Your wallet address has not been approved yet. Please contact the platform administrator to complete your KYC verification process.'}
                  </p>
                  
                  {!isKYCed && (
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Next Steps:
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2 ml-6">
                        <li className="list-disc">Contact the platform administrator</li>
                        <li className="list-disc">Submit required KYC documents</li>
                        <li className="list-disc">Wait for verification approval</li>
                        <li className="list-disc">Return to this page to check your status</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Your Wallet Address:
              </label>
              <p className="font-mono text-sm text-gray-900 break-all bg-white p-3 rounded border border-gray-200">
                {address}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* What is KYC? */}
      <div className="glass-card p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">What is KYC Verification?</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            KYC (Know Your Customer) is a compliance process that verifies the identity of investors
            to prevent fraud, money laundering, and ensure regulatory compliance.
          </p>
          <p>
            AgriYield RWA requires KYC verification to maintain a secure and compliant platform for
            all participants.
          </p>
        </div>
      </div>

      {/* Benefits */}
      {isKYCed && (
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">What You Can Do Now</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Invest in Yield Notes</h4>
                <p className="text-sm text-gray-600">
                  Receive NFT-based yield notes and earn returns on agricultural investments
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Transfer NFTs</h4>
                <p className="text-sm text-gray-600">
                  Transfer your yield note NFTs to other verified investors
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Deposit Funds</h4>
                <p className="text-sm text-gray-600">
                  Deposit principal for your yield notes through the AgriVault
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Receive Returns</h4>
                <p className="text-sm text-gray-600">
                  Automatically receive principal plus yield at maturity date
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contract Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          KYC Registry Contract:{' '}
          <span className="font-mono text-gray-700">{KYC_REGISTRY_ADDRESS}</span>
        </p>
      </div>
    </div>
  )
}
