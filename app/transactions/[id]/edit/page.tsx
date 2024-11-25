'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransaction } from '@/contexts/transaction-context'

export default function EditTransactionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { transactions, updateTransaction } = useTransaction()
  const [transaction, setTransaction] = useState({
    type: 'expense' as const,
    amount: '',
    category: '',
    description: '',
    date: ''
  })

  useEffect(() => {
    const currentTransaction = transactions.find(t => t.id === params.id)
    if (currentTransaction) {
      setTransaction({
        type: currentTransaction.type,
        amount: currentTransaction.amount.toString(),
        category: currentTransaction.category,
        description: currentTransaction.description,
        date: currentTransaction.date
      })
    } else {
      router.push('/transactions')
    }
  }, [params.id, transactions, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateTransaction(params.id, {
      ...transaction,
      amount: Number(transaction.amount)
    })
    router.push('/transactions')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto max-w-md p-4">
        <div className="mb-6">
          <Link href="/transactions" className="mb-4 inline-flex items-center text-black">
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
          <h1 className="text-2xl font-bold text-gray-900">编辑交易</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">交易类型</label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setTransaction({ ...transaction, type: 'expense' })}
                    className={`rounded-lg px-4 py-2 text-sm ${
                      transaction.type === 'expense'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    支出
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransaction({ ...transaction, type: 'income' })}
                    className={`rounded-lg px-4 py-2 text-sm ${
                      transaction.type === 'income'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    收入
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">金额</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2 text-sm text-gray-500">¥</span>
                  <input
                    type="number"
                    value={transaction.amount}
                    onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pl-7 text-sm"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">分类</label>
                <select
                  value={transaction.category}
                  onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                  required
                >
                  <option value="">选择分类</option>
                  {transaction.type === 'expense' ? (
                    <>
                      <option value="餐饮">餐饮</option>
                      <option value="购物">购物</option>
                      <option value="交通">交通</option>
                      <option value="娱乐">娱乐</option>
                    </>
                  ) : (
                    <>
                      <option value="工资">工资</option>
                      <option value="奖金">奖金</option>
                      <option value="投资">投资</option>
                      <option value="其他">其他</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">描述</label>
                <input
                  type="text"
                  value={transaction.description}
                  onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                  placeholder="添加描述"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">日期</label>
                <input
                  type="date"
                  value={transaction.date}
                  onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white"
          >
            保存更改
          </button>
        </form>
      </main>
    </div>
  )
} 