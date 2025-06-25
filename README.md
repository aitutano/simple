# Flow - Gerenciador de Tarefas Acadêmico

## 📋 Sobre o Projeto

Flow é um gerenciador de tarefas acadêmico inspirado no Todoist, desenvolvido como projeto educacional. O objetivo é demonstrar o uso de tecnologias web modernas de forma simples e eficiente, atendendo aos requisitos acadêmicos estabelecidos.

## 🎯 Objetivo

Criar um sistema simples de gerenciamento de tarefas que demonstre o uso de frameworks CSS, validação de formulários, armazenamento local, bibliotecas JavaScript e integração com APIs, mantendo a simplicidade e foco educacional.

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com design system
- **Bootstrap 5** - Framework CSS responsivo
- **JavaScript ES6+** - Lógica da aplicação
- **jQuery** - Manipulação do DOM e plugins
- **jQuery Mask Plugin** - Máscaras de entrada
- **Font Awesome** - Iconografia
- **Animate.css** - Animações
- **JSON Server** - API fake para desenvolvimento
- **Web Storage** - Persistência local de dados

## 📁 Estrutura do Projeto

```
flow-task-manager/
├── index.html              # Página principal (SPA)
├── package.json             # Dependências e scripts
├── README.md               # Documentação
├── api/
│   └── db.json             # Base de dados fake
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos unificados
│   ├── js/
│   │   └── app.js          # JavaScript principal
│   └── images/
│       ├── favicon.svg     # Ícone do site
│       └── hero-task-preview.svg
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (v14 ou superior)
- NPM

### Passo a passo

1. **Clone o repositório**

```bash
git clone [url-do-repositorio]
cd flow-task-manager
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm run dev
```

4. **Execute a API fake (em outro terminal)**

```bash
npm run json-server
```

5. **Acesse a aplicação**

- Frontend: http://localhost:3000
- API: http://localhost:3001

## 📋 Checklist de Requisitos Acadêmicos

### RA1 - Frameworks CSS e Layouts Responsivos

- [x] **ID 01** - Layout responsivo com Bootstrap 5 utilizando Grid System e Flexbox
- [x] **ID 02** - Técnicas nativas de responsividade (Flexbox e Grid Layout)
- [x] **ID 03** - Componentes Bootstrap (cards, buttons, modals) e JavaScript (modal, collapse)
- [x] **ID 04** - Layout fluido com unidades relativas (rem, %, vw, vh, clamp())
- [x] **ID 05** - Animações CSS com Animate.css (fadeIn, slideIn, rotação)
- [x] **ID 07** - Design System consistente com variáveis CSS
- [x] **ID 08** - CSS organizado com variáveis e sistema modular
- [x] **ID 09** - Tipografia responsiva com clamp() e unidades relativas
- [x] **ID 10** - Responsividade de imagens com object-fit e containers relativos
- [x] **ID 11** - Imagens otimizadas com SVG e elemento \<picture\>

### RA2 - Formulários e Validação

- [x] **ID 12** - Tratamento de formulários com validação HTML5 e mensagens de erro
- [x] **ID 13** - Expressões regulares (REGEX) para validação de email, data e telefone
- [x] **ID 14** - Elementos de formulário (checkbox, radio, select)
- [x] **ID 15** - Web Storage (localStorage) para persistência de dados

### RA3 - Ferramentas de Desenvolvimento

- [x] **ID 16** - Ambiente Node.js e NPM configurado com dependências
- [x] **ID 18** - Versionamento com Git e repositório estruturado
- [x] **ID 19** - README.md organizado conforme template exigido
- [x] **ID 21** - Estrutura de arquivos coerente e modular

### RA4 - Bibliotecas JavaScript

- [x] **ID 23** - jQuery para manipulação do DOM e eventos
- [x] **ID 24** - jQuery Mask Plugin para máscaras de entrada

### RA5 - APIs e Requisições Assíncronas

- [x] **ID 27** - Requisições assíncronas (Fetch API) para persistir dados de formulário
- [x] **ID 28** - Requisições assíncronas para exibição de dados na página

## 🔧 Funcionalidades

### Principais

- ✅ Criação, edição e exclusão de tarefas
- ✅ Marcação de tarefas como concluídas
- ✅ Filtros por status (todas, pendentes, concluídas)
- ✅ Filtros por prioridade (alta, média, baixa)
- ✅ Busca por texto nas tarefas
- ✅ Categorização de tarefas
- ✅ Sistema de tags
- ✅ Datas de vencimento
- ✅ Indicação visual de tarefas vencidas
- ✅ Estatísticas de produtividade
- ✅ Persistência local com localStorage
- ✅ Sincronização com API fake

### Interface

- ✅ Design responsivo para mobile, tablet e desktop
- ✅ Single Page Application (SPA)
- ✅ Navegação por seções (Home, Tarefas)
- ✅ Animações suaves de transição
- ✅ Feedback visual para ações do usuário
- ✅ Loading states e tratamento de erros

## 🎨 Design System

### Cores Principais

- **Primary Red**: #e74c3c (Inspirado no Todoist)
- **Success Green**: #27ae60
- **Warning Orange**: #f39c12
- **Info Blue**: #3498db

### Tipografia

- **Fonte**: Inter (Google Fonts)
- **Tamanhos responsivos**: clamp() para adaptação automática

### Espaçamento

- **Sistema de spacing**: 0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, 3rem

### Componentes

- Cards com shadow e hover effects
- Botões com estados interativos
- Formulários com validação visual
- Badges para categorização

## 📱 Responsividade

O projeto foi desenvolvido com **mobile-first approach**:

- **Mobile** (< 576px): Layout em coluna única, navegação simplificada
- **Tablet** (576px - 768px): Layout híbrido, alguns elementos em linha
- **Desktop** (> 768px): Layout completo com sidebar e grid

## 💾 Persistência de Dados

### Local Storage

- Backup automático de todas as tarefas
- Preferências do usuário (filtros, seção atual)
- Funciona offline

### API Integration

- JSON Server para simulação de API REST
- Fallback para localStorage quando API indisponível
- Operações CRUD completas

## 🧪 Validação de Formulários

### Validações Implementadas

- **Campos obrigatórios**: título da tarefa
- **Email**: regex para validação de formato
- **Data**: validação de formato e valor
- **Comprimento**: mínimo e máximo de caracteres
- **Telefone**: regex para formatos brasileiros

### Feedback Visual

- Estados: válido (verde), inválido (vermelho), neutro
- Mensagens de erro específicas
- Validação em tempo real

## 🔄 API Endpoints

### Tasks

- `GET /tasks` - Listar todas as tarefas
- `POST /tasks` - Criar nova tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Excluir tarefa

## 🌟 Destaques Técnicos

1. **Single Page Application**: Navegação sem recarregamento
2. **Fallback Robusto**: Funciona offline com localStorage
3. **Validação Completa**: HTML5 + JavaScript + Regex
4. **Design Responsivo**: Mobile-first com Bootstrap 5
5. **Performance**: Debouncing na busca, lazy loading
6. **Acessibilidade**: Estrutura semântica, ARIA labels
7. **Modularidade**: Código organizado em módulos funcionais

## 📈 Melhorias Futuras

- [ ] PWA (Progressive Web App)
- [ ] Notificações push
- [ ] Sincronização em tempo real
- [ ] Themes (modo escuro)
- [ ] Drag & drop para reordenação
- [ ] Relatórios de produtividade
- [ ] Exportação de dados

## 👨‍💻 Desenvolvimento

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run json-server  # API fake
npm start           # Alias para npm run dev
```

### Estrutura do Código

- **Modular**: Cada funcionalidade em módulo específico
- **Comentado**: Código documentado para fins educacionais
- **Padrões**: Seguindo boas práticas de JavaScript e CSS

## 📚 Referências

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [jQuery Documentation](https://api.jquery.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Todoist](https://todoist.com/) - Inspiração de design
- [Animate.css](https://animate.style/)

## 📄 Licença

Este é um projeto acadêmico desenvolvido para fins educacionais.

---

**Projeto desenvolvido como trabalho acadêmico - UTFPR**  
_Inspirado no Todoist, construído com foco educacional e simplicidade_
