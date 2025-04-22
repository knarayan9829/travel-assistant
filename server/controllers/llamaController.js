const axios = require("axios");
const Session = require("../models/Session");
const logger = require("../utils/logger");

exports.generateLlamaResponse = async (req, res) => {
  const data = req.body;

  const userInfo = {
    name: data.name || "",
    age: data.age || "",
    destination: data.destination || "",
    dates: data.dates || "",
    companions: data.companions || "",
    budget: data.budget || "",
    interests: data.interests || "",
    accessibility: data.accessibility || ""
  };

  const history = data.history || [];

  try {
    const llamaRes = await axios.post("http://localhost:8000/chat/llama", {
      message: data.message,
      history: history,
      user_info: userInfo
    });

    const reply = llamaRes?.data?.response || "⚠️ No response from LLaMA.";
    const session = new Session({ ...data, reply }, "llama", reply);
    logger.log(session, "llama");

    res.json({ reply });
  } catch (error) {
    console.error("🔥 LLaMA backend error:", error?.response?.data || error.message);
    res.status(500).json({ reply: "Error contacting LLaMA model." });
  }
};
