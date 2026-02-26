import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layouts/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { KYCStatus } from './pages/KYCStatus'
import { Docs } from './pages/Docs'
import { Examples } from './pages/Examples'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kyc-status" element={<ProtectedRoute><KYCStatus /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/examples" element={<Examples />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
