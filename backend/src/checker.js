const axios = require("axios");
require("dotenv").config();

const checkClaim = async (claim) => {
  const response = await axios.post(
    "https://api.tavily.com/search",
    {
      query: claim,
      max_results: 3,
      search_depth: "basic",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const results = response.data.results;

  if (!results || results.length === 0) {
    return {
      claim: claim,
      evidence: "No evidence found",
      sources: [],
    };
  }

  const evidence = results
    .map((result) => result.content)
    .join(" ");

  const sources = results.map((result) => result.url);

  return {
    claim: claim,
    evidence: evidence,
    sources: sources,
  };
};

const checkAllClaims = async (claims) => {
  const results = [];

  for (const claim of claims) {
    const result = await checkClaim(claim);
    results.push(result);
  }

  return results;
};

module.exports = { checkAllClaims };