import { defineConfig } from 'vite'

export default defineConfig({
  base: '/store-management-system-frontend/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'login.html',
        produtos: 'produtos.html',
        categoria: 'categoria.html',
        vendas: 'vendas.html',
        users: 'users.html'
      }
    }
  }
})
