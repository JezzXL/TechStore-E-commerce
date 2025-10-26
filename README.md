# 🛒 TechStore - E-commerce Completo

<div align="center">

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=for-the-badge)

**E-commerce moderno e completo de tecnologia com React, TypeScript e Tailwind CSS 4**

[Demo ao Vivo](#) • [Reportar Bug](../../issues) • [Solicitar Feature](../../issues)

</div>

---

## ✨ Features

### 🛍️ Funcionalidades Principais
- ✅ **Catálogo de Produtos** - Grid responsivo com cards animados
- ✅ **Navegação por Categorias** - 8 categorias organizadas com contador de produtos
- ✅ **Filtros Avançados** - Por categoria, preço e avaliação
- ✅ **Carrinho de Compras** - Gerenciamento completo com persistência
- ✅ **Sistema de Favoritos** - Salvar produtos com localStorage
- ✅ **Autenticação** - Sistema de login e cadastro
- ✅ **Dark Mode** - Tema claro e escuro com persistência
- ✅ **Busca em Tempo Real** - Encontre produtos rapidamente

### 🎨 Design & UX
- 🎭 **Animações Suaves** - Framer Motion para transições elegantes
- 📱 **Totalmente Responsivo** - Mobile-first design
- 🌓 **Dark/Light Theme** - Alternância suave entre temas com detecção automática
- ♿ **Acessível** - Seguindo boas práticas de acessibilidade
- ⚡ **Performance Otimizada** - Lazy loading e animações otimizadas
- 🎯 **Hero Section** - Landing page atrativa com call-to-actions

### 🔧 Tecnologia
- 🏪 **Gerenciamento de Estado** - Zustand com persistência em localStorage
- 🎯 **Roteamento** - React Router DOM v7
- 🎨 **Estilização** - Tailwind CSS v4 (nova sintaxe @import)
- 📦 **Build Tool** - Vite 7
- 🔒 **Type Safety** - TypeScript strict mode
- 🎬 **Animações** - Framer Motion para micro-interações
- 🎨 **Ícones** - Lucide React (modernos e otimizados)

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- npm, yarn ou pnpm

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/techstore-ecommerce.git
cd techstore-ecommerce

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:5173
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Gera build otimizado
npm run preview      # Preview do build de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## 📁 Estrutura do Projeto

```
techstore-ecommerce/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── header.tsx      # Cabeçalho com navegação e busca
│   │   └── ProductCard.tsx # Card de produto com favoritos
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.tsx        # Landing page com hero e destaques
│   │   ├── Products.tsx    # Catálogo com filtros
│   │   ├── Categories.tsx  # Grid de categorias (NOVO!)
│   │   ├── Cart.tsx        # Carrinho de compras
│   │   ├── Favorites.tsx   # Lista de favoritos
│   │   └── Login.tsx       # Login e cadastro
│   ├── stores/             # Estado global (Zustand)
│   │   ├── useCartStore.ts      # Store do carrinho
│   │   └── useFavoritesStore.ts # Store dos favoritos
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts        # Definições de tipos
│   ├── data/               # Dados mockados
│   │   └── products.ts     # 12 produtos pré-cadastrados
│   ├── App.tsx             # Componente raiz com rotas
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globais + Tailwind
├── public/                 # Assets estáticos
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Funcionalidades Detalhadas

### 1. Página Inicial (Home)
- **Hero Section** com gradiente animado e CTA
- **Features** com ícones (Frete Grátis, Compra Segura, Parcelas, Suporte)
- **Categorias em Destaque** com imagens e contadores
- **Produtos em Destaque** - Top 6 mais vendidos
- **Newsletter** com formulário de inscrição

### 2. Catálogo de Produtos
- Grid responsivo (1/2/3/4 colunas)
- Cards com:
  - Imagem do produto
  - Nome, descrição, categoria
  - Preço e parcelamento
  - Rating com estrelas
  - Badge de estoque baixo
  - Botão de favoritos
  - Botão adicionar ao carrinho
- Filtros sidebar:
  - Por categoria
  - Faixa de preço (min/max)
  - Ordenação (nome, preço, rating)
- Filtros mobile em modal deslizante

### 3. Página de Categorias (NOVO!)
- **8 Categorias organizadas**:
  - 📱 Eletrônicos
  - 🎧 Áudio
  - 🖥️ Monitores
  - ⌨️ Periféricos
  - 📷 Fotografia
  - 💾 Armazenamento
  - ⌚ Wearables
  - 🎮 Gaming
- Cards com:
  - Imagem representativa
  - Gradiente overlay colorido
  - Ícone da categoria
  - Contador de produtos
  - Link direto para filtro
- Animações de hover e entrada
- CTA para contato e todos os produtos

### 4. Carrinho de Compras
- Lista completa de itens
- Controles de quantidade (+/-)
- Remoção de itens
- Cálculo automático:
  - Subtotal
  - Frete (grátis acima de R$ 500)
  - Total final
- Indicador de progresso para frete grátis
- Resumo sticky no desktop
- Badges de pagamento (Visa, Master, PIX)
- Persistência em localStorage

### 5. Sistema de Favoritos
- Botão de coração nos cards
- Página dedicada com grid
- Contador no header
- Persistência em localStorage
- Animações ao adicionar/remover
- CTA para continuar comprando

### 6. Autenticação
- **Login** com email e senha
- **Cadastro** com validação de campos
- Toggle entre login/cadastro
- Validação de email
- Confirmação de senha
- Toggle de visibilidade da senha
- Design moderno com gradientes
- Redirecionamento após login
- Cards informativos (100% Seguro, Frete Grátis, Suporte 24/7)

### 7. Dark Mode
- Toggle no header (☀️/🌙)
- Detecção automática de preferência do sistema
- Persistência em localStorage
- Transições suaves em todos os elementos
- Cores otimizadas para ambos os temas

### 8. Header
- Logo e nome da loja
- Barra de busca (desktop)
- Links de navegação
- Ícones com badges:
  - Favoritos (contador)
  - Carrinho (contador)
  - Usuário/Login
  - Theme toggle
- Menu mobile hamburger
- Sticky no scroll

### 9. Footer
- 4 colunas:
  - Sobre a TechStore
  - Links de categorias
  - Links de ajuda
  - Redes sociais
- Copyright dinâmico
- Design responsivo

## 📊 Dados dos Produtos

O projeto vem com **12 produtos** mockados incluindo:

| Categoria | Produtos |
|-----------|----------|
| 📱 Eletrônicos | Smartphone Premium X1, Notebook Gamer Ultra, Tablet Pro 12" |
| 🎧 Áudio | Fone Bluetooth Pro, Caixa de Som Bluetooth |
| ⌨️ Periféricos | Teclado Mecânico RGB, Mouse Gamer Wireless, Webcam Full HD Pro |
| 🖥️ Monitores | Monitor 4K Ultra HD |
| ⌚ Wearables | Smartwatch Fitness |
| 📷 Fotografia | Câmera DSLR 4K |
| 💾 Armazenamento | SSD NVMe 1TB |

**Cada produto possui:**
- ID único
- Nome, descrição detalhada
- Preço (R$)
- Categoria
- Estoque (unidades)
- Rating (1-5 estrelas)
- Número de reviews
- Imagem de alta qualidade (Unsplash)

## 🎨 Personalização

### Cores do Tema

Edite `src/index.css`:

```css
@theme {
  --color-primary: #3b82f6;    /* Azul principal */
  --color-secondary: #8b5cf6;  /* Roxo secundário */
}
```

### Adicionar Novas Categorias

Edite `src/pages/Categories.tsx`:

```typescript
const categories = [
  {
    name: 'Nova Categoria',
    slug: 'nova-categoria',
    icon: IconComponent,
    image: 'url-da-imagem',
    description: 'Descrição da categoria',
    color: 'from-color-500 to-color-700',
    count: 0,
  },
  // ... outras categorias
];
```

### Adicionar Produtos

Edite `src/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 13,
    name: 'Novo Produto',
    description: 'Descrição completa do produto...',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-xxxxx',
    category: 'Categoria',
    stock: 50,
    rating: 4.5,
    reviews: 100,
  },
  // ... mais produtos
];
```

## 🐛 Correções Implementadas

### v1.1.0 (Atual)
- ✅ **Fix: Erro de undefined nos stores** - Corrigido `.reduce()` em cart vazio
- ✅ **Fix: localStorage errors** - Adicionado tratamento de erros e validação
- ✅ **Fix: Array validation** - Validação `Array.isArray()` ao carregar dados
- ✅ **Feat: Página de Categorias** - Nova página com 8 categorias
- ✅ **Feat: Proteção de dados** - Valores padrão para evitar crashes

## 🚀 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Via CLI
npm install -g vercel
vercel
```

