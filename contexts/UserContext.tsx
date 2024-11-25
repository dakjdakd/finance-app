'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface UserProfile {
  name: string
  email: string
  avatar: string
  currency: string
  notifications: boolean
  darkMode: boolean
  language: string
  securityLevel: 'low' | 'medium' | 'high'
  preferences: {
    emailNotifications: boolean
    pushNotifications: boolean
    monthlyReport: boolean
    budgetAlerts: boolean
    currency: {
      code: string
      symbol: string
      format: 'before' | 'after'
    }
    dateFormat: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY'
    timeFormat: '24h' | '12h'
  }
}

interface UserContextType {
  profile: UserProfile | null
  loading: boolean
  error: string | null
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  uploadAvatar: (file: File) => Promise<void>
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>
  exportData: () => Promise<void>
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 初始化加载用户数据
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // TODO: 从后端API获取用户数据
        // const response = await fetch('/api/user/profile')
        // const data = await response.json()
        // setProfile(data)
        
        // 临时使用模拟数据
        setProfile({
          name: '吴彦祖',
          email: 'YZ@example.com',
          avatar: 'YZ',
          currency: 'CNY',
          notifications: true,
          darkMode: false,
          language: 'zh-CN',
          securityLevel: 'medium',
          preferences: {
            emailNotifications: true,
            pushNotifications: true,
            monthlyReport: true,
            budgetAlerts: true,
            currency: {
              code: 'CNY',
              symbol: '¥',
              format: 'before'
            },
            dateFormat: 'YYYY-MM-DD',
            timeFormat: '24h'
          }
        })
      } catch (err) {
        setError('加载用户数据失败')
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  // 更新用户资料
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      setLoading(true)
      // TODO: 调用后端API更新用户数据
      // await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   body: JSON.stringify(data)
      // })
      
      // 临时直接更新状态
      setProfile(prev => prev ? { ...prev, ...data } : null)
    } catch (err) {
      setError('更新用户资料失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 上传头像
  const uploadAvatar = async (file: File) => {
    try {
      setLoading(true)
      // TODO: 实现文件上传到后端
      // const formData = new FormData()
      // formData.append('avatar', file)
      // const response = await fetch('/api/user/avatar', {
      //   method: 'POST',
      //   body: formData
      // })
      // const data = await response.json()
      // setProfile(prev => prev ? { ...prev, avatar: data.avatarUrl } : null)
    } catch (err) {
      setError('上传头像失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 修改密码
  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setLoading(true)
      // TODO: 调用后端API修改密码
      // await fetch('/api/user/password', {
      //   method: 'PUT',
      //   body: JSON.stringify({ oldPassword, newPassword })
      // })
    } catch (err) {
      setError('修改密码失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 导出用户数据
  const exportData = async () => {
    try {
      setLoading(true)
      // TODO: 调用后端API获取导出数据
      // const response = await fetch('/api/user/export')
      // const blob = await response.blob()
      // const url = window.URL.createObjectURL(blob)
      // const a = document.createElement('a')
      // a.href = url
      // a.download = 'user-data.json'
      // a.click()
    } catch (err) {
      setError('导出数据失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = async (preferences: Partial<UserProfile['preferences']>) => {
    try {
      setLoading(true)
      // TODO: 调用后端API更新用户偏好设置
      // await fetch('/api/user/preferences', {
      //   method: 'PUT',
      //   body: JSON.stringify(preferences)
      // })
      setProfile(prev => 
        prev ? { ...prev, preferences: { ...prev.preferences, ...preferences } } : null
      )
    } catch (err) {
      setError('更新偏好设置失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        error,
        updateProfile,
        uploadAvatar,
        changePassword,
        exportData,
        updatePreferences
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
