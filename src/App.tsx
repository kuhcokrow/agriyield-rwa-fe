import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Layout } from './components/layouts/Layout'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Layout>
        <nav className="bg-gray-100 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 py-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
