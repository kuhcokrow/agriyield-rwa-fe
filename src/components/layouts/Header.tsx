import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Layers, Home, FileText, List } from 'lucide-react'

export function Header() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'flex items-center text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-600'
      : 'flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition transform hover:-translate-y-0.5'

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Web3 Starter</h1>
            </div>
          </div>

          <nav className="hidden md:flex space-x-2">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
              <Home className="mr-2 w-4 h-4" /> Home
            </NavLink>
            <NavLink to="/docs" className={linkClass} onClick={() => setOpen(false)}>
              <FileText className="mr-2 w-4 h-4" /> Docs
            </NavLink>
            <NavLink to="/examples" className={linkClass} onClick={() => setOpen(false)}>
              <List className="mr-2 w-4 h-4" /> Examples
            </NavLink>
            <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
              <List className="mr-2 w-4 h-4" /> Dashboard
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <div className="transition-transform hover:scale-105">
                <ConnectButton showBalance={false} accountStatus="address" chainStatus="icon" />
              </div>
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 pt-4 pb-4 space-y-1">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'block px-3 py-2 text-blue-600 border-b-2 border-blue-600' : 'block px-3 py-2 text-gray-700 hover:bg-gray-50')} onClick={() => setOpen(false)}>
              <div className="flex items-center"><Home className="mr-2 w-4 h-4" /> Home</div>
            </NavLink>
            <NavLink to="/docs" className={({ isActive }) => (isActive ? 'block px-3 py-2 text-blue-600 border-b-2 border-blue-600' : 'block px-3 py-2 text-gray-700 hover:bg-gray-50')} onClick={() => setOpen(false)}>
              <div className="flex items-center"><FileText className="mr-2 w-4 h-4" /> Docs</div>
            </NavLink>
            <NavLink to="/examples" className={({ isActive }) => (isActive ? 'block px-3 py-2 text-blue-600 border-b-2 border-blue-600' : 'block px-3 py-2 text-gray-700 hover:bg-gray-50')} onClick={() => setOpen(false)}>
              <div className="flex items-center"><List className="mr-2 w-4 h-4" /> Examples</div>
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'block px-3 py-2 text-blue-600 border-b-2 border-blue-600' : 'block px-3 py-2 text-gray-700 hover:bg-gray-50')} onClick={() => setOpen(false)}>
              <div className="flex items-center"><List className="mr-2 w-4 h-4" /> Dashboard</div>
            </NavLink>

            <div className="pt-2">
              <ConnectButton showBalance={false} accountStatus="address" chainStatus="icon" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
