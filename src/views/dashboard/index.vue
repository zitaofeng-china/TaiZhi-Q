<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <h1>欢迎使用台智后台管理系统</h1>
      <p class="welcome-text">
        您好，{{ userStore.userInfo?.username || '用户' }}！
        当前时间：{{ currentTime }}
      </p>
    </div>
    
    <el-row :gutter="20" class="stats-row">
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: #409eff;">
              <el-icon :size="32"><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">1,234</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: #67c23a;">
              <el-icon :size="32"><Document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">5,678</div>
              <div class="stat-label">文档数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: #e6a23c;">
              <el-icon :size="32"><Message /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">890</div>
              <div class="stat-label">消息通知</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" style="background-color: #f56c6c;">
              <el-icon :size="32"><Warning /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">12</div>
              <div class="stat-label">待处理任务</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" class="content-row">
      <el-col :xs="24" :md="16">
        <el-card class="content-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>快速入口</span>
            </div>
          </template>
          <div class="quick-links">
            <el-button type="primary" :icon="Plus">新建用户</el-button>
            <el-button type="success" :icon="Upload">导入数据</el-button>
            <el-button type="warning" :icon="Download">导出报表</el-button>
            <el-button type="info" :icon="Setting">系统设置</el-button>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :md="8">
        <el-card class="content-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>系统信息</span>
            </div>
          </template>
          <div class="system-info">
            <div class="info-item">
              <span class="info-label">系统版本：</span>
              <span class="info-value">v1.0.0</span>
            </div>
            <div class="info-item">
              <span class="info-label">Node版本：</span>
              <span class="info-value">v18.x</span>
            </div>
            <div class="info-item">
              <span class="info-label">Vue版本：</span>
              <span class="info-value">v3.4.x</span>
            </div>
            <div class="info-item">
              <span class="info-label">运行环境：</span>
              <span class="info-value">{{ mode }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { User, Document, Message, Warning, Plus, Upload, Download, Setting } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 当前时间
const currentTime = ref('')
let timer: number | null = null

// 运行环境
const mode = import.meta.env.MODE

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped lang="scss">
.dashboard-container {
  .welcome-section {
    margin-bottom: 24px;
    padding: 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    color: #fff;
    
    h1 {
      margin: 0 0 12px;
      font-size: 28px;
      font-weight: 600;
    }
    
    .welcome-text {
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
    }
  }
  
  .stats-row {
    margin-bottom: 24px;
    
    .stat-card {
      margin-bottom: 20px;
      
      :deep(.el-card__body) {
        padding: 20px;
      }
      
      .stat-content {
        display: flex;
        align-items: center;
        gap: 16px;
        
        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 8px;
          color: #fff;
        }
        
        .stat-info {
          flex: 1;
          
          .stat-value {
            font-size: 28px;
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
          }
          
          .stat-label {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
  
  .content-row {
    .content-card {
      margin-bottom: 20px;
      
      .card-header {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
      
      .quick-links {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        
        .el-button {
          flex: 1;
          min-width: 120px;
        }
      }
      
      .system-info {
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
          
          &:last-child {
            border-bottom: none;
          }
          
          .info-label {
            font-size: 14px;
            color: #666;
          }
          
          .info-value {
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .dashboard-container {
    .welcome-section {
      padding: 20px;
      
      h1 {
        font-size: 22px;
      }
      
      .welcome-text {
        font-size: 14px;
      }
    }
    
    .quick-links {
      .el-button {
        flex: 1 1 100%;
      }
    }
  }
}
</style>
