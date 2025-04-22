// Placeholder schema or session structure
module.exports = class Session {
  constructor(userInput, model, response) {
    this.timestamp = new Date().toISOString();
    this.input = userInput;
    this.model = model;
    this.response = response;
  }
};
