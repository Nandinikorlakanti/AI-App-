from fastapi import FastAPI, Request
from pydantic import BaseModel
import requests
import datetime
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8080",  # Allow requests from your frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Choose your local model name (must be pulled in Ollama already)
OLLAMA_MODEL = "tinyllama"  # or "phi", "mistral", etc.
OLLAMA_URL = "http://localhost:11434/api/generate"
LOG_FILE = "chat_log.txt"

# Input schema
class PromptInput(BaseModel):
    prompt: str
    temperature: float = 0.7  # Optional: defaults to 0.7

# Logging helper
def log_interaction(prompt: str, response: str):
    timestamp = datetime.datetime.now().isoformat()
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}]\nPrompt: {prompt}\nResponse: {response}\n\n")

@app.post("/generate")
def generate(input_data: PromptInput):
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": input_data.prompt,
        "temperature": input_data.temperature,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        result = response.json()
        output = result["response"]

        # Log the interaction
        log_interaction(input_data.prompt, output)

        return {"output": output}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
