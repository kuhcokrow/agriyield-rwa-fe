import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layouts/Layout'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><h1 className="text-2xl font-bold">Docs (Placeholder)</h1><p className="text-gray-600 mt-2">Documentation will go here.</p></div>} />
          <Route path="/examples" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><h1 className="text-2xl font-bold">Examples (Placeholder)</h1><p className="text-gray-600 mt-2">Example integrations and snippets.</p></div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
