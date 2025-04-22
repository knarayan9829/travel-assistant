const express = require("express");
const router = express.Router();
const { generateLlamaResponse } = require("../controllers/llamaController");

router.post("/chat/llama", generateLlamaResponse);

module.exports = router;
