
# 🧠 Local AI Assistant

A full local AI app that runs 100% offline using local LLMs with Ollama.  
Frontend by [Lovable](https://github.com/lovableai/local-ai-workbench), Backend powered by FastAPI.

---

## 💡 App Type Selected

> ✍️ **AI Writer** – Generate blog posts, tweets, or story content from a topic.

---

## ⚙️ Features

- Local inference via Ollama (no OpenAI or external API)
- Adjustable creativity (temperature)
- Real-time UI with frontend built using Lovable's workbench
- FastAPI backend for processing and routing
- Supports models like: `llama3`, `mistral`, `phi`, `tinyllama`, `dolphin`

---

## 🚀 How to Run the App Locally

### 📌 1. Prerequisites

- Python 3.8+
- Node.js (if modifying frontend)
- [Ollama installed](https://ollama.com/download)
- Model downloaded via Ollama (e.g. `ollama run llama3`)
- FastAPI + Uvicorn installed
  ```bash
  pip install fastapi uvicorn requests
  ```

---

### 📦 2. Install a Model (One-Time)

Open terminal and run:

```bash
ollama run llama3
```

You can replace `llama3` with:
- `mistral`
- `phi`
- `dolphin-mixtral`
- `tinyllama`

Let it fully download.

---

### 📁 3. Backend Setup

Navigate to the backend folder (where `main.py` is) and run:

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

🟢 **Make sure this terminal stays open.**

---

### 🌐 4. Frontend Setup (Lovable Workbench)

If you’re using Lovable’s prebuilt UI:

1. Open `local-ai-workbench-assistant` folder
2. Edit the config (like `.env`, or config.js) and ensure it points to:

```
http://localhost:8000
```

3. Run the frontend (if needed):
```bash
npm install
npm run dev
```

Or simply open the `index.html` if it’s static.

---

### ✅ Test Backend

Visit:

```
http://localhost:8000/docs
```

You should see FastAPI Swagger UI.

---

## 🧠 Model Used

This project uses:

- **Model**: `llama3` (via Ollama)
- **Backend API**: FastAPI
- **Frontend**: Lovable Local AI Workbench

You can replace the model in the backend by changing the name in the request payload:

```json
{
  "model": "mistral",  // or "phi", "dolphin", etc.
  ...
}
```

---

## 📝 Output Logging

All outputs are saved locally (optional):  
You can add Python logging to write outputs to a file from backend.

---

## 🛠 Troubleshooting

- ❌ "Backend not connected" — make sure:
  - Backend is running on `localhost:8000`
  - Frontend is configured to use that port
  - You are not using `127.0.0.1` in frontend when accessing from a different device

---

## 📄 License

MIT License — modify and use freely!
