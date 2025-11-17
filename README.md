# 🍅 Focus Timer - PWA

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do Bootcamp II - Entrega Final. Ele implementa uma nova versão PWA da extensão chrome Timer Pomodoro, feita com o objetivo de ajudar a aumentar a produtividade nos estudos e trabalho. Nessa versão uma vez que o usuário completa o timing de estudos é capturado um Pokemon, a fim de motivar a continuidade dos estudos. Além disso, é possível visualizar o histórico de pokemons capturados pelo usuário. 

## Integrantes

- Rillary Lorranne de Souza Portilho
- Júlia Barrozo Rodrigues Pereira
- Maria Eduarda de Sousa Sales
- João Victor Alves Rodrigues
- Luis Filipe Campelo Aragão

## ⚡ Funcionalidades

### Timer Pomodoro
- ⏰ Timer configurável (padrão: 25min trabalho / 5min pausa)
- ▶️ Controles de iniciar, pausar e resetar
- 🔄 Contagem regressiva visual em tempo real
- 🎯 Indicação visual do modo atual (foco/pausa)
- 🎮 Exibição de pokemon ao finalizar sessão
- 📋 Listagem de pokemons capturadas

### Interface Intuitiva
- 🎨 Design moderno com gradientes e glassmorphism
- 📱 Layout responsivo otimizado para popup
- 🎮 Botões com estados visuais claros
- ⚙️ Configurações de tempo personalizáveis

## 🛠️ Tecnologias Utilizadas

- **Frontend (PWA)**:
  - React.js
  - HTML, CSS, JavaScript
- **Backend (API)**:
  - Node.js
  - Express
  - Axios
  - CORS
- **API Externa**:
  - [PokéAPI](https://pokeapi.co/)
- **Progressive Web App**:
  - Manifest PWA
  - Service Worker (Vite + React)
- **Extensão Chrome**:
  - Manifest V3
  - Content script
  - Popup HTML

## 📁 Estrutura principal do Projeto

```
focus-timer/
│
│  ├─ api/
│  ├─ src/
│  │  ├─ index.js           # Todas as rotas e lógica de captura
│
├─ web/                     # PWA React
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ index.jsx
│  │  └─ assets/
│  ├─ index.css
│  └─ package.json
│
├─ extension/               # Extensão Chrome (opcional)
│  ├─ src/
│  │  ├─ popup/
│  │  │  ├─ popup.html
│  │  │  ├─ popup.js
│  │  │  └─ popup.css
│  │  ├─ content/
│  │  │  └─ content.js
│  │  └─ background/
│  │     └─ service-worker.js
│  └─ manifest.json
│
└─ README.md
```

## 🚀 Instalação

### Instalação Manual (Modo Desenvolvedor)

1. **Baixe o código:**
   ```bash
   git clone https://github.com/rillary08/bootcamp2-chrome-ext-rillary08.git
   cd bootcamp2-chrome-ext-rillary08
   ```

2. **Abra o Chrome** e vá para `chrome://extensions/`

3. **Ative o "Modo do desenvolvedor"** (toggle no canto superior direito)

4. **Clique em "Carregar sem compactação"**

5. **Selecione a pasta** `bootcamp2-chrome-ext-rillary08`

6. **A extensão será instalada** e o ícone aparecerá na barra do Chrome

### Download da Release

Alternativamente, baixe o arquivo .zip da [página de releases](https://github.com/rillary08/bootcamp2-chrome-ext-rillary08/releases) e siga os passos 2-6 acima.

## 📖 Como Usar

1. **Clique no ícone** 🍅 da extensão na barra do Chrome
2. **Configure o tempo** de trabalho e pausa (opcional)
3. **Clique em "Iniciar"** para começar uma sessão de foco
4. **Trabalhe focado** até o timer terminar
5. **Receba a notificação** quando completar a sessão
6. **Faça uma pausa** quando sugerido

### Controles Disponíveis
- **Iniciar** - Começa uma nova sessão ou retoma pausada
- **Pausar** - Pausa a sessão atual
- **Reset** - Cancela e reinicia o timer

### Configurações
- **Trabalho (min)** - Duração das sessões de foco (1-60 min)
- **Pausa (min)** - Duração das pausas (1-30 min)

## 🔧 Desenvolvimento

### Pré-requisitos
- Google Chrome 114+
- Editor de código (VS Code recomendado)
- Git para controle de versão

### Executar em Desenvolvimento
## 🚀 Como Usar

### 1. Clonar o projeto
```bash
git clone <URL_DO_REPOSITORIO>
cd focus-timer-pwa

### 1. Clonar o projeto
```bash
git clone <URL_DO_REPOSITORIO>
cd boorcap2-chrome-ext

### 2. Rodar a API
cd apps/api
npm install
npm run dev

- A API rodará em: http://localhost:3001/:
- POST/capture
- GET/capture

### 3. Rodar a web
cd web
npm install
npm run dev

- A API rodará em: http://localhost:5173/.

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

**Contribuições são bem-vindas!** Sinta-se à vontade para abrir issues ou pull requests.