import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { Sprout, ShieldCheck, TrendingUp, BookOpen, LayoutDashboard, Wallet } from 'lucide-react'

export function Home() {
  const { address, isConnected } = useAccount()

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <header className="border-b border-white/20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sprout className="w-4 h-4" />
            <span>Tokenized Agricultural Real-World Assets</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            AgriYield <span className="text-green-600">RWA</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-8">
            A decentralized platform for investing in agricultural yield notes secured by blockchain technology. 
            Earn predictable returns while supporting sustainable farming.
          </p>

          <div className="flex items-center justify-center gap-4">
            {isConnected ? (
              <Link to="/dashboard" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors" aria-label="Dashboard">
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">Open Dashboard</span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-3 rounded-lg">
                <Wallet className="w-5 h-5" />
                <span className="font-medium">Connect Wallet to Start</span>
              </div>
            )}
            <Link to="/docs" className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Docs">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Learn More</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How AgriYield Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="glass-card p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 rounded-full bg-green-100 text-green-600 mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Complete KYC</h3>
              <p className="text-gray-600">
                Verify your identity through our secure KYC process to ensure regulatory compliance and platform security.
              </p>
            </article>

            <article className="glass-card p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <Sprout className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Receive Yield Notes</h3>
              <p className="text-gray-600">
                Get NFT-based yield notes representing your investment in agricultural projects with fixed returns.
              </p>
            </article>

            <article className="glass-card p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-600 mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Earn Returns</h3>
              <p className="text-gray-600">
                Receive your principal plus yield automatically at maturity through smart contract execution.
              </p>
            </article>
          </div>
        </section>

        {/* Key Features */}
        <section className="glass-card p-10 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">KYC-Protected Access</h3>
                <p className="text-gray-600">Only verified investors can participate, ensuring regulatory compliance and reducing fraud risk.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                  <Sprout className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">NFT-Based Ownership</h3>
                <p className="text-gray-600">Your investment is represented as an NFT, providing transparent and transferable proof of ownership.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Automated Settlement</h3>
                <p className="text-gray-600">Smart contracts automatically distribute returns at maturity, no manual intervention needed.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Records</h3>
                <p className="text-gray-600">All transactions and yields are recorded on-chain for complete transparency and auditability.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="text-center">
          <div className="glass-card p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Investing?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect your wallet to access the platform and view your investment opportunities.
            </p>
            
            {isConnected ? (
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">✓ Wallet Connected</p>
                  <p className="text-sm text-green-600 font-mono mt-1">{address}</p>
                </div>
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-700 transition-colors font-medium text-lg"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <Wallet className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-800 font-medium mb-2">Connect Your Wallet</p>
                <p className="text-sm text-green-600">
                  Click the "Connect Wallet" button in the top right corner to get started.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}