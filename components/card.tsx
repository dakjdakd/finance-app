import { CardDetails } from "@/types"

interface CardProps {
  card: {
    id: string
    type: string
    number: string
    balance: number
    color?: string
    currency?: string
    expiryDate?: string
    securityCode?: string
  }
}

export function Card({ card }: CardProps) {
  return (
    <div 
      className="block overflow-hidden rounded-2xl p-4 text-white"
      style={{ backgroundColor: card.color || '#000000' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-white/60">{card.type}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      </div>
      <p className="mb-1 font-mono text-lg">{card.number}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">余额</span>
        <span className="font-medium">{card.currency || '¥'}{card.balance.toLocaleString()}</span>
      </div>
    </div>
  )
}

