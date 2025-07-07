# Store Management System Frontend

Este é o frontend de um sistema de gestão de loja, desenvolvido em JavaScript puro (Vanilla JS) e HTML/CSS, com integração a uma API backend para gerenciamento de vendas, produtos, categorias, utilizadores e clientes.

## Funcionalidades
- Login de utilizadores
- Cadastro e listagem de produtos
- Cadastro e listagem de categorias
- Cadastro e listagem de utilizadores
- Registro e listagem de vendas
- Controle de estoque

## Estrutura de Pastas
```
store-management-system-frontend/
├── index.html                # Página inicial/login
├── vendas.html               # Página de vendas
├── users.html                # Página de utilizadores
├── categoria.html            # Página de categorias
├── produtos.html             # Página de produtos
├── src/
│   ├── assets/
│   │   ├── css/              # Arquivos de estilo (CSS)
│   │   └── img/              # Imagens
│   └── js/                   # Scripts utilitários (API, autenticação, dashboard)
│   └── pages/                # Scripts JS de cada página
├── public/                   # Arquivos públicos (favicon, etc)
├── main.js                   # Script principal
├── router.js                 # (Reservado para rotas futuras)
├── vite.config.js            # Configuração do Vite
├── package.json              # Dependências e scripts do projeto
├── README.md                 # Este arquivo
```

## Pré-requisitos
- Node.js (recomendado v16+)
- npm (gerenciador de pacotes)

## Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/emanuelsoares97/store-management-system-frontend.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd store-management-system-frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Como rodar o projeto
Você pode rodar o projeto em modo de desenvolvimento com Vite:
```bash
npm run dev
```
O Vite irá mostrar o endereço local (geralmente http://localhost:5173) para acessar o sistema no navegador.

## Configuração de API
O frontend está configurado para consumir a API backend hospedada em:
```
https://store-management-system-xemr.onrender.com/api/
```
Se desejar alterar a URL da API, edite os arquivos em `src/assets/js/api.js` e outros scripts de página conforme necessário.

## Observações
- O sistema utiliza autenticação via token JWT armazenado no `localStorage`.
- Para acessar as páginas protegidas, é necessário estar autenticado.
- O projeto utiliza HTML, CSS e JavaScript.

## Roadmap
Veja o arquivo `roadmapmvp.txt` para funcionalidades planejadas e em desenvolvimento.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
