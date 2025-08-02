# Store Management System Frontend

Este é o frontend de um sistema de gestão de loja, desenvolvido em JavaScript puro (Vanilla JS) e HTML/CSS, com integração a uma API backend para gerenciamento de vendas, produtos, categorias, utilizadores e clientes.

## 🚀 Funcionalidades

- ✅ **Autenticação** - Login de utilizadores com JWT
- ✅ **Gestão de Produtos** - CRUD completo (criar, listar, editar, eliminar)
- ✅ **Gestão de Categorias** - CRUD completo
- ✅ **Gestão de Utilizadores** - Listar e gerenciar utilizadores ativos
- ✅ **Gestão de Vendas** - Registrar e listar vendas com controle de estoque
- ✅ **Interface Responsiva** - Funciona em desktop e mobile
- ✅ **Deploy Automático** - Publicado no GitHub Pages

## 📁 Estrutura do Projeto

```
store-management-system-frontend/
├── src/                    # Código fonte
│   ├── assets/
│   │   ├── css/            # Estilos (dashboard.css, global.css, login.css)
│   │   ├── js/             # Scripts utilitários (api.js, auth.js, dashboard.js)
│   │   └── img/            # Imagens
│   └── pages/              # Scripts JS de cada página
│       ├── vendas.js       # Lógica da página de vendas
│       ├── produtos.js     # Lógica da página de produtos
│       ├── categoria.js    # Lógica da página de categorias
│       ├── users.js        # Lógica da página de utilizadores
│       ├── login.js        # Lógica de autenticação
│       ├── logout.js       # Lógica de logout
│       └── main.js         # Script principal
├── docs/                   # Build para produção (GitHub Pages)
├── public/                 # Assets públicos (favicon.ico)
├── package.json            # Dependências e scripts
├── vite.config.js          # Configuração do Vite
├── README.md               # Este arquivo
└── LICENSE                 # Licença MIT
```

## 🛠️ Pré-requisitos

- Node.js (recomendado v16+)
- npm (gerenciador de pacotes)

## 📦 Instalação

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/emanuelsoares97/store-management-system-frontend.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd store-management-system-frontend
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

## 🚀 Como rodar o projeto

### **Desenvolvimento:**
```bash
npm run dev
```
O Vite irá mostrar o endereço local (geralmente http://localhost:5173) para acessar o sistema no navegador.

### **Produção:**
```bash
npm run build
```
Gera os arquivos otimizados na pasta `docs/` para deploy no GitHub Pages.

## 🌐 Deploy

O projeto está configurado para deploy automático no GitHub Pages:
- **URL:** https://emanuelsoares97.github.io/store-management-system-frontend/
- **Fonte:** Pasta `docs/` (build otimizado)
- **Branch:** main

## 🔧 Configuração de API

O frontend está configurado para consumir a API backend hospedada em:
```
https://store-management-system-xemr.onrender.com/api/
```

### **Endpoints principais:**
- `POST /api/auth/login` - Autenticação
- `GET /api/product/active` - Listar produtos
- `POST /api/product/new` - Criar produto
- `GET /api/category/list` - Listar categorias
- `GET /api/sale/list` - Listar vendas
- `POST /api/sale/register` - Registrar venda
- `GET /api/user/actives` - Listar utilizadores ativos

## 🔐 Autenticação

- O sistema utiliza autenticação via token JWT armazenado no `localStorage`
- Para acessar as páginas protegidas, é necessário estar autenticado
- O token é automaticamente enviado em todas as requisições à API

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e responsividade
- **JavaScript (ES6+)** - Lógica e interações
- **Vite** - Build tool e servidor de desenvolvimento
- **GitHub Pages** - Deploy e hospedagem

## 📋 Roadmap

Veja o arquivo `roadmapmvp.txt` para funcionalidades planejadas e em desenvolvimento.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Emanuel Soares**
- GitHub: [@emanuelsoares97](https://github.com/emanuelsoares97)
- Email: [seu-email@exemplo.com]

## 🙏 Agradecimentos

- API backend desenvolvida em Flask/Python
- Deploy e hospedagem no GitHub Pages
- Ferramentas de desenvolvimento: Vite, npm

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!**
