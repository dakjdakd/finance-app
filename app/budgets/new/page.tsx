'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useBudget } from '@/contexts/budget-context'

const colorOptions = [
  { name: '红色', value: '#ef4444' },
  { name: '蓝色', value: '#4f46e5' },
  { name: '绿色', value: '#10b981' },
  { name: '紫色', value: '#8b5cf6' },
  { name: '橙色', value: '#f97316' }
]

export default function NewBudgetPage() {
  const router = useRouter()
  const { addBudget } = useBudget()
  const [budget, setBudget] = useState({
    name: '',
    category: '',
    amount: 0,
    color: colorOptions[0].value
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addBudget(budget)
    router.push('/budgets')
  }

  return (
    <div className="container mx-auto max-w-md p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">新建预算</h1>
        <Link href="/budgets" className="text-sm text-gray-500">
          取消
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm text-gray-600">预算名称</label>
          <input
            type="text"
            value={budget.name}
            onChange={(e) => setBudget({ ...budget, name: e.target.value, category: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">金额</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2 text-sm text-gray-500">¥</span>
            <input
              type="number"
              value={budget.amount}
              onChange={(e) => setBudget({ ...budget, amount: Number(e.target.value) })}
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 pl-7"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">颜色</label>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setBudget({ ...budget, color: color.value })}
                className={`h-10 w-10 rounded-lg ${
                  budget.color === color.value ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-2 text-white"
        >
          创建预算
        </button>
      </form>
    </div>
  )
} 