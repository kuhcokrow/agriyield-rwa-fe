import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useWallet } from '../hooks/useWallet'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { address, isConnected } = useWallet()

  if (!isConnected || !address) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}