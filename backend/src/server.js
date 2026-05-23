const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { extractClaims } = require("./extractor");
const { checkAllClaims } = require("./checker");
const { scoreAllClaims } = require("./scorer");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:"*"}));
app.use(express.json());

// uses rate-limit so that no user can misuse my api cradits 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per IP
  message: {
    error: "Too many requests. The limit has been exceeded. Please try again after 15 minutes."
  }
});

app.use("/check", limiter);

app.get("/", (req, res) => {
  res.json({ message: "HalluciCheck API is running" });
});

app.post("/check", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "No text provided. Please send some text to check.",
      });
    }

    if (text.length > 2000) {
      return res.status(400).json({
        error: "Text too long. Please keep it under 2000 characters.",
      });
    }

    console.log("Step 1: Extracting claims...");
    const claims = await extractClaims(text);
    console.log(`Found ${claims.length} claims`);

    console.log("Step 2: Checking claims online...");
    const checkedClaims = await checkAllClaims(claims);
    console.log("Claims checked successfully");

    console.log("Step 3: Scoring claims...");
    const finalResult = await scoreAllClaims(checkedClaims);
    console.log("Scoring complete");

    res.json({
      success: true,
      data: finalResult,
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`HalluciCheck server running on PORT ${PORT}`);
});