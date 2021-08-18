import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

const alias = {
  '@': pathResolve("src")
}

// https://vitejs.dev/config/
export default ({ command }) => {
  const prodMock = true;
  return {
    base: './',
    resolve: {
      alias
    },
    server: {
      port: 3003,
      host: '0.0.0.0',
      open: true,
      proxy: { // 代理配置
        '/dev': 'https://www.fastmock.site/mock/48cab8545e64d93ff9ba66a87ad04f6b/'
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            
          }
        }
      }
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        watchFiles: true,
        injectCode: `
          import { setupProdMockServer } from '../mockProdServer';
          setupProdMockServer();
        `,
        logger: true,
      }),
    ]
  };
}
