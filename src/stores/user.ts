import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'

export interface UserState {
  token: string
  userInfo: UserInfo | null
  roles: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    userInfo: null,
    roles: []
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token,
    hasRole: (state) => {
      return (role: string): boolean => state.roles.includes(role)
    }
  },

  actions: {
    // 登录
    async login(username: string, password: string) {
      try {
        // 这里会在Task 6中实现API调用
        // 暂时返回模拟数据结构
        const response = await import('@/api/auth').then(module => 
          module.loginApi({ username, password })
        )
        
        if (response.code === 200 && response.data) {
          this.token = response.data.token
          this.userInfo = response.data.userInfo
          this.roles = response.data.roles || []
          
          // 持久化token到localStorage
          localStorage.setItem('token', this.token)
          
          return response
        }
        
        throw new Error(response.message || '登录失败')
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        const response = await import('@/api/auth').then(module => 
          module.getUserInfoApi()
        )
        
        if (response.code === 200 && response.data) {
          this.userInfo = response.data.userInfo
          this.roles = response.data.roles || []
          return response
        }
        
        throw new Error(response.message || '获取用户信息失败')
      } catch (error) {
        console.error('Get user info error:', error)
        throw error
      }
    },

    // 登出
    async logout() {
      try {
        // 调用登出API
        await import('@/api/auth').then(module => module.logoutApi())
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        // 无论API调用成功与否，都清除本地状态
        this.token = ''
        this.userInfo = null
        this.roles = []
        localStorage.removeItem('token')
      }
    },

    // 重置状态
    resetState() {
      this.token = ''
      this.userInfo = null
      this.roles = []
      localStorage.removeItem('token')
    }
  }
})
