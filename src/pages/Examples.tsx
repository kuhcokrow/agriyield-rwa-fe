import CopyCode from '../components/ui/CopyCode'
import { CreditCard, Zap, Hash, Key } from 'lucide-react'

export function Examples() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Examples</h1>
      <p className="text-gray-600 mb-8">Practical snippets to get started quickly with wallet and contract interactions.</p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500"/> Connect Wallet</h2>
          <p className="text-sm text-gray-600 mb-3">Use RainbowKit's <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">ConnectButton</code> in your header; it opens the wallet modal automatically.</p>
          <CopyCode commands={["import { ConnectButton } from '@rainbow-me/rainbowkit'","<ConnectButton />"]} />
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><CreditCard className="w-5 h-5 text-green-500"/> Read Contract</h2>
          <p className="text-sm text-gray-600 mb-3">Read a view function using Wagmi's <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">useContractRead</code>.</p>
          <CopyCode commands={["const { data } = useContractRead({","  address: '0x...',","  abi: MyAbi,","  functionName: 'balanceOf',","  args: [address]","})"]} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Key className="w-5 h-5 text-blue-500"/> Sign Message</h2>
          <p className="text-sm text-gray-600 mb-3">Prompt the user to sign a message with Wagmi's signer helpers.</p>
          <CopyCode commands={["const signature = await signMessage({ message: 'Hello from Web3 Starter' })","console.log(signature)"]} />
        </div>

        <div className="glass p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Hash className="w-5 h-5 text-purple-500"/> Send Transaction</h2>
          <p className="text-sm text-gray-600 mb-3">Send a simple ETH transfer via Wagmi's <code className="font-mono text-xs px-1 py-0.5 bg-gray-100 rounded">sendTransaction</code> helper.</p>
          <CopyCode commands={["const tx = await sendTransaction({","  to: '0xRecipient',","  value: parseEther('0.01')","})","await tx.wait()"]} />
        </div>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p className="mb-2">Want runnable examples? I can add interactive components for each example (connect, read, sign, send) that you can try in the browser.</p>
      </div>
    </div>
  )
}

export default Examples
