'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@/contexts/UserContext'
import { toast } from 'react-toastify'

interface UserProfile {
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
      format: 'before' | 'after'
    }
    dateFormat: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY'
    timeFormat: '24h' | '12h'
  }
}

export default function ProfilePage() {
  const {
    profile,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    changePassword,
    exportData,
    updatePreferences
  } = useUser()

  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile')

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  const handleSave = async () => {
    try {
      await updateProfile(profile)
      setShowSuccess(true)
      toast.success('保存成功！')
    } catch (err) {
      toast.error('保存失败，请重试。')
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await uploadAvatar(file)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('新密码和确认密码不匹配')
      return
    }
    try {
      await changePassword(passwordForm.oldPassword, passwordForm.newPassword)
      setShowPasswordModal(false)
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      // 错误已在context中处理
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center">加载中...</div>
  if (error) return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>
  if (!profile) return <div className="flex min-h-screen items-center justify-center">未找到用户资料</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto max-w-md p-4 pb-24">
        {/* 头部 */}
        <div className="mb-6">
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">个人资料</h1>
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

        {/* 标签页导航 */}
        <div className="mb-6 flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 text-sm font-medium ${
              activeTab === 'profile'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            基本信息
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-4 text-sm font-medium ${
              activeTab === 'preferences'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            偏好设置
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-4 text-sm font-medium ${
              activeTab === 'security'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            账户安全
          </button>
        </div>

        {/* 基本信息 */}
        {activeTab === 'profile' && (
          <>
            {/* 个人信息卡片 */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 rounded-2xl bg-black p-4">
                <button
                  onClick={handleAvatarClick}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-xl font-medium text-white hover:bg-white/30"
                >
                  {profile.avatar}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <div className="absolute bottom-0 right-0 rounded-full bg-black p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                    </svg>
                  </div>
                </button>
                <div>
                  <h2 className="text-lg font-medium text-white">{profile.name}</h2>
                  <p className="text-sm text-white/60">{profile.email}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                      profile.securityLevel === 'high' ? 'bg-green-500/20 text-green-300' :
                      profile.securityLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      安全等级: {
                        profile.securityLevel === 'high' ? '高' :
                        profile.securityLevel === 'medium' ? '中' : '低'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 基本信息设置 */}
            <div className="mb-6 space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="mb-4 text-base font-medium text-gray-900">基本信息</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">姓名</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">邮箱</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* 偏好设置 */}
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="mb-4 text-base font-medium text-gray-900">偏好设置</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">货币单位</p>
                      <p className="text-xs text-gray-500">选择您的默认货币</p>
                    </div>
                    <select
                      value={profile.currency}
                      onChange={(e) => updateProfile({ ...profile, currency: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50"
                    >
                      <option value="CNY">人民币 (¥)</option>
                      <option value="USD">美元 ($)</option>
                      <option value="EUR">欧元 (€)</option>
                      <option value="GBP">英镑 (£)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">语言</p>
                      <p className="text-xs text-gray-500">选择显示语言</p>
                    </div>
                    <select
                      value={profile.language}
                      onChange={(e) => updateProfile({ ...profile, language: e.target.value })}
                      disabled={!isEditing}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50"
                    >
                      <option value="zh-CN">简体中文</option>
                      <option value="en-US">English</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">通知提醒</p>
                      <p className="text-xs text-gray-500">接收重要通知和更新</p>
                    </div>
                    <button
                      onClick={() => updateProfile({ ...profile, notifications: !profile.notifications })}
                      disabled={!isEditing}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        profile.notifications ? 'bg-black' : 'bg-gray-200'
                      } disabled:opacity-50`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          profile.notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">深色模式</p>
                      <p className="text-xs text-gray-500">切换深色/浅色主题</p>
                    </div>
                    <button
                      onClick={() => updateProfile({ ...profile, darkMode: !profile.darkMode })}
                      disabled={!isEditing}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        profile.darkMode ? 'bg-black' : 'bg-gray-200'
                      } disabled:opacity-50`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          profile.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 偏好设置 */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            {/* 通知设置 */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-gray-900">通知设置</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">邮件通知</p>
                    <p className="text-xs text-gray-500">接收重要的账户和交易通知</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={profile?.preferences.emailNotifications}
                      onChange={e => updatePreferences({ emailNotifications: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">推送通知</p>
                    <p className="text-xs text-gray-500">接收实时的应用内推送通知</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={profile?.preferences.pushNotifications}
                      onChange={e => updatePreferences({ pushNotifications: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">月度报告</p>
                    <p className="text-xs text-gray-500">接收月度财务分析报告</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={profile?.preferences.monthlyReport}
                      onChange={e => updatePreferences({ monthlyReport: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">预算提醒</p>
                    <p className="text-xs text-gray-500">当接近预算限制时收到提醒</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={profile?.preferences.budgetAlerts}
                      onChange={e => updatePreferences({ budgetAlerts: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* 显示设置 */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-gray-900">显示设置</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">货币显示</label>
                  <select
                    value={profile?.preferences.currency.format}
                    onChange={e => updatePreferences({
                      currency: {
                        ...profile!.preferences.currency,
                        format: e.target.value as 'before' | 'after'
                      }
                    })}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  >
                    <option value="before">符号在前 (¥100)</option>
                    <option value="after">符号在后 (100¥)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">日期格式</label>
                  <select
                    value={profile?.preferences.dateFormat}
                    onChange={e => updatePreferences({
                      dateFormat: e.target.value as UserProfile['preferences']['dateFormat']
                    })}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">时间格式</label>
                  <select
                    value={profile?.preferences.timeFormat}
                    onChange={e => updatePreferences({
                      timeFormat: e.target.value as '24h' | '12h'
                    })}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  >
                    <option value="24h">24小时制</option>
                    <option value="12h">12小时制</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 账户安全 */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* 安全设置 */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-gray-900">账户安全</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 text-sm hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">修改密码</p>
                    <p className="text-xs text-gray-500">定期更换密码可以提高账户安全性</p>
                  </div>
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>

                <button
                  onClick={exportData}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3 text-sm hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">导出数据</p>
                    <p className="text-xs text-gray-500">下载您的个人数据备份</p>
                  </div>
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 退出登录按钮 */}
            <button className="w-full rounded-xl bg-red-600 py-3 text-sm font-medium text-white hover:bg-red-700">
              退出登录
            </button>
          </div>
        )}
      </main>

      {/* 修改密码模态框 */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h3 className="mb-4 text-lg font-medium">修改密码</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">当前密码</label>
                <input
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">新密码</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">确认新密码</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-black/90"
                >
                  确认修改
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}