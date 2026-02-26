export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="glass border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-700 font-medium">
            © {currentYear} AgriYield RWA Platform. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Tokenizing Agricultural Assets for Sustainable Investment
          </p>
        </div>
      </div>
    </footer>
  )
}
