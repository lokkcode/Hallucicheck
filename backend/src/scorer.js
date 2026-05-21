const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const scoreClaim = async (claim, evidence) => {
  if (evidence === "No evidence found") {
    return {
      claim: claim,
      verdict: "UNCERTAIN",
      reason: "No evidence found on internet",
      score: 0.5,
    };
  }

  const prompt = `
    You are a fact verification assistant.
    
    Claim: "${claim}"
    Evidence: "${evidence.slice(0, 500)}"
    
    Based ONLY on the evidence provided:
    - Does the evidence SUPPORT the claim? → respond TRUE
    - Does the evidence CONTRADICT the claim? → respond FALSE
    - Is the evidence unclear or unrelated? → respond UNCERTAIN
    
    Respond in this exact JSON format only:
    {
      "verdict": "TRUE" or "FALSE" or "UNCERTAIN",
      "reason": "one line explanation"
    }
    
    No extra text. JSON only.
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

  const parsed = JSON.parse(raw);

  const score =
    parsed.verdict === "TRUE"
      ? 1
      : parsed.verdict === "FALSE"
      ? 0
      : 0.5;

  return {
    claim: claim,
    verdict: parsed.verdict,
    reason: parsed.reason,
    score: score,
  };
};

const scoreAllClaims = async (checkedClaims) => {
  const results = [];

  for (const item of checkedClaims) {
    const result = await scoreClaim(item.claim, item.evidence);
    results.push({
      ...result,
      sources: item.sources,
    });
  }

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const accuracyScore = Math.round((totalScore / results.length) * 100);

  return {
    results: results,
    accuracyScore: accuracyScore,
    totalClaims: results.length,
    trueClaims: results.filter((r) => r.verdict === "TRUE").length,
    falseClaims: results.filter((r) => r.verdict === "FALSE").length,
    uncertainClaims: results.filter((r) => r.verdict === "UNCERTAIN").length,
  };
};

module.exports = { scoreAllClaims };