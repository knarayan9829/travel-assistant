const fs = require("fs");
const path = require("path");

exports.log = (session, model) => {
  const logPath = path.join(__dirname, "../../outputs", `${model}_logs.json`);
  const existing = JSON.parse(fs.readFileSync(logPath, "utf-8") || "[]");
  existing.push(session);
  fs.writeFileSync(logPath, JSON.stringify(existing, null, 2));
};
