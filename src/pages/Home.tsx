import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { Zap, ShieldCheck, Layers, BookOpen, Terminal } from 'lucide-react'
import CopyCode from '../components/ui/CopyCode'

export function Home() {
  const { address, isConnected } = useAccount()

  return (
    <div className="pb-16">
      <header className="border-b border-white/20 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Web3 Frontend Starter</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">Opinionated starter template for building modern, secure, and fast Web3 frontends using Vite, React, Wagmi and RainbowKit.</p>

          <div className="flex items-center justify-center gap-4">
            <Link to="/docs" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:brightness-95" aria-label="Docs">
              <BookOpen className="w-4 h-4 text-white" />
              <span className="font-medium text-white">Docs</span>
            </Link>
            <Link to="/examples" className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-3 rounded-lg hover:bg-blue-50" aria-label="Examples">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Examples</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <article className="glass-card p-6 flex items-start gap-4">
            <div className="p-3 rounded-md bg-blue-50 text-blue-600"><Zap className="w-5 h-5" /></div>
            <div>
              <h3 className="font-semibold text-gray-900">Fast Development</h3>
              <p className="text-sm text-gray-600">Vite + React + TypeScript for instant HMR and a great DX.</p>
            </div>
          </article>

          <article className="glass-card p-6 flex items-start gap-4">
            <div className="p-3 rounded-md bg-green-50 text-green-600"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <h3 className="font-semibold text-gray-900">Secure by Default</h3>
              <p className="text-sm text-gray-600">Wagmi connectors and best-practice patterns for handling wallets and signatures.</p>
            </div>
          </article>

          <article className="glass-card p-6 flex items-start gap-4">
            <div className="p-3 rounded-md bg-indigo-50 text-indigo-600"><Layers className="w-5 h-5" /></div>
            <div>
              <h3 className="font-semibold text-gray-900">Modular</h3>
              <p className="text-sm text-gray-600">Pluggable configs for chains, contracts and UI so you can iterate quickly.</p>
            </div>
          </article>
        </section>

        <section className="glass p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-gray-600 mb-4">Clone the repo, install dependencies and start the dev server.</p>
              <CopyCode commands={["git clone https://github.com/kuhcokrow/web3-starter-fe.git","pnpm install","pnpm dev"]} />
            </div>

            <div>
              <p className="text-gray-600 mb-2">Connect a wallet to try the example flows. Your wallet address will show in the dashboard.</p>
              {isConnected ? (
                <div className="inline-block bg-green-50 border border-green-200 rounded px-4 py-2 text-green-800">Connected: {address}</div>
              ) : (
                <div className="inline-block bg-blue-50 border border-blue-200 rounded px-4 py-2 text-blue-800">Click Connect Wallet (top right)</div>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6">
            <h4 className="text-lg font-semibold text-gray-900">Why this starter?</h4>
            <p className="text-sm text-gray-600 mt-2">Reuse the patterns to scaffold dapps quickly: routing, wallet integration, contract helpers and UI components are ready.</p>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-gray-900">Integrations</h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>RainbowKit + Wagmi</li>
              <li>Vite + React + TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-gray-900">Next Steps</h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Replace dummy contract with your deployed address</li>
              <li>Create feature pages under `/examples`</li>
              <li>Customize RainbowKit theme to match branding</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}