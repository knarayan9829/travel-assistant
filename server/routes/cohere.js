const express = require("express");
const router = express.Router();
const { generateCohereResponse } = require("../controllers/cohereController");

router.post("/chat/cohere", generateCohereResponse);

module.exports = router;
