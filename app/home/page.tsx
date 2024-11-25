'use client'

import Link from 'next/link'
import { useTransaction } from '@/contexts/transaction-context'

export default function HomePage() {
  const { transactions } = useTransaction()

  // 计算快速统计数据
  const quickStats = {
    monthlyBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
  }

  // 获取当前月份的交易记录
  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthlyTransactions = transactions.filter(t => t.date.startsWith(currentMonth))

  monthlyTransactions.forEach(transaction => {
    if (transaction.type === 'income') {
      quickStats.monthlyIncome += transaction.amount
    } else {
      quickStats.monthlyExpense += transaction.amount
    }
  })

  quickStats.monthlyBalance = quickStats.monthlyIncome - quickStats.monthlyExpense

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto max-w-md p-4">
        <h1 className="mb-6 text-3xl font-bold text-black">首页</h1>
        
        {/* 快速统计卡片 */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-black p-6 text-white">
          <div className="mb-4">
            <h3 className="text-sm text-white/60">本月结余</h3>
            <p className="text-3xl font-bold">¥{quickStats.monthlyBalance.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60">收入</p>
              <p className="text-xl font-medium text-green-400">
                ¥{quickStats.monthlyIncome.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-white/60">支出</p>
              <p className="text-xl font-medium text-red-400">
                ¥{quickStats.monthlyExpense.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* 卡片区域 */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <Link
            href="/card-details"
            className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-4 text-white shadow-lg transition hover:shadow-xl"
          >
            <div className="mb-2">
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
            <h3 className="text-lg font-semibold">储蓄卡</h3>
            <p className="mt-1 text-sm text-white/80">查看详情</p>
          </Link>

          <Link
            href="/credit-card"
            className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 p-4 text-white shadow-lg transition hover:shadow-xl"
          >
            <div className="mb-2">
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
                <path d="M18 14h2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">信用卡</h3>
            <p className="mt-1 text-sm text-white/80">查看账单</p>
          </Link>
        </div>

        {/* 快捷操作按钮 */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/transactions/new"
            className="flex flex-col items-center rounded-xl bg-white p-4 shadow-lg transition hover:shadow-xl"
          >
            <div className="mb-2 rounded-full bg-black p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <span className="font-medium">记账</span>
          </Link>
          
          <Link
            href="/transactions"
            className="flex flex-col items-center rounded-xl bg-white p-4 shadow-lg transition hover:shadow-xl"
          >
            <div className="mb-2 rounded-full bg-black p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7 7 7-7" />
              </svg>
            </div>
            <span className="font-medium">明细</span>
          </Link>
        </div>
      </main>
    </div>
  )
}