'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface AnalyticsData {
  overallStats: {
    totalIncome: number
    totalExpense: number
    balance: number
    transactionCount: number
  }
  expenseByCategory: Record<string, number>
  incomeByCategory: Record<string, number>
  dailyTrends: Record<string, {
    income: number
    expense: number
  }>
  monthlyComparison: {
    currentMonth: {
      income: number
      expense: number
    }
    previousMonth: {
      income: number
      expense: number
    }
  }
}

export default function AnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')
  const [isChartReady, setIsChartReady] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    overallStats: {
      totalIncome: 25680.50,
      totalExpense: 18459.20,
      balance: 7221.30,
      transactionCount: 45
    },
    expenseByCategory: {
      '餐饮': 3500.00,
      '购物': 4200.50,
      '交通': 1200.00,
      '娱乐': 2100.00,
      '其他': 1500.00
    },
    incomeByCategory: {
      '工资': 20000.00,
      '理财': 3680.50,
      '其他': 2000.00
    },
    dailyTrends: {
      '周一': { income: 2000, expense: 500 },
      '周二': { income: 0, expense: 800 },
      '周三': { income: 3000, expense: 1200 },
      '周四': { income: 0, expense: 600 },
      '周五': { income: 15000, expense: 2000 }
    },
    monthlyComparison: {
      currentMonth: {
        income: 25680.50,
        expense: 18459.20
      },
      previousMonth: {
        income: 22450.30,
        expense: 16890.40
      }
    }
  })

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      setIsChartReady(true)
    }, 1000)
  }, [])

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += '¥' + context.raw.toFixed(2);
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          callback: function(value: any) {
            return '¥' + value.toFixed(0);
          }
        }
      }
    }
  }

  // 支出饼图数据
  const expensePieData = {
    labels: Object.keys(analyticsData.expenseByCategory),
    datasets: [
      {
        data: Object.values(analyticsData.expenseByCategory),
        backgroundColor: [
          '#ef4444',
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#8b5cf6'
        ],
        borderWidth: 0
      }
    ]
  }

  // 收支趋势图数据
  const trendData = {
    labels: Object.keys(analyticsData.dailyTrends),
    datasets: [
      {
        label: '收入',
        data: Object.values(analyticsData.dailyTrends).map(v => v.income),
        backgroundColor: '#10b981',
        borderRadius: 8,
        borderSkipped: false
      },
      {
        label: '支出',
        data: Object.values(analyticsData.dailyTrends).map(v => v.expense),
        backgroundColor: '#ef4444',
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  }

  // 计算环比变化
  const getGrowthRate = (current: number, previous: number) => {
    const rate = ((current - previous) / previous) * 100
    return rate.toFixed(1)
  }

  if (!isChartReady) {
    return (
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto max-w-4xl p-4">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">财务分析</h1>
            <Link href="/home" className="text-sm text-gray-500">
              返回首页
            </Link>
          </div>
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
              <p className="text-gray-500">正在加载分析数据...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto max-w-4xl p-4">
        {/* 头部 */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">财务分析</h1>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="year">本年</option>
            </select>
            <Link href="/home" className="text-sm text-gray-500">
              返回首页
            </Link>
          </div>
        </div>

        {/* 总体统计卡片 */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm text-gray-500">总收入</h3>
              <span className={`text-xs ${
                Number(getGrowthRate(
                  analyticsData.monthlyComparison.currentMonth.income,
                  analyticsData.monthlyComparison.previousMonth.income
                )) >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {getGrowthRate(
                  analyticsData.monthlyComparison.currentMonth.income,
                  analyticsData.monthlyComparison.previousMonth.income
                )}%
              </span>
            </div>
            <p className="text-xl font-bold text-green-600">
              ¥{analyticsData.overallStats.totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm text-gray-500">总支出</h3>
              <span className={`text-xs ${
                Number(getGrowthRate(
                  analyticsData.monthlyComparison.currentMonth.expense,
                  analyticsData.monthlyComparison.previousMonth.expense
                )) >= 0 ? 'text-red-500' : 'text-green-500'
              }`}>
                {getGrowthRate(
                  analyticsData.monthlyComparison.currentMonth.expense,
                  analyticsData.monthlyComparison.previousMonth.expense
                )}%
              </span>
            </div>
            <p className="text-xl font-bold text-red-600">
              ¥{analyticsData.overallStats.totalExpense.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm text-gray-500">结余</h3>
            <p className={`text-xl font-bold ${
              analyticsData.overallStats.balance >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              ¥{analyticsData.overallStats.balance.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm text-gray-500">交易笔数</h3>
            <p className="text-xl font-bold text-gray-900">
              {analyticsData.overallStats.transactionCount}
            </p>
          </div>
        </div>

        {/* 图表分析 */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* 支出分类饼图 */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-base font-medium text-gray-900">支出分类</h3>
            <div className="relative h-64">
              <Pie data={expensePieData} options={chartOptions} />
            </div>
          </div>

          {/* 收支趋势图 */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-base font-medium text-gray-900">收支趋势</h3>
            <div className="relative h-64">
              <Bar data={trendData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* 详细数据 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* 支出分类明细 */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-base font-medium text-gray-900">支出分类明细</h3>
            <div className="space-y-3">
              {Object.entries(analyticsData.expenseByCategory).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{category}</span>
                    <span className="text-xs text-gray-400">
                      {((amount / analyticsData.overallStats.totalExpense) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">¥{amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 收入分类明细 */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-base font-medium text-gray-900">收入分类明细</h3>
            <div className="space-y-3">
              {Object.entries(analyticsData.incomeByCategory).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{category}</span>
                    <span className="text-xs text-gray-400">
                      {((amount / analyticsData.overallStats.totalIncome) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">¥{amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}