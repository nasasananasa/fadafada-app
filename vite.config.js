import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // تفعيل history fallback لتجنب أخطاء 404 عند إعادة تحميل الصفحات
    historyApiFallback: true
  }
});
