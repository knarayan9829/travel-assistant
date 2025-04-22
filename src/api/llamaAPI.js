export async function sendToLlama({ message, history, userInfo }) {
  try {
    const response = await fetch("http://localhost:8000/chat/llama", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, history, user_info: userInfo })
    });

    const raw = await response.text();
    console.log("🐍 LLaMA Raw Response:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      return "Error parsing LLaMA response.";
    }

    return data.response || "⚠️ No response from LLaMA.";
  } catch (error) {
    console.error("❌ LLaMA API Fetch Error:", error);
    return "Error contacting LLaMA model.";
  }
}
