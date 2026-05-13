<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-code">404</div>
      <div class="error-title">页面未找到</div>
      <div class="error-description">
        抱歉，您访问的页面不存在或已被删除
      </div>
      <el-button type="primary" size="large" @click="goHome">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.error-content {
  text-align: center;
  color: #fff;
  
  .error-code {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 20px;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .error-title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  .error-description {
    font-size: 16px;
    margin-bottom: 32px;
    opacity: 0.9;
  }
  
  .el-button {
    min-width: 160px;
  }
}

@media (max-width: 768px) {
  .error-content {
    .error-code {
      font-size: 80px;
    }
    
    .error-title {
      font-size: 24px;
    }
    
    .error-description {
      font-size: 14px;
    }
  }
}
</style>
