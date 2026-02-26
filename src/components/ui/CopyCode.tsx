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
    <div className="glass overflow-hidden">
      <div className="p-4 font-mono text-sm text-gray-800 space-y-2 max-w-full overflow-x-auto">
        {commands.map((c, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">{c}</div>
        ))}
      </div>

      <div className="px-4 pb-4 pt-2 flex justify-end">
        <button
          className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-md text-gray-700 border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-0"
          onClick={handleCopy}
          aria-label="Copy commands"
          title={copied ? 'Copied' : 'Copy'}
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          <span className="text-xs">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  )
}

export default CopyCode