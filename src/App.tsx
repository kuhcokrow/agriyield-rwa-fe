import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layouts/Layout'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Docs } from './pages/Docs'
import { Examples } from './pages/Examples'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/examples" element={<Examples />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
