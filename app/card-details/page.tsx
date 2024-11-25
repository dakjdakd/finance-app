'use client'

import { Card } from "@/components/card"
import Link from "next/link"

const card = {
  type: "储蓄卡",
  number: "8421",
  balance: 13528.31,
  currency: "¥"
}

export default function CardDetailsPage() {
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

        {/* 快捷操作 */}
        <div className="mb-6 grid grid-cols-2 gap-4">
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
        </div>

        {/* 卡片详情 */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-black p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-medium text-white">卡片信息</h3>
              <button className="text-sm text-white/60">显示</button>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 py-3">
              <span className="text-sm text-white/60">卡号</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white">•••• •••• •••• 8421</span>
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
              <span className="text-sm text-white">07/25</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 py-3">
              <span className="text-sm text-white/60">安全码</span>
              <span className="text-sm text-white">•••</span>
            </div>
          </div>

          {/* 额度信息 */}
          <div className="rounded-2xl bg-black p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-medium text-white">额度信息</h3>
              <button className="text-sm text-white/60">调整</button>
            </div>
            <div className="space-y-3">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 bg-blue-600" />
              </div>
              <p className="text-sm text-white/60">
                本月剩余额度:¥66666666666
              </p>
            </div>
          </div>

          {/* 卡片设置 */}
          <div className="rounded-2xl bg-black p-4">
            <h3 className="mb-4 text-base font-medium text-white">卡片设置</h3>
            <div className="space-y-4">
              <button className="flex w-full items-center justify-between py-2">
                <span className="text-sm text-white">在线支付</span>
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
                  className="text-white/60"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <button className="flex w-full items-center justify-between py-2">
                <span className="text-sm text-white">交易限额</span>
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
                  className="text-white/60"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <button className="flex w-full items-center justify-between py-2">
                <span className="text-sm text-white">安全设置</span>
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
                  className="text-white/60"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

