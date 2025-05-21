import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'             // ← 新增

export default defineConfig({
  resolve: {
    alias: {
      // 在代码里用 @ 就能映射到 /src 目录
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue()],
})
