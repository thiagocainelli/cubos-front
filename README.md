# 🎬 Cubos Front - Sistema de Gerenciamento de Filmes

Sistema web moderno para gerenciamento completo de filmes, desenvolvido com React 19 e TypeScript. Permite cadastro, edição, visualização e gerenciamento de filmes com interface responsiva e funcionalidades avançadas.

## 🚀 Tecnologias Utilizadas

### **Frontend Core**

- **React 19.0.0** - Framework principal com hooks modernos
- **TypeScript 5.7.2** - Tipagem estática e desenvolvimento seguro
- **Vite 6.0.3** - Build tool rápido e moderno
- **React Router DOM 7.0.2** - Roteamento e navegação

### **UI & Styling**

- **Ant Design 5.22.4** - Componentes de interface profissionais
- **Tailwind CSS 3.4.16** - Framework CSS utilitário
- **PostCSS 8.4.49** - Processamento CSS avançado
- **Autoprefixer 10.4.20** - Compatibilidade cross-browser

### **Gerenciamento de Estado**

- **React Context API** - Gerenciamento de estado global
- **Custom Hooks** - Lógica reutilizável e organizada

### **HTTP & APIs**

- **Axios 1.7.9** - Cliente HTTP com interceptors
- **API Request Utils** - Sistema de requisições centralizado

### **Utilitários**

- **Day.js 1.11.15** - Manipulação de datas
- **Nookies 2.5.2** - Gerenciamento de cookies
- **Query String 9.1.1** - Parsing de URLs

### **Desenvolvimento**

- **ESLint 9.16.0** - Linting e qualidade de código
- **TypeScript ESLint** - Regras específicas para TypeScript

## 🛠️ Como Rodar o Projeto

### **Pré-requisitos**

- Node.js 18+
- npm ou yarn
- Backend da aplicação rodando

### **1. Clone o Repositório**

```bash
git clone [URL_DO_REPOSITORIO]
cd cubos-front
```

### **2. Instale as Dependências**

```bash
npm install
# ou
yarn install
```

### **3. Configure as Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

### **4. Execute o Projeto**

```bash
# Desenvolvimento
npm run dev
# ou
yarn dev

# Build de Produção
npm run build
# ou
yarn build

# Preview do Build
npm run preview
# ou
yarn preview
```

### **5. Acesse a Aplicação**

- **Desenvolvimento**: http://localhost:5173
- **Produção**: http://localhost:4173 (após build)

## 🎯 Funcionalidades Principais

### **🔐 Sistema de Autenticação**

- **Login/Registro** de usuários
- **JWT Token** com cookies seguros
- **Proteção de rotas** baseada em autenticação
- **Logout automático** em múltiplas abas

### **🎬 Gerenciamento de Filmes**

- **CRUD Completo** (Criar, Ler, Atualizar, Deletar)
- **Upload de Posters** com preview
- **Validação de dados** em tempo real
- **Formulários inteligentes** com máscaras

### **🔍 Sistema de Busca e Filtros**

- **Busca por texto** em título e sinopse
- **Filtros por situação** (upcoming, released, canceled)
- **Filtros por gênero** com seleção múltipla
- **Filtros por duração** com range
- **Paginação** configurável

### **🎨 Interface Responsiva**

- **Design System** consistente
- **Tema claro/escuro** com CSS variables
- **Componentes reutilizáveis** e customizáveis
- **Layout responsivo** para todos os dispositivos

### **📱 Componentes Customizados**

- **Button** - Botões com variantes e estados
- **Input** - Campos de texto com validação
- **Select** - Seletores com busca e múltipla seleção
- **DatePicker** - Input de data com máscara
- **CurrencyInput** - Campos monetários com máscaras
- **Toast** - Sistema de notificações
- **Modal** - Confirmações e formulários

## 🏗️ Arquitetura do Projeto

### **Estrutura de Pastas**

```
src/
├── components/          # Componentes reutilizáveis
│   ├── forms/          # Formulários específicos
│   ├── layout/         # Componentes de layout
│   └── index.ts        # Exportações centralizadas
├── contexts/           # Contextos React (Auth, Theme, Toast)
├── hooks/              # Custom hooks (useMovies)
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API
├── types/              # Definições TypeScript
├── utils/              # Utilitários e helpers
└── styles/             # Estilos globais e CSS
```

### **Padrões de Desenvolvimento**

- **Componentes funcionais** com hooks
- **TypeScript strict mode** para qualidade
- **ESLint** com regras personalizadas
- **Arquitetura modular** e escalável
- **Separação de responsabilidades** clara

### **Sistema de Estado**

- **AuthContext** - Autenticação e usuário
- **ThemeContext** - Tema da aplicação
- **ToastContext** - Notificações globais
- **useMovies** - Estado dos filmes e filtros

## 🔧 Configurações Especiais

### **Sistema de Requisições**

- **Interceptors** para autenticação
- **Retry automático** em falhas
- **Cancelamento** de requisições
- **Tratamento de erros** centralizado

## 🤝 Contribuição

### **Padrões de Código**

- **TypeScript strict** obrigatório
- **ESLint** configurado
- **Componentes funcionais** preferidos
- **Hooks customizados** para lógica complexa

### **Estrutura de Commits**

```
feat: nova funcionalidade
fix: correção de bug
refactor: refatoração de código
docs: documentação
style: formatação
test: testes
```

## 📄 Licença

Este projeto é desenvolvido para Cubos Tecnologia como teste técnico.

## 👨‍💻 Desenvolvedor

**Thiago Cainelli** - Desenvolvedor Full Stack

---

**🎬 Cubos Front** - Sistema moderno e robusto para gerenciamento de filmes!
