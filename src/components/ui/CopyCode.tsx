import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyCodeProps {
  commands: string[]
}

export function CopyCode({ commands }: CopyCodeProps) {
  const [copied, setCopied] = useState(false)

  const text = commands.join('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error(e)
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative bg-gray-50 rounded-md">
      <button
        className="absolute right-2 top-2 bg-white p-2 rounded-full text-gray-700 border-0 shadow-none hover:bg-white focus:outline-none focus:ring-0"
        onClick={handleCopy}
        aria-label="Copy commands"
        title={copied ? 'Copied' : 'Copy'}
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
      </button>

      <div className="p-4 font-mono text-sm text-gray-800 space-y-2">
        {commands.map((c, i) => (
          <div key={i} className="whitespace-pre">{c}</div>
        ))}
      </div>
    </div>
  )
}

export default CopyCode
