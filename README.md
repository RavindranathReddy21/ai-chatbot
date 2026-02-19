# SQL Assistant — AI Chatbot

A production-ready AI chatbot interface built with React + Vite + TypeScript that connects to a LangGraph-powered SQL agent backend. Ask questions in plain English and get intelligent, human-readable answers from your database.

---

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite 5
- Tailwind CSS v3
- shadcn/ui
- Redux Toolkit
- Axios

**Backend**
- FastAPI
- LangGraph
- SQLAlchemy

---

## Project Structure

```
src/
├── api/                    # All backend API calls
│   ├── client.ts           # Axios instance with base URL & interceptors
│   ├── chat.api.ts         # Chat endpoint definitions + TypeScript types
│   └── index.ts            # Re-exports
│
├── components/
│   ├── ui/                 # shadcn generated components (do not edit)
│   ├── atoms/              # Smallest building blocks (Avatar, Timestamp, TypingIndicator)
│   ├── molecules/          # Composed from atoms (MessageBubble, ChatInput, ErrorBanner)
│   └── organisms/          # Full sections (ChatWindow, MessageList, Sidebar)
│
├── hooks/                  # Custom React hooks
│   ├── useChat.ts          # Core chat logic — components talk to Redux through this
│   └── useScrollToBottom.ts
│
├── store/                  # Redux Toolkit state management
│   ├── chatStore.ts        # Messages state + async thunk for API calls
│   ├── uiStore.ts          # UI state (sidebar open/close)
│   ├── index.ts            # Store configuration
│   └── hooks.ts            # Typed useAppDispatch / useAppSelector
│
├── lib/
│   ├── utils.ts            # shadcn cn() utility
│   └── theme.tsx           # Dark/light mode context + localStorage persistence
│
├── pages/
│   └── ChatPage.tsx        # Top-level page composition
│
└── App.tsx                 # Root — Provider + ThemeProvider
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd ai-chatbot
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Start the backend

Make sure your FastAPI backend is running on port 8000. Your backend must have CORS enabled:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4. Start the frontend

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Contract

The frontend expects the following from the backend:

**Request** — `POST /ask`
```json
{
  "question": "What products do we have?"
}
```

**Response**
```json
{
  "question": "What products do we have?",
  "sql_query": "SELECT * FROM products;",
  "result": "[('Laptop',), ('Mouse',)]",
  "human_readable_result": "There are 3 products: Laptop, Mouse, and Keyboard.",
  "error": null,
  "attempts": 0
}
```

The frontend displays `human_readable_result` if available, falls back to `error` if not.

---

## Features

- **Dark / Light mode** — toggle in sidebar, persists across sessions
- **Optimistic UI** — user message appears instantly before the API responds
- **Typing indicator** — animated dots while waiting for a response
- **Error display** — backend errors shown inline in the chat
- **Auto-resizing input** — textarea grows as you type
- **Keyboard shortcuts** — Enter to send, Shift+Enter for new line
- **Clear conversation** — reset the chat session from the sidebar

---

## Architecture Principles

- Components **never** call the API directly — always through `hooks/`
- `hooks/` talk to Redux, Redux talks to `api/`
- If the backend changes, only `src/api/` needs updating
- If state management changes, only `src/store/` and `src/hooks/` need updating
- `src/components/ui/` is owned by shadcn — never edit manually

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```