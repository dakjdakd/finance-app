'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useBudget } from '@/contexts/budget-context'

export default function BudgetDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { budgets, updateBudget, deleteBudget } = useBudget()
  const budget = budgets.find(b => b.id === params.id)

  const [isEditing, setIsEditing] = useState(false)
  const [editedBudget, setEditedBudget] = useState(budget)

  useEffect(() => {
    if (!budget) {
      router.push('/budgets')
    }
  }, [budget, router])

  if (!budget) return null

  const handleSave = () => {
    if (editedBudget) {
      updateBudget(budget.id, editedBudget)
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    deleteBudget(budget.id)
    router.push('/budgets')
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto max-w-md p-4">
        <div className="mb-6">
          <Link href="/budgets" className="mb-4 inline-flex items-center text-black">
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">预算详情</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-full bg-black p-2 text-white"
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* 预算信息 */}
          <div className="rounded-2xl bg-black p-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60">预算名称</label>
                  <input
                    type="text"
                    value={editedBudget?.name}
                    onChange={(e) => setEditedBudget({ ...editedBudget!, name: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">预算金额</label>
                  <input
                    type="number"
                    value={editedBudget?.amount}
                    onChange={(e) => setEditedBudget({ ...editedBudget!, amount: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full rounded-lg bg-blue-600 py-2 text-sm text-white"
                >
                  保存更改
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center space-x-3">
                  <div
                    className="h-10 w-10 rounded-lg"
                    style={{ backgroundColor: budget.color }}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-white">{budget.name}</h3>
                    <p className="text-sm text-white/60">
                      剩余 ¥{(budget.amount - budget.spent).toLocaleString()}
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
              </>
            )}
          </div>

          {/* 删除按钮 */}
          <button
            onClick={handleDelete}
            className="w-full rounded-xl bg-red-600 py-3 text-sm font-medium text-white"
          >
            删除预算
          </button>
        </div>
      </main>
    </div>
  )
} 