# 🛒 TechStore - E-commerce Completo

<div align="center">

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=for-the-badge)

**E-commerce moderno e completo com React, TypeScript e Tailwind CSS 4**

</div>

---

## ✨ Features

### 🛍️ Funcionalidades Principais
- ✅ **Catálogo de Produtos** - Grid responsivo com cards animados
- ✅ **Filtros Avançados** - Por categoria, preço e avaliação
- ✅ **Carrinho de Compras** - Gerenciamento completo de itens
- ✅ **Sistema de Favoritos** - Salvar produtos desejados
- ✅ **Busca em Tempo Real** - Encontre produtos rapidamente
- ✅ **Dark Mode** - Tema claro e escuro com persistência

### 🎨 Design & UX
- 🎭 **Animações Suaves** - Framer Motion para transições elegantes
- 📱 **Totalmente Responsivo** - Mobile-first design
- 🌓 **Dark/Light Theme** - Alternância suave entre temas
- ♿ **Acessível** - Seguindo WCAG 2.1
- ⚡ **Performance Otimizada** - Lazy loading e code splitting

### 🔧 Tecnologia
- 🏪 **Gerenciamento de Estado** - Zustand com persistência
- 🎯 **Roteamento** - React Router DOM v7
- 🎨 **Estilização** - Tailwind CSS v4 (nova sintaxe)
- 📦 **Build Tool** - Vite 7
- 🔒 **Type Safety** - TypeScript strict mode

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passo a Passo

```bash
# 1. Criar projeto com Vite
npm create vite@latest ecommerce-app -- --template react-ts

cd ecommerce-app

# 2. Instalar dependências base
npm install

# 3. Instalar bibliotecas adicionais
npm install @tailwindcss/vite lucide-react zustand framer-motion react-router-dom

# 4. Configurar Vite
# Edite vite.config.ts conforme mostrado abaixo
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### src/index.css

```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}
```

### Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
ecommerce-app/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx      # Cabeçalho com navegação
│   │   └── ProductCard.tsx # Card de produto
│   ├── pages/              # Páginas
│   │   ├── Home.tsx        # Página inicial
│   │   ├── Products.tsx    # Listagem de produtos
│   │   └── Cart.tsx        # Carrinho de compras
│   ├── stores/             # Estado global
│   │   └── useCartStore.ts # Zustand store
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Interfaces
│   ├── data/               # Dados mockados
│   │   └── products.ts     # Lista de produtos
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globais
├── public/                 # Assets estáticos
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Funcionalidades Detalhadas

### 1. Catálogo de Produtos
- Grid responsivo (1/2/3 colunas)
- Cards com imagem, preço, avaliação
- Hover effects e animações
- Badge de estoque baixo
- Botão de favoritos

### 2. Filtros
- **Categoria**: Todas, Eletrônicos, Áudio, etc
- **Preço**: Range min/max
- **Ordenação**: Nome, Preço (crescente/decrescente), Avaliação
- **Sidebar** fixa no desktop
- **Modal** no mobile

### 3. Carrinho
- Adicionar/Remover produtos
- Ajustar quantidades (+/-)
- Cálculo automático de subtotal
- Frete grátis acima de R$ 500
- Indicador de progresso para frete grátis
- Resumo do pedido

### 4. Dark Mode
- Toggle no header
- Persistência com localStorage
- Detecção de preferência do sistema
- Transições suaves

## 🛠️ Tecnologias Utilizadas

### Frontend Core
- **React 19.1** - Biblioteca UI
- **TypeScript 5.9** - Type safety
- **Vite 7.1** - Build tool ultra-rápida

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS
- **Framer Motion** - Animações
- **Lucide React** - Ícones SVG

### State Management
- **Zustand 4.5** - Estado global leve
- **Zustand Persist** - Persistência do carrinho

### Routing
- **React Router DOM 7.9** - Roteamento SPA

## 📊 Dados dos Produtos

O projeto vem com **12 produtos** mockados incluindo:
- Smartphones
- Notebooks
- Fones de ouvido
- Smartwatches
- Câmeras
- Periféricos (teclado, mouse)
- Monitores
- Tablets
- Caixas de som
- SSDs
- Webcams

Cada produto possui:
- Nome, descrição, preço
- Categoria, estoque
- Rating (1-5 estrelas)
- Número de reviews
- Imagem (Unsplash)

## 🎨 Personalização

### Cores

Edite `src/index.css`:

```css
@theme {
  --color-primary: #your-color;
  --color-secondary: #your-color;
}
```

### Adicionar Produtos

Edite `src/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 13,
    name: 'Novo Produto',
    description: 'Descrição...',
    price: 999.99,
    image: 'url-da-imagem',
    category: 'Categoria',
    stock: 50,
    rating: 4.5,
    reviews: 100,
  },
  // ... mais produtos
];
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Arraste a pasta dist/ para Netlify
```

### GitHub Pages

```bash
# Configure base no vite.config.ts
export default defineConfig({
  base: '/seu-repositorio/',
  plugins: [react(), tailwindcss()],
})

npm run build
```

## 📝 Próximos Passos

Features planejadas:
- [ ] Página de detalhes do produto
- [ ] Sistema de checkout completo
- [x] Autenticação de usuário
- [ ] Painel administrativo
- [ ] Integração com API real
- [ ] Sistema de pagamento (Stripe/PayPal)
- [ ] Sistema de reviews
- [ ] Wishlist persistente
- [ ] Histórico de pedidos
- [ ] Notificações
- [x] Sistema de favoritos
- [ ] Perfil de usuário

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para mais detalhes.

## 👤 Davyd Willian

Desenvolvido com ❤️ e ☕

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

Made with React 19, TypeScript 5.9 & Tailwind CSS 4

</div>
