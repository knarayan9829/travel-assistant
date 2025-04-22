from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_cpp import Llama
import os

app = Flask(__name__)
CORS(app)

model_path = "E:/Travel Assistant/llama3_models/llama-3-8b-instruct.Q4_K_M.gguf"

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at: {model_path}")

llm = Llama(
    model_path=model_path,
    n_ctx=2048,
    verbose=True
)

SYSTEM_PROMPT = """You are a helpful, friendly, and context-aware travel assistant.
You remember user preferences from earlier in the chat — such as name, age, destination, dates, budget, interests, companions, and accessibility needs.
Only use this data when it’s contextually helpful.
Avoid repeating it unless the user specifically asks.
Always act as a smart, memory-capable assistant.
"""

@app.route("/chat/llama", methods=["POST"])
def chat_llama():
    data = request.get_json()
    message = data.get("message", "").strip()
    history = data.get("history", [])
    profile = data.get("user_info", {})

    if not message:
        return jsonify({"error": "No message provided"}), 400

    # 🌐 Debug logs
    print("📨 Message:", message)
    print("📜 History:", history)
    print("🧾 Profile:")
    for k, v in profile.items():
        print(f" {k.capitalize()}: {v}")

    # Build chat history context
    conversation = SYSTEM_PROMPT + "\n\n"

    # Inject profile if it's a new conversation
    if len(history) <= 1 and any(profile.values()):
        profile_lines = [f"{k.capitalize()}: {v}" for k, v in profile.items() if v.strip()]
        conversation += "User Profile:\n" + "\n".join(profile_lines) + "\n\n"

    for entry in history:
        role = "User" if entry["role"] == "user" else "Assistant"
        conversation += f"{role}: {entry['content']}\n"

    conversation += f"User: {message}\nAssistant:"

    # Run LLaMA inference
    result = llm(prompt=conversation, max_tokens=512, stop=["User:", "Assistant:"])
    reply = result["choices"][0]["text"].strip()

    return jsonify({"response": reply})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
