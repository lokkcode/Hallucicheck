const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const extractClaims = async (text) => {
  const prompt = `
    You are a fact extraction assistant.
    Read the following AI-generated text carefully.
    Extract every individual factual claim as a JSON array of strings.
    Return ONLY the JSON array. No explanation. No extra text.
    
    Text: "${text}"
    
    Example output format:
    ["claim one", "claim two", "claim three"]
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
  });

  const raw = response.choices[0].message.content.trim();

  const claims = JSON.parse(raw);

  return claims;
};

module.exports = { extractClaims };