import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom', // necesario para simular DOM en pruebas
        setupFiles: './src/setupTests.js', // archivo para configurar jest-dom
    },
    base: '/weatherInfo/',

});