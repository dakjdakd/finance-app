'use client'

import Link from 'next/link'
import { useBudget } from '@/contexts/budget-context'
import { useState, useMemo } from 'react'

export default function BudgetsPage() {
  const { budgets } = useBudget()
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [newBudget, setNewBudget] = useState({ category: '', amount: 0 })

  // 计算预算统计
  const budgetStats = useMemo(() => {
    const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0)
    const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0)
    const remainingBudget = totalBudget - totalSpent
    const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
    
    // 按类别统计
    const categoryStats = budgets.reduce((acc, budget) => {
      const percentage = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0
      acc[budget.category] = {
        amount: budget.amount,
        spent: budget.spent,
        remaining: budget.amount - budget.spent,
        percentage
      }
      return acc
    }, {} as Record<string, { amount: number, spent: number, remaining: number, percentage: number }>)

    // 预算警告
    const warnings = budgets
      .filter(budget => (budget.spent / budget.amount) * 100 > 80)
      .map(budget => ({
        category: budget.category,
        percentage: (budget.spent / budget.amount) * 100
      }))

    return {
      totalBudget,
      totalSpent,
      remainingBudget,
      spentPercentage,
      categoryStats,
      warnings
    }
  }, [budgets])

  const handleAddBudget = () => {
    // 这里应该调用 context 中的添加预算方法
    setShowAddBudget(false)
    setNewBudget({ category: '', amount: 0 })
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <main className="container mx-auto max-w-md p-4">
        {/* 头部 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
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
            <h1 className="text-2xl font-bold text-black">预算管理</h1>
          </div>
          <button className="rounded-full bg-black p-2 text-white">
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
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        {/* 总预算概览 */}
        <div className="mb-6 space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">总预算概览</h2>
            <div className="mb-2 flex justify-between text-sm">
              <span>总预算</span>
              <span>¥{budgetStats.totalBudget.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span>已使用</span>
              <span className={budgetStats.spentPercentage > 80 ? 'text-red-500' : ''}>
                ¥{budgetStats.totalSpent.toFixed(2)}
              </span>
            </div>
            <div className="mb-4 flex justify-between text-sm">
              <span>剩余</span>
              <span className="font-medium">¥{budgetStats.remainingBudget.toFixed(2)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all ${
                  budgetStats.spentPercentage > 80 ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(budgetStats.spentPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* 预算警告 */}
          {budgetStats.warnings.length > 0 && (
            <div className="rounded-xl bg-red-50 p-4">
              <h3 className="mb-2 font-medium text-red-800">预算警告</h3>
              <div className="space-y-1">
                {budgetStats.warnings.map(warning => (
                  <p key={warning.category} className="text-sm text-red-600">
                    {warning.category} 已使用 {warning.percentage.toFixed(1)}% 的预算
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 月份选择 */}
        <div className="mb-6">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full rounded-lg border p-2"
          />
        </div>

        {/* 预算列表 */}
        <div className="space-y-4">
          {budgets.map((budget) => (
            <Link 
              href={`/budgets/${budget.id}`} 
              key={budget.id} 
              className="block rounded-2xl bg-black p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="h-10 w-10 rounded-lg"
                    style={{ backgroundColor: budget.color }}
                  />
                  <div>
                    <h3 className="text-base font-medium text-white">{budget.name}</h3>
                    <p className="text-sm text-white/60">
                      剩余 ¥{(budget.amount - budget.spent).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {((budget.spent / budget.amount) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${(budget.spent / budget.amount) * 100}%`,
                    backgroundColor: budget.color,
                  }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-white/60">¥0</span>
                <span className="text-white">¥{budget.amount.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* 添加预算按钮 */}
        <div className="mt-6">
          <button
            onClick={() => setShowAddBudget(true)}
            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-black py-3 text-white"
          >
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
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>添加新预算</span>
          </button>
        </div>

        {/* 添加预算对话框 */}
        {showAddBudget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-80 rounded-2xl bg-white p-6">
              <h3 className="mb-4 text-lg font-medium">添加新预算</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">类别</label>
                  <input
                    type="text"
                    value={newBudget.category}
                    onChange={(e) => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-lg border p-2"
                    placeholder="输入预算类别"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">金额</label>
                  <input
                    type="number"
                    value={newBudget.amount}
                    onChange={(e) => setNewBudget(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="w-full rounded-lg border p-2"
                    placeholder="输入预算金额"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddBudget(false)}
                    className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAddBudget}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    添加
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 