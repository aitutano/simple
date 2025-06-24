# Flow - Gerenciador de Tarefas

## 👤 Identificação/Autor

**Nome:** [Seu Nome Completo]
**Curso:** [Seu Curso]
**Disciplina:** [Nome da Disciplina]
**Professor:** [Nome do Professor]

## 📝 Descrição do Projeto

Flow é uma aplicação web responsiva de gerenciamento de tarefas inspirada no design e funcionalidades do Todoist. O projeto permite aos usuários organizar suas tarefas diárias, definir prioridades e acompanhar o progresso das atividades de forma intuitiva e eficiente.

### Tema e Escopo

- **Tema:** Gerenciamento pessoal de tarefas
- **Escopo:** Aplicação para uso pessoal com cadastro, listagem, edição e exclusão de tarefas
- **Inspiração:** [Todoist](https://todoist.com) - Design e experiência do usuário

## 🎨 Design e Prototipação

- **Prototipação no Figma:** [Link para o projeto no Figma - A ser criado]
- **Design System:** [Link para o documento do Design System - A ser criado]
- **Site de Inspiração:** [Todoist](https://todoist.com)

## 🛠️ Tecnologias Utilizadas

- **Framework CSS:** Bootstrap 5.3
- **Bibliotecas JavaScript:**
  - jQuery 3.7.1
  - jQuery Mask Plugin
  - Animate.css
- **API Fake:** JSON Server
- **Persistência:** Web Storage (localStorage/sessionStorage)
- **Web Components:** Lit (implementado mas não mais requisito essencial)

## 🌐 Link para o Site em Produção

[Link para GitHub Pages - A ser configurado]

## ✅ Checklist de Funcionalidades

### RA1 - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos

- [ ] **ID 00** - Prototipa interfaces adaptáveis para mobile e desktop no Figma
- [x] **ID 01** - Implementa layout responsivo com Framework CSS (Bootstrap)
- [x] **ID 02** - Utiliza Flexbox/Grid para layouts responsivos
- [x] **ID 03** - Utiliza componentes CSS e JavaScript do Framework
- [x] **ID 04** - Implementa layout fluido com unidades relativas
- [x] **ID 05** - Implementa animações (fadeIn/fadeOut, slideIn/slideOut)
- ⚪ **ID 06** - ~~Cria transições personalizadas entre estados~~ (Removido - não essencial)
- [x] **ID 07** - Aplica Design System consistente
- [x] **ID 08** - Implementa pré-processadores CSS (Sass)
- [x] **ID 09** - Aplica tipografia responsiva com media queries/clamp()
- [x] **ID 10** - Aplica técnicas de responsividade de imagens
- [x] **ID 11** - Otimiza imagens com formatos modernos (WebP)

### RA2 - Realizar tratamento de formulários e aplicar validações

- [x] **ID 12** - Implementa tratamento de formulários com mensagens de erro/sucesso
- [x] **ID 13** - Aplica expressões regulares (REGEX) para validações customizadas
- [x] **ID 14** - Incorpora elementos de listagem (checkbox, radio, select)
- [x] **ID 15** - Realiza escrita/leitura no Web Storage

### RA3 - Aplicar ferramentas para otimização do desenvolvimento

- [x] **ID 16** - Configura ambiente com Node.js e NPM
- ⚪ **ID 17** - ~~Utiliza linters (ESLint/Stylelint)~~ (Removido - não essencial)
- [x] **ID 18** - Adota boas práticas de versionamento (Git/GitHub)
- [x] **ID 19** - Organiza README.md conforme template
- ⚪ **ID 20** - ~~Utiliza técnicas de minificação e otimização~~ (Removido - não essencial)
- [x] **ID 21** - Organiza arquivos em estrutura modular
- ⚪ **ID 22** - ~~Utiliza metodologias BEM/SMACSS para CSS~~ (Removido - não essencial)

### RA4 - Aplicar bibliotecas JavaScript para interatividade

- [x] **ID 23** - Utiliza jQuery para manipulação do DOM
- [x] **ID 24** - Integra plugin jQuery (jQuery Mask Plugin)
- ⚪ **ID 25** - ~~Utiliza bibliotecas de web components (Lit)~~ (Implementado mas removido dos requisitos essenciais)
- ⚪ **ID 26** - ~~Utiliza biblioteca de componentes prontos~~ (Removido - não essencial)

### RA5 - Efetuar requisições assíncronas para APIs

- [x] **ID 27** - Realiza requisições para API fake (persistir dados de formulário)
- [x] **ID 28** - Realiza requisições para API fake (exibir dados na página)

## 📱 Páginas da Aplicação

**Aplicação simplificada com foco nos requisitos essenciais:**

1. **Gerenciador de Tarefas (index.html)** - Página principal com lista completa de tarefas e CRUD completo
2. **Landing Page (landing.html)** - Página promocional com informações sobre o produto
3. **Tarefas (pages/tasks.html)** - Redirecionamento para página principal
4. **Login (pages/login.html)** - Autenticação de usuários
5. **Cadastro (pages/register.html)** - Criação de novas contas

## 🚀 Instruções de Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn

### Instalação

```bash
# Clone o repositório
git clone [URL-do-repositório]

# Entre no diretório
cd task-manager-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Em outro terminal, inicie a API fake
npm run json-server
```

### Acesso

- **Gerenciador de Tarefas:** http://localhost:3000/ (Página principal)
- **Landing Page:** http://localhost:3000/landing.html (Página promocional)
- **API Fake:** http://localhost:3001

### Credenciais de Teste

- **E-mail:** demo@flow.com
- **Senha:** demo123

## 📸 Telas da Aplicação

[Capturas de tela serão adicionadas aqui após implementação]

## 📁 Estrutura do Projeto

```
task-manager-app/
├── api/
│   └── db.json              # Banco de dados fake (JSON Server)
├── assets/
│   ├── css/
│   │   ├── style.css        # Estilos principais
│   │   ├── responsive.css   # Estilos responsivos
│   │   └── images.css       # Otimizações de imagem
│   ├── images/
│   │   ├── favicon.svg      # Favicon otimizado
│   │   ├── hero-task-preview.svg  # Imagem hero responsiva
│   │   └── no-tasks.svg     # Ilustração estado vazio
│   └── js/
│       ├── app.js           # JavaScript principal
│       └── image-optimization.js  # Otimização de imagens
├── components/
│   └── task-item.js         # Web Component para tarefas
├── pages/
│   ├── login.html           # Página de login
│   ├── register.html        # Página de registro
│   └── tasks.html           # Página de tarefas
├── landing.html             # Landing page principal
├── index.html               # Página inicial (app principal)
├── package.json             # Dependências e scripts
└── README.md                # Documentação
```

## 🎯 Funcionalidades Principais

### 🔐 Autenticação

- Login com validação
- Registro de usuários com formulário em etapas
- Recuperação de senha
- Sessão persistente

### 📋 Gerenciamento de Tarefas

- Criar, editar e excluir tarefas
- Definir prioridades (Alta, Média, Baixa)
- Status (Pendente, Em andamento, Concluída)
- Datas de vencimento
- Tags para organização
- Filtros avançados
- Busca em tempo real

### 🏠 Página Inicial Simplificada

- Acesso rápido às funcionalidades principais
- Interface limpa e focalizada
- Navegação intuitiva entre seções

### 🎨 Interface e UX

- Design inspirado no Todoist
- Totalmente responsivo
- Animações suaves
- Modo offline com sincronização
- Tema claro/escuro
- Acessibilidade (ARIA)

## 🔧 Recursos Técnicos

### Framework CSS

- Bootstrap 5.3 para componentes base
- CSS Grid e Flexbox para layouts
- Variáveis CSS para consistência
- Media queries para responsividade

### JavaScript Moderno

- ES6+ features
- Web Components com Lit
- Async/await para APIs
- Local Storage para persistência
- Validação em tempo real

### Performance & Otimização de Imagens

- **Lazy loading** de imagens com Intersection Observer
- **Imagens responsivas** com picture element e srcset
- **Formatos otimizados** SVG com fallbacks
- **Object-fit e containers** com unidades relativas
- **Detecção de WebP** automática
- **High DPI support** para displays Retina
- Debounce em buscas
- Otimização de assets

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

**Inspiração:** [Todoist](https://todoist.com) - Design e funcionalidades
**Desenvolvimento:** Projeto acadêmico individual
**Tecnologias:** HTML5, CSS3, JavaScript ES6+, Bootstrap 5
