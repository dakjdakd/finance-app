'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './navigation'

export function NavigationWrapper() {
  const pathname = usePathname()
  // 创建一个不显示导航栏的路由列表
  const hideNavRoutes = ['/']
  const showNav = !hideNavRoutes.includes(pathname)

  if (!showNav) return null
  return <Navigation />
} 