'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Budget {
  id: string
  name: string
  category: string
  amount: number
  spent: number
  color: string
}

// 添加默认预算数据
const defaultBudgets: Budget[] = [
  {
    id: '1',
    name: '日常开销',
    category: '日常开销',
    amount: 2000,
    spent: 850,
    color: '#ef4444'
  },
  {
    id: '2',
    name: '交通',
    category: '交通',
    amount: 500,
    spent: 320,
    color: '#4f46e5'
  },
  {
    id: '3',
    name: '娱乐',
    category: '娱乐',
    amount: 1000,
    spent: 450,
    color: '#10b981'
  }
]

interface BudgetContextType {
  budgets: Budget[]
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void
  updateBudget: (id: string, budget: Partial<Budget>) => void
  deleteBudget: (id: string) => void
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined)

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('budgets')
      return saved ? JSON.parse(saved) : defaultBudgets
    }
    return defaultBudgets
  })

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets))
  }, [budgets])

  const addBudget = (newBudget: Omit<Budget, 'id' | 'spent'>) => {
    setBudgets([
      ...budgets,
      {
        ...newBudget,
        id: Date.now().toString(),
        spent: 0
      }
    ])
  }

  const updateBudget = (id: string, updatedBudget: Partial<Budget>) => {
    setBudgets(budgets.map(budget => 
      budget.id === id ? { ...budget, ...updatedBudget } : budget
    ))
  }

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id))
  }

  return (
    <BudgetContext.Provider value={{ budgets, addBudget, updateBudget, deleteBudget }}>
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget() {
  const context = useContext(BudgetContext)
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider')
  }
  return context
} 