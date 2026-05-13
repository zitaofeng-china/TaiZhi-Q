export interface User {
  id: string
  username: string
  email?: string
  phone?: string
  avatar?: string
  status: number
  roles: Role[]
}

export interface Role {
  roleId: string
  roleName: string
  roleCode: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  expiresIn: number
  userInfo: User
}
