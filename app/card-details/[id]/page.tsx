'use client'

import { Card } from "@/components/card"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

interface CardDetails {
  id: string
  type: string
  number: string
  balance: number
  color: string
  currency: string
  expiryDate: string
  securityCode: string
  creditLimit?: number
  availableCredit?: number
  billDate?: string
  repaymentDate?: string
  pointsBalance?: number
}

export default function CardDetailsPage() {
  const params = useParams()
  const [card, setCard] = useState<CardDetails | null>(null)

  useEffect(() => {
    // 模拟从API获取卡片数据
    const mockCards: Record<string, CardDetails> = {
      '1': {
        id: '1',
        type: "储蓄卡",
        number: "**** **** **** 8888",
        balance: 25680.50,
        color: "#000000",
        currency: "¥",
        expiryDate: "07/25",
        securityCode: "***"
      },
      '2': {
        id: '2',
        type: "信用卡",
        number: "**** **** **** 6666",
        balance: 50000.00,
        color: "#1a1a1a",
        currency: "¥",
        expiryDate: "09/26",
        securityCode: "***",
        creditLimit: 50000.00,
        availableCredit: 38000.00,
        billDate: "每月3日",
        repaymentDate: "每月20日",
        pointsBalance: 5680
      }
    }
    
    setCard(mockCards[params.id as string] || null)
  }, [params.id])

  if (!card) {
    return <div>加载中...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto max-w-md p-4">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link href="/home" className="inline-flex items-center text-black">
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
        </div>

        {/* 卡片 */}
        <div className="mb-6">
          <Card card={card} />
        </div>

        {/* 信用卡信息 */}
        {card.type === "信用卡" && (
          <div className="mb-6 rounded-2xl bg-black p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/60">可用额度</p>
                <p className="text-lg font-medium text-white">
                  ¥{card.availableCredit?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">信用额度</p>
                <p className="text-lg font-medium text-white">
                  ¥{card.creditLimit?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${((card.creditLimit! - card.availableCredit!) / card.creditLimit!) * 100}%`
                }}
              />
            </div>
          </div>
        )}

        {/* 快捷操作 */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {card.type === "信用卡" ? (
            <>
              <button className="flex items-center justify-center space-x-2 rounded-xl bg-black p-3 text-white">
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
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>还款</span>
              </button>
              <button className="flex items-center justify-center space-x-2 rounded-xl bg-black p-3 text-white">
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
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                <span>账单查询</span>
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center justify-center space-x-2 rounded-xl bg-black p-3 text-white">
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
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="M7 15h0M2 9h20" />
                </svg>
                <span>冻结卡片</span>
              </button>
              <button className="flex items-center justify-center space-x-2 rounded-xl bg-black p-3 text-white">
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
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 16h5v5" />
                </svg>
                <span>补办卡片</span>
              </button>
            </>
          )}
        </div>

        {/* 卡片详情 */}
        <div className="space-y-6">
          {/* 基本信息 */}
          <div className="rounded-2xl bg-black p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-medium text-white">卡片信息</h3>
              <button className="text-sm text-white/60">显示</button>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 py-3">
              <span className="text-sm text-white/60">卡号</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white">{card.number}</span>
                <button className="text-white/60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-white/60">有效期</span>
              <span className="text-sm text-white">{card.expiryDate}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 py-3">
              <span className="text-sm text-white/60">安全码</span>
              <span className="text-sm text-white">{card.securityCode}</span>
            </div>
          </div>

          {/* 信用卡特有信息 */}
          {card.type === "信用卡" && (
            <div className="rounded-2xl bg-black p-4">
              <h3 className="mb-4 text-base font-medium text-white">账单信息</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 py-3">
                  <span className="text-sm text-white/60">账单日</span>
                  <span className="text-sm text-white">{card.billDate}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-white/60">还款日</span>
                  <span className="text-sm text-white">{card.repaymentDate}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 py-3">
                  <span className="text-sm text-white/60">积分余额</span>
                  <span className="text-sm text-white">{card.pointsBalance?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 