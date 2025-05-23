export async function sendToCohere(message) {
    try {
      const response = await fetch("http://localhost:3000/chat/cohere", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });
  
      const data = await response.json();
      return data.response || "No response from Cohere.";
    } catch (error) {
      console.error("Cohere API error:", error);
      return "Error contacting Cohere model.";
    }
  }
  