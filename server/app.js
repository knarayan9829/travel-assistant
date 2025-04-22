const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const llamaController = require("./controllers/llamacontroller");
const cohereController = require("./controllers/coherecontroller");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/chat/llama", llamaController.generateLlamaResponse);
app.post("/chat/cohere", cohereController.generateCohereResponse);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
