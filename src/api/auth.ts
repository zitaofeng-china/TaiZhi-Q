import request from '@/utils/request'
import type { ApiResponse } from '@/types/api'
import type { UserInfo } from '@/types/user'

// 登录请求参数
export interface LoginParams {
  username: string
  password: string
}

// 登录响应数据
export interface LoginResponse {
  token: string
  userInfo: UserInfo
  roles: string[]
}

// 用户信息响应数据
export interface UserInfoResponse {
  userInfo: UserInfo
  roles: string[]
}

/**
 * 用户登录
 */
export const loginApi = (data: LoginParams): Promise<ApiResponse<LoginResponse>> => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

/**
 * 获取当前用户信息
 */
export const getUserInfoApi = (): Promise<ApiResponse<UserInfoResponse>> => {
  return request({
    url: '/auth/userinfo',
    method: 'GET'
  })
}

/**
 * 用户登出
 */
export const logoutApi = (): Promise<ApiResponse<null>> => {
  return request({
    url: '/auth/logout',
    method: 'POST'
  })
}