### Netlify

```bash
# Build
npm run build

# Arraste a pasta dist/ para Netlify Drop
# ou conecte o repositório GitHub
```

### GitHub Pages

```bash
# 1. Configure base no vite.config.ts
export default defineConfig({
  base: '/techstore-ecommerce/',
  plugins: [react(), tailwindcss()],
})

# 2. Build
npm run build

# 3. Deploy com gh-pages
npm install -g gh-pages
gh-pages -d dist
```

## 📈 Roadmap

### ✅ Concluído
- [x] Catálogo de produtos com filtros
- [x] Carrinho de compras funcional
- [x] Sistema de favoritos
- [x] Dark mode com persistência
- [x] Autenticação básica
- [x] Página de categorias
- [x] Design responsivo completo
- [x] Animações com Framer Motion

### 🚧 Em Desenvolvimento
- [ ] Página de detalhes do produto
- [ ] Sistema de busca funcional
- [ ] Checkout completo
- [ ] Histórico de pedidos

### 🎯 Próximas Features
- [ ] Integração com API real (backend)
- [ ] Sistema de pagamento (Stripe/PayPal)
- [ ] Sistema de reviews e comentários
- [ ] Painel administrativo
- [ ] Upload de imagens
- [ ] Sistema de cupons de desconto
- [ ] Tracking de pedidos
- [ ] Notificações push
- [ ] Chat de suporte
- [ ] Wishlist compartilhável
- [ ] Comparador de produtos
- [ ] Recomendações personalizadas

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Siga estes passos:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m '✨ feat: adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### Padrão de Commits

Seguimos o [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas gerais

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Davyd Willian**

- GitHub: [@davydwillian](https://github.com/JezzXL)
- LinkedIn: [Davyd Willian](https://linkedin.com/in/davydwillianp)

---

<div align="center">

### 💙 Gostou do projeto?

**⭐ Deixe uma estrela no repositório!**

Made with ❤️, ☕ and lots of 💻

**React 19 • TypeScript 5.9 • Tailwind CSS 4 • Zustand**

</div>