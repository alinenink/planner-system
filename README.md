# 📅 Post Planner System

O **Post Planner System** é uma aplicação web desenvolvida em **React** e **Redux**, projetada para ajudar criadores de conteúdo a organizarem e gerenciarem postagens em diversas plataformas sociais. Com um planejamento semanal intuitivo, os usuários podem adicionar, editar e visualizar seus posts programados de maneira eficiente.

---

## 🚀 **Funcionalidades Principais**
- 📆 **Planejamento Semanal**: Interface de calendário semanal para visualizar e gerenciar posts planejados.
- 📝 **Criação de Postagens**: Adicione postagens para múltiplas plataformas sociais.
- 🎯 **Feed Planejado**: Lista de posts planejados para o dia selecionado.
- 🖊️ **Edição e Remoção**: Edite ou exclua posts diretamente pelo feed planejado.
- ⚠️ **Marcar como Abandonado**: Indique postagens que não serão mais realizadas.
- 📊 **Insights e Métricas**: Visualize estatísticas de postagens planejadas, concluídas e abandonadas.

---

## 🛠 **Tecnologias Utilizadas**
- **React**: Biblioteca para construção da interface de usuário.
- **Redux Toolkit**: Gerenciamento de estado global da aplicação.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **React DnD**: Implementação de Drag & Drop para organização de posts no feed planejado.
- **React Icons**: Ícones personalizáveis para a interface.
- **React Modal**: Modais interativos para criação e edição de postagens.

---

## 🏗 **Instalação e Configuração**

### 🔧 **Pré-requisitos**
Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 16+)
- **npm** ou **yarn**

### 📥 **Clonar o Repositório**
```bash
git clone https://github.com/seu-usuario/post-planner-system.git
cd post-planner-system

📦 Instalar Dependências

npm install

▶ Rodar o Projeto

npm start

A aplicação estará disponível em http://localhost:3000/.
📂 Estrutura do Projeto

📂 post-planner-system
├── 📂 public
│   ├── index.html
│   └── favicon.ico
│
├── 📂 src
│   ├── 📂 components
│   │   ├── CreatePostModal.jsx
│   │   ├── EditPostModal.jsx
│   │   ├── FeedPreviewComponent.jsx
│   │   ├── WeeklyCalendarComponent.jsx
│   │   ├── GeneralInsightsComponent.jsx
│   │   ├── DailyDetailsModal.jsx
│   │   └── ...
│   │
│   ├── 📂 store
│   │   ├── plansSlice.js
│   │   ├── profileSlice.js
│   │   ├── store.js
│   │   └── ...
│   │
│   ├── 📂 pages
│   │   ├── NewPostComponent.jsx
│   │   ├── WeeklyView.jsx
│   │   └── ...
│   │
│   ├── App.js
│   ├── index.js
│   └── styles.css
│
├── .gitignore
├── package.json
├── README.md
└── ...

🖥 Como Usar

    Criar um Post
        Acesse a tela "Incluir Novo Planejamento".
        Preencha o título, data, descrição e selecione a(s) plataforma(s).
        Clique em "Salvar" para adicionar a postagem ao planejamento.

    Visualizar Posts Planejados
        No calendário semanal, os dias com posts planejados exibirão um contador de publicações.
        Clique no dia desejado para visualizar o feed de posts.

    Editar, Excluir ou Abandonar um Post
        Utilize os botões de ação no Feed Planejado para modificar os posts.

    Acompanhar Insights
        Acesse a seção de Insights Gerais para visualizar estatísticas sobre os posts.

📌 Contribuições

👩‍💻 Autor

Este projeto foi desenvolvido por Aline Nink, desenvolvedora front-end com foco em criar aplicações modernas e responsivas. Sempre buscando aprender e melhorar, este portfólio reflete meu trabalho e paixão pela tecnologia.

🌐 Acesse
Você pode conferir meu portfólio em: https://alinenink.github.io/alinenink