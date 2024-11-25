'use client'

import Link from 'next/link'

// 模拟信用卡数据
const creditCards = [
  {
    id: '1',
    bank: '招商银行',
    type: '信用卡',
    number: '**** **** **** 8888',
    creditLimit: 50000,
    availableCredit: 30000,
    billDay: 5,
    repaymentDay: 25,
    color: '#1a237e'
  },
  {
    id: '2',
    bank: '中信银行',
    type: '信用卡',
    number: '**** **** **** 6666',
    creditLimit: 30000,
    availableCredit: 20000,
    billDay: 8,
    repaymentDay: 28,
    color: '#b71c1c'
  }
]

export default function CreditCardPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto max-w-md p-4">
        {/* 头部 */}
        <div className="mb-6">
          <Link href="/home" className="mb-4 inline-flex items-center text-black">
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
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-black">信用卡</h1>
        </div>

        {/* 信用卡列表 */}
        <div className="space-y-4">
          {creditCards.map(card => (
            <Link
              key={card.id}
              href={`/card-details/${card.id}`}
              className="block"
            >
              <div
                className="rounded-2xl p-6 text-white"
                style={{ backgroundColor: card.color }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-lg font-medium">{card.bank}</span>
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
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>

                <p className="mb-6 font-mono text-xl">{card.number}</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/60">可用额度</p>
                    <p className="text-lg font-medium">
                      ¥{card.availableCredit.toLocaleString()}
                    </p>
                  </div>

                  <div className="h-1 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white/80"
                      style={{
                        width: `${(card.availableCredit / card.creditLimit) * 100}%`
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-white/60">账单日</p>
                      <p>每月{card.billDay}日</p>
                    </div>
                    <div>
                      <p className="text-white/60">还款日</p>
                      <p>每月{card.repaymentDay}日</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 添加新卡按钮 */}
        <button className="mt-6 flex w-full items-center justify-center rounded-xl bg-black p-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          添加新卡
        </button>
      </main>
    </div>
  )
} 