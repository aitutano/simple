# TaskFlow - Gerenciador de Tarefas

## 👤 Identificação/Autor

**Nome:** [Seu Nome Completo]  
**Curso:** [Seu Curso]  
**Disciplina:** [Nome da Disciplina]  
**Professor:** [Nome do Professor]

## 📝 Descrição do Projeto

TaskFlow é uma aplicação web responsiva de gerenciamento de tarefas inspirada no design e funcionalidades do Todoist. O projeto permite aos usuários organizar suas tarefas diárias, definir prioridades e acompanhar o progresso das atividades de forma intuitiva e eficiente.

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
- **Web Components:** Lit (para componentes reutilizáveis)
- **Bibliotecas JavaScript:**
  - jQuery 3.7.1
  - jQuery Mask Plugin
  - Animate.css
- **API Fake:** JSON Server
- **Persistência:** Web Storage (localStorage/sessionStorage)

## 🌐 Link para o Site em Produção

[Link para GitHub Pages - A ser configurado]

## ✅ Checklist de Funcionalidades

### RA1 - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos

- [ ] **ID 00** - Prototipa interfaces adaptáveis para mobile e desktop no Figma
- [ ] **ID 01** - Implementa layout responsivo com Framework CSS (Bootstrap)
- [ ] **ID 02** - Utiliza Flexbox/Grid para layouts responsivos
- [ ] **ID 03** - Utiliza componentes CSS e JavaScript do Framework
- [ ] **ID 04** - Implementa layout fluido com unidades relativas
- [ ] **ID 05** - Implementa animações (fadeIn/fadeOut, slideIn/slideOut)
- [ ] **ID 06** - Cria transições personalizadas entre estados
- [ ] **ID 07** - Aplica Design System consistente
- [ ] **ID 08** - Implementa pré-processadores CSS (Sass)
- [ ] **ID 09** - Aplica tipografia responsiva com media queries/clamp()
- [ ] **ID 10** - Aplica técnicas de responsividade de imagens
- [ ] **ID 11** - Otimiza imagens com formatos modernos (WebP)

### RA2 - Realizar tratamento de formulários e aplicar validações

- [ ] **ID 12** - Implementa tratamento de formulários com mensagens de erro/sucesso
- [ ] **ID 13** - Aplica expressões regulares (REGEX) para validações customizadas
- [ ] **ID 14** - Incorpora elementos de listagem (checkbox, radio, select)
- [ ] **ID 15** - Realiza escrita/leitura no Web Storage

### RA3 - Aplicar ferramentas para otimização do desenvolvimento

- [ ] **ID 16** - Configura ambiente com Node.js e NPM
- [ ] **ID 17** - Utiliza linters (ESLint/Stylelint)
- [ ] **ID 18** - Adota boas práticas de versionamento (Git/GitHub)
- [ ] **ID 19** - Organiza README.md conforme template
- [ ] **ID 20** - Utiliza técnicas de minificação e otimização
- [ ] **ID 21** - Organiza arquivos em estrutura modular
- [ ] **ID 22** - Utiliza metodologias BEM/SMACSS para CSS

### RA4 - Aplicar bibliotecas JavaScript para interatividade

- [ ] **ID 23** - Utiliza jQuery para manipulação do DOM
- [ ] **ID 24** - Integra plugin jQuery (jQuery Mask Plugin)
- [ ] **ID 25** - Utiliza bibliotecas de web components (Lit)
- [ ] **ID 26** - Utiliza biblioteca de componentes prontos

### RA5 - Efetuar requisições assíncronas para APIs

- [ ] **ID 27** - Realiza requisições para API fake (persistir dados de formulário)
- [ ] **ID 28** - Realiza requisições para API fake (exibir dados na página)

## 📱 Páginas da Aplicação

1. **Landing Page (landing.html)** - Página inicial promocional com informações sobre o produto
2. **Login (pages/login.html)** - Autenticação de usuários
3. **Registro (pages/register.html)** - Criação de novas contas
4. **Dashboard (index.html)** - Visão geral das tarefas e estatísticas
5. **Tarefas (pages/tasks.html)** - Lista completa de tarefas com filtros

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

- **Aplicação:** http://localhost:3000
- **API Fake:** http://localhost:3001
- **Página Inicial:** http://localhost:3000/landing.html

### Credenciais de Teste

- **E-mail:** demo@taskflow.com
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
│   │   └── responsive.css   # Estilos responsivos
│   └── js/
│       └── app.js           # JavaScript principal
├── components/
│   └── task-item.js         # Web Component para tarefas
├── pages/
│   ├── login.html           # Página de login
│   ├── register.html        # Página de registro
│   └── tasks.html           # Página de tarefas
├── landing.html             # Landing page principal
├── index.html               # Dashboard (app principal)
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

### 📊 Dashboard e Estatísticas

- Visão geral do progresso
- Estatísticas de produtividade
- Atividade recente
- Progresso diário

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

### Performance

- Lazy loading de componentes
- Debounce em buscas
- Minificação de assets
- Otimização de imagens

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

**Inspiração:** [Todoist](https://todoist.com) - Design e funcionalidades  
**Desenvolvimento:** Projeto acadêmico individual  
**Tecnologias:** HTML5, CSS3, JavaScript ES6+, Bootstrap 5, Web Components
