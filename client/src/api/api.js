import axios from 'axios';

export const sendToCohere = async (data) => {
  try {
    const res = await axios.post('http://localhost:5000/chat/cohere', {
      message: data.message,
      history: data.history,
      user_info: {
        name: data.name,
        age: data.age,
        destination: data.destination,
        dates: data.dates,
        companions: data.companions,
        budget: data.budget,
        interests: data.interests,
        accessibility: data.accessibility
      }
    });

    return res.data.reply || "No response from Cohere.";
  } catch (err) {
    console.error("Cohere API error:", err);
    return 'Error contacting Cohere model.';
  }
};


export const sendToLlama = async (data) => {
  try {
    const res = await axios.post('http://localhost:8000/chat/llama', {
      message: data.message,
      history: data.history,
      user_info: {
        name: data.name,
        age: data.age,
        destination: data.destination,
        dates: data.dates,
        companions: data.companions,
        budget: data.budget,
        interests: data.interests,
        accessibility: data.accessibility
      }
    });

    return res.data.response || "No response from LLaMA.";
  } catch (err) {
    console.error("LLaMA API error:", err);
    return 'Error contacting LLaMA model.';
  }
};



const buildPrompt = (data) => {
  return `You are a helpful travel assistant.

Name: ${data.name}
Age: ${data.age}
Destination: ${data.destination}
Dates: ${data.dates}
Companions: ${data.companions}
Budget: ${data.budget}
Interests: ${data.interests}
Accessibility Needs: ${data.accessibility}

User query: ${data.message}`;
};
