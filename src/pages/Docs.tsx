import CopyCode from '../components/ui/CopyCode'
import { BookOpen, Code, Layers } from 'lucide-react'

export function Docs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">Docs</h1>
        <p className="text-gray-600 mt-2">Documentation and quick guides for the Web3 Starter template.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Start</h2>
          <p className="text-sm text-gray-600 mb-3">Clone, install dependencies, and run the dev server. Use the copy button to copy commands.</p>
          <CopyCode commands={["git clone https://github.com/zxkhai/web3-starter-fe.git","pnpm install","pnpm dev"]} />
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Project Structure</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><Code className="inline w-4 h-4 mr-2" /> <strong>src/</strong> - application source</li>
            <li><Code className="inline w-4 h-4 mr-2" /> <strong>src/components/</strong> - reusable UI</li>
            <li><Code className="inline w-4 h-4 mr-2" /> <strong>src/pages/</strong> - route pages</li>
            <li><Code className="inline w-4 h-4 mr-2" /> <strong>src/configs/</strong> - wagmi, chains, contracts</li>
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Integration</h3>
          <p className="text-sm text-gray-600 mb-3">This template uses <strong>RainbowKit</strong> + <strong>Wagmi</strong> for wallet connections. The header has a `ConnectButton` that opens the wallet modal.</p>
          <p className="text-sm text-gray-600">Configuration is in <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">src/configs/wagmi.ts</code>. You'll need a WalletConnect Project ID if using WalletConnect.</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contracts</h3>
          <p className="text-sm text-gray-600 mb-3">A dummy contract config is provided at <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">src/configs/contract.ts</code>. Replace the address and ABI with your deployed contract.</p>
          <p className="text-sm text-gray-600">To read or write, use Wagmi hooks like <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">useContractRead</code> and <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">useContractWrite</code>.</p>
        </div>
      </section>

      <section className="glass p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customize</h3>
        <p className="text-sm text-gray-600 mb-3">Change colors, spacing, and themes in Tailwind config and `src/index.css`. To align RainbowKit colors with your brand, provide a `theme` prop to <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">RainbowKitProvider</code> in <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">src/main.tsx</code>.</p>
        <div className="mt-4 text-sm text-gray-600">
          <p className="mb-2"><Layers className="inline w-4 h-4 mr-2" /> Useful files:</p>
          <ul className="list-disc ml-6">
            <li><code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">src/components/layouts/Header.tsx</code> - top nav & ConnectButton</li>
            <li><code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">src/pages/Home.tsx</code> - landing page</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 text-sm text-gray-500">
        <p>Need examples? Visit the <a href="/examples" className="text-blue-600 underline">Examples</a> page.</p>
      </div>
    </div>
  )
}

export default Docs
