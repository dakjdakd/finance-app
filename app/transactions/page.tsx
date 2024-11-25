'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useTransaction } from '@/contexts/transaction-context'

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransaction()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // 筛选、排序和搜索交易记录
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = filterType === 'all' || transaction.type === filterType
        const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory
        const matchesMonth = transaction.date.startsWith(selectedMonth)
        return matchesSearch && matchesType && matchesCategory && matchesMonth
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'desc' 
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime()
        } else {
          return sortOrder === 'desc' 
            ? b.amount - a.amount
            : a.amount - b.amount
        }
      })
  }, [transactions, searchTerm, filterType, filterCategory, selectedMonth, sortBy, sortOrder])

  // 计算统计数据
  const stats = useMemo(() => {
    const filtered = filteredTransactions
    const totalIncome = filtered
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const totalExpense = filtered
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    }
  }, [filteredTransactions])

  // 计算分析数据
  const analytics = useMemo(() => {
    const filtered = filteredTransactions
    const categoryTotals = filtered.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = { income: 0, expense: 0 }
      if (t.type === 'income') acc[t.category].income += t.amount
      else acc[t.category].expense += t.amount
      return acc
    }, {} as Record<string, { income: number, expense: number }>)

    const dailyTotals = filtered.reduce((acc, t) => {
      const date = t.date.split('T')[0]
      if (!acc[date]) acc[date] = { income: 0, expense: 0 }
      if (t.type === 'income') acc[date].income += t.amount
      else acc[date].expense += t.amount
      return acc
    }, {} as Record<string, { income: number, expense: number }>)

    return {
      categoryTotals,
      dailyTotals,
      averageTransaction: filtered.length > 0 
        ? filtered.reduce((sum, t) => sum + t.amount, 0) / filtered.length 
        : 0
    }
  }, [filteredTransactions])

  // 导出交易记录
  const exportTransactions = () => {
    const csvContent = [
      ['日期', '描述', '类别', '类型', '金额'].join(','),
      ...filteredTransactions.map(t => 
        [t.date, t.description, t.category, t.type, t.amount].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `transactions_${selectedMonth}.csv`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto max-w-md space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">交易记录</h1>
          <Link
            href="/transactions/new"
            className="rounded-full bg-blue-600 p-2 text-white"
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
          </Link>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-xs text-green-600">收入</p>
            <p className="mt-1 text-lg font-medium text-green-700">
              ¥{stats.totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-red-50 p-4">
            <p className="text-xs text-red-600">支出</p>
            <p className="mt-1 text-lg font-medium text-red-700">
              ¥{stats.totalExpense.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-xs text-blue-600">结余</p>
            <p className="mt-1 text-lg font-medium text-blue-700">
              ¥{stats.balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* 筛选工具栏 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="all">全部</option>
              <option value="income">收入</option>
              <option value="expense">支出</option>
            </select>
          </div>
          <input
            type="search"
            placeholder="搜索交易记录..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <select
                className="rounded-lg border p-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
              >
                <option value="date">按日期</option>
                <option value="amount">按金额</option>
              </select>
              <button
                className="rounded-lg border p-2 text-sm"
                onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '升序' : '降序'}
              </button>
            </div>
            <button
              onClick={exportTransactions}
              className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white"
            >
              导出
            </button>
          </div>
          <select
            className="w-full rounded-lg border p-2 text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">所有类别</option>
            {Array.from(new Set(transactions.map(t => t.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* 交易列表 */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center">
              <p className="text-gray-500">没有找到符合条件的交易记录</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '↓' : '↑'}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        transaction.type === 'income'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}¥
                      {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Link
                    href={`/transactions/${transaction.id}/edit`}
                    className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
                  >
                    编辑
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirm(transaction.id)}
                    className="rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 分析数据 */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-2 font-semibold">分析</h3>
          <div className="space-y-2 text-sm">
            <p>平均交易金额: ¥{analytics.averageTransaction.toFixed(2)}</p>
            <div>
              <p className="font-medium">按类别统计:</p>
              {Object.entries(analytics.categoryTotals).map(([category, totals]) => (
                <div key={category} className="ml-2 flex justify-between">
                  <span>{category}</span>
                  <span>
                    收入: ¥{totals.income.toFixed(2)} | 
                    支出: ¥{totals.expense.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 删除确认对话框 */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-80 rounded-2xl bg-white p-6">
              <h3 className="text-lg font-medium">确认删除</h3>
              <p className="mt-2 text-sm text-gray-500">
                确定要删除这条交易记录吗？此操作无法撤销。
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    deleteTransaction(showDeleteConfirm)
                    setShowDeleteConfirm(null)
                  }}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 