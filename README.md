
# 🤖 ChatBot&nbsp;· React × Gemini API  
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/52ee61ab-d801-4cdf-94a4-8c126d23aafd/deploy-status)](https://app.netlify.com/sites/chatboto/deploys)

> AI-powered conversational assistant built with **React 19**, **Vite**, **Tailwind CSS** and Google’s **Gemini 2.0 Flash** large-language model.

---

<img src="docs/screenshot.gif" alt="ChatBot demo GIF" width="800"/>

## ✨ Features
| Category | Details |
| -------- | ------- |
| ⚡ **Real-time chat** | Type a prompt ➜ instant streaming answer |
| 🧠 **Gemini-Flash LLM** | Context–aware responses via Google AI Generative Language API |
| 🎨 **Modern UI**      | Fully responsive, dark-mode friendly, icons (react-icons) |
| 🛠️ **Config-driven** | `.env` variables for API key & model version |
| 🚀 **One-click deploy** | Netlify / Vercel build: `vite build` ➜ `dist` |
| 🧪 **Typed hooks** | Custom React hooks for message state & auto-scroll |
| 📑 **Markdown output** | Answers rendered with `react-markdown`, syntax-highlighting |

---

## 📂 Tech Stack
| Layer | Libraries / Tools |
| ----- | ----------------- |
| Front-end | React 19, Vite 6, Tailwind CSS 4, React Icons |
| Networking | Axios |
| AI Provider | Google Generative Language API – **gemini-2.0-flash** model |
| Tooling | ESLint, Prettier |
| Hosting | Netlify (SPA redirect rule included) |

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/YOUR_USER/ChatBot.git && cd ChatBot

# 2. Install deps
npm ci          # or yarn / pnpm

# 3. Configure environment
cp .env.example .env               # then edit .env
#   VITE_GEMINI_KEY=your-google-api-key
#   VITE_GEMINI_URL=https://generativelanguaguagemodel?key=${VITE_GEMINI_KEY}

# 4. Run in dev mode
npm run dev

# 5. Build & Preview
npm run build && npm run preview
```

---

## 🛠️ Project Structure
```
├─ public/                 # static assets
├─ src/
│  ├─ components/          # ChatHeader, Chats, ChatForm, TypingIndicator, …
│  ├─ App.jsx
│  └─ main.jsx
├─ .env.example
├─ vite.config.js
└─ netlify.toml            # build cmd & SPA redirect
```

---

## 🌐 Deployment (Netlify)

1. Push repository to GitHub.
2. In Netlify dashboard → “Import from Git”, select repo.
3. Build command `npm run build`, publish dir `dist`.
4. Add env-vars `VITE_LLM_KEY`, `VITE_GEMINI_URL` under “Site Settings → Environment”.
5. **Deploy** – first build ~1 min, afterwards every `git push main` auto-deploys.

*(See `netlify.toml` for SPA redirect to `/index.html`.)*

---

## 🧩 API Usage

| Variable | Description |
| -------- | ----------- |
| `VITE_LLM_KEY` | Your Google AI key (generate at <https://makersuite.google.com/app/apikey>) |
| `VITE_LLM_URL` | Full endpoint containing your key, e.g.<br>`https://generativelanguagemodel?key=$VITE_LLM_KEY` |

Requests are JSON:
```jsonc
{
  "contents": [
    { "parts": [ { "text": "Hello!" } ] }
  ]
}
```

---

## 🤝 Contributing

1. **Fork** the repo & create your branch: `git checkout -b feat/awesome`
2. Commit changes: `git commit -m "feat: add awesome feature"`
3. Push branch: `git push origin feat/awesome`
4. Create a **Pull Request**

Please follow the ESLint/Prettier guidelines – `npm run lint` must pass.

---

## 📜 License

MIT © 2024 [Kurosaki](https://github.com/Soumalya99)

---

> Made with ☕ and plenty of API calls
