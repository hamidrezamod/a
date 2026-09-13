import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * نام مخزن گیت‌هاب — برای انتشار روی GitHub Pages لازم است.
 * اگر روزی نام مخزن را عوض کردی یا دامنه اختصاصی (Custom Domain) وصل کردی،
 * این خط را به '/' تغییر بده.
 */
const REPOSITORY_NAME = 'portfolio';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // در حالت توسعه درخواست‌ها از ریشه سرو می‌شوند و در نسخه نهایی از مسیر مخزن
  base: command === 'build' ? `/${REPOSITORY_NAME}/` : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    // اجازه دسترسی از دامنه پیش‌نمایش سندباکس
    allowedHosts: true,
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // تصاویر بزرگ‌تر از ۴ کیلوبایت به‌صورت فایل جدا نگه داشته می‌شوند
    assetsInlineLimit: 4096,
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        // جداسازی منطقی بسته‌ها برای بارگذاری سبک‌تر و کش بهتر
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('marked')) return 'markdown';
          if (id.includes('react')) return 'react';
          return 'vendor';
        },
      },
    },
  },
}));
