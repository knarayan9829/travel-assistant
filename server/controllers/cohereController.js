const cohere = require("cohere-ai");
require("dotenv").config();
const Session = require("../models/Session");
const logger = require("../utils/logger");

cohere.init(process.env.COHERE_API_KEY);

exports.generateCohereResponse = async (req, res) => {
  const data = req.body;
  const history = data.history || [];
  const user = data.user_info || {};

  // 🧾 Debug: Show what was received
  console.log("📨 Message:", data.message);
  console.log("📜 History:", history);
  console.log("🧾 Profile:\n", user);

  // Profile block
  const profilePrompt = `User Profile:
Name: ${user.name || "Unknown"}
Age: ${user.age || "-"}
Destination: ${user.destination || "-"}
Dates: ${user.dates || "-"}
Companions: ${user.companions || "-"}
Budget: ${user.budget || "-"}
Interests: ${user.interests || "-"}
Accessibility Needs: ${user.accessibility || "-"}
`;

  // Construct conversational prompt
  let conversation = `${profilePrompt}\nConversation:\n`;
  history.forEach(msg => {
    const role = msg.role === "user" ? "User" : "Assistant";
    conversation += `${role}: ${msg.content}\n`;
  });
  conversation += `User: ${data.message}\nAssistant:`;

  try {
    const response = await cohere.generate({
      model: "command-r-plus",
      prompt: conversation,
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = response.body.generations[0].text.trim();
    const session = new Session({ ...user, message: data.message }, "cohere", reply);
    logger.log(session, "cohere");

    res.json({ reply });
  } catch (error) {
    console.error("🔥 Cohere error:", error.message);
    res.status(500).json({ reply: "Sorry, something went wrong with Cohere." });
  }
};
