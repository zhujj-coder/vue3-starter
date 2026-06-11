import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// loadEnv 仅在 vite.config.ts 中使用（服务端），不会暴露给客户端
// 第三个参数 '' 表示加载所有前缀的变量（默认只加载 VITE_）
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('[vite.config] mode:', mode)
  console.log('[vite.config] VITE_APP_TITLE:', env.VITE_APP_TITLE)

  return {
    // ─── plugins ───────────────────────────────────────────────
    plugins: [vue()],

    // ─── resolve.alias ─────────────────────────────────────────
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@comps': resolve(__dirname, 'src/components'),
      },
    },

    // ─── server ────────────────────────────────────────────────
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },

    // ─── build ─────────────────────────────────────────────────
    build: {
      target: 'es2022',
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
  }
})
