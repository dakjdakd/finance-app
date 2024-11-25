'use client'

import { ReactNode } from 'react'
import { TransactionProvider } from '@/contexts/transaction-context'
import { BudgetProvider } from '@/contexts/budget-context'
import { UserProvider } from '@/contexts/UserContext'
import { NavigationWrapper } from '@/components/navigation-wrapper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <BudgetProvider>
        <TransactionProvider>
          {children}
          <NavigationWrapper />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </TransactionProvider>
      </BudgetProvider>
    </UserProvider>
  )
} 