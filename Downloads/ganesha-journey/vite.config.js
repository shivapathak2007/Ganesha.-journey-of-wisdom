import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:'/Ganesha.-journey-of-wisdom/',server:{host:'0.0.0.0',port:4173,allowedHosts:true},build:{chunkSizeWarningLimit:1300,rollupOptions:{output:{manualChunks:{three:['three','@react-three/fiber','@react-three/drei']}}}}});
