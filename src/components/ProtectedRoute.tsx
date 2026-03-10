import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useWallet } from '../hooks/useWallet'
import { useIsAdmin } from '../hooks/useAdmin'

interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { address, isConnected } = useWallet()
  const { isAdmin, isLoading } = useIsAdmin()

  if (!isConnected || !address) {
    return <Navigate to="/" replace />
  }

  if (requireAdmin) {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }
    
    if (!isAdmin) {
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}