# TaskFlow - Gerenciador de Tarefas

## 👤 Identificação/Autor

**Nome:** [Seu Nome Completo]  
**Curso:** [Seu Curso]  
**Disciplina:** [Nome da Disciplina]  
**Professor:** [Nome do Professor]

## 📝 Descrição do Projeto

TaskFlow é uma aplicação web responsiva de gerenciamento de tarefas inspirada no design e funcionalidades do Todoist. O projeto permite aos usuários organizar suas tarefas diárias, criar projetos, definir prioridades e acompanhar o progresso das atividades de forma intuitiva e eficiente.

### Tema e Escopo

- **Tema:** Gerenciamento pessoal de tarefas e projetos
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
  - Chart.js (para dashboards)
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

1. **Home/Dashboard** - Visão geral das tarefas e estatísticas
2. **Tarefas** - Lista completa de tarefas com filtros
3. **Projetos** - Gerenciamento de projetos e categorias
4. **Configurações** - Perfil do usuário e preferências

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

## 📸 Telas da Aplicação

[Capturas de tela serão adicionadas aqui após implementação]

## 📁 Estrutura do Projeto

```
task-manager-app/
├── api/
│   └── db.json
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── components/
├── pages/
├── index.html
├── package.json
└── README.md
```

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
