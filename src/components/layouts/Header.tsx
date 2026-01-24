import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Web3 App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectButton 
              showBalance={false}
              accountStatus="address"
              chainStatus="icon"/>
          </div>
        </div>
      </div>
    </header>
  )
}
