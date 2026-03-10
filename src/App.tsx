import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layouts/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { KYCStatus } from './pages/KYCStatus'
import { Debug } from './pages/Debug'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/debug" element={<Debug />} />
          <Route path="/kyc-status" element={<ProtectedRoute><KYCStatus /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
