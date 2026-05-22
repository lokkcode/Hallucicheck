# HalluciCheck ⚡
### Real-time AI Hallucination Detector
 
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-red?style=for-the-badge)](https://hallucicheck-50liemb9a-alok41n42-3670s-projects.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-lokkcode-black?style=for-the-badge&logo=github)](https://github.com/lokkcode/hallucicheck)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
 
---
 
## 🧠 What Is HalluciCheck?
 
HalluciCheck is a full-stack AI-powered tool that detects hallucinations in any AI-generated text — instantly and cheaply.
 
Paste any output from **ChatGPT, Gemini, Claude, or any LLM** → HalluciCheck breaks it into individual factual claims → searches the internet for each one → returns a **color-coded result** showing exactly what's TRUE ✅, FALSE ❌, or UNCERTAIN ⚠️ — along with an accuracy score.
 
---
 
## 🚀 Live Demo
 
🔗 **[hallucicheck.vercel.app](https://hallucicheck-50liemb9a-alok41n42-3670s-projects.vercel.app/)**
 
---
 
## 💡 Why HalluciCheck?
 
Existing tools like **Galileo**, **Patronus AI**, and **Cleanlab** charge enterprise pricing — making hallucination detection inaccessible to indie developers and students.
 
HalluciCheck runs at **~$0.002 per check** (vs industry standard $0.01+) by using smart task decomposition instead of brute-force expensive models.
 
```
Big companies:  One big expensive model does everything → $0.01/check
HalluciCheck:   Multiple cheap tools, each doing one job → $0.002/check
```
 
---
 
## ⚙️ How It Works
 
```
User pastes AI-generated text
        ↓
Step 1: Groq AI (LLaMA 3.3) extracts individual factual claims
        ↓
Step 2: Tavily Search API verifies each claim on the internet
        ↓
Step 3: LLM-as-a-Judge scores each claim (TRUE / FALSE / UNCERTAIN)
        ↓
Step 4: Final accuracy score + color-coded result displayed
```
 
---
 
## 🛠️ Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React.js + Tailwind CSS |
| Backend | Node.js + Express.js |
| AI (Claim Extraction) | Groq API — LLaMA 3.3 70B |
| AI (Fact Judgment) | Groq API — LLM-as-a-Judge |
| Search (Fact Check) | Tavily Search API |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |
 
---
 
## 📁 Project Structure
 
```
hallucicheck/
│
├── backend/
│   ├── src/
│   │   ├── server.js       # Express server + API routes
│   │   ├── extractor.js    # Groq API — claim extraction
│   │   ├── checker.js      # Tavily API — fact checking
│   │   └── scorer.js       # LLM-as-a-Judge scoring logic
│   ├── .env                # API keys (not pushed to GitHub)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.js
    │   └── components/
    │       ├── InputSection.jsx
    │       └── ResultSection.jsx
    └── package.json
```
 
---
 
## 🔌 API Endpoints
 
### `GET /`
Health check — returns server status.
 
### `POST /check`
Main endpoint — checks text for hallucinations.
 
**Request Body:**
```json
{
  "text": "Einstein invented the telephone in 1876."
}
```
 
**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "claim": "Einstein invented the telephone",
        "verdict": "FALSE",
        "reason": "Evidence shows Bell invented the telephone",
        "score": 0,
        "sources": ["https://britannica.com/..."]
      }
    ],
    "accuracyScore": 0,
    "totalClaims": 1,
    "trueClaims": 0,
    "falseClaims": 1,
    "uncertainClaims": 0
  }
}
```
 
---
 
## 🏃 Run Locally
 
### Prerequisites
- Node.js v18+
- Groq API key (free at [console.groq.com](https://console.groq.com))
- Tavily API key (free at [tavily.com](https://tavily.com))
### Backend Setup
```bash
cd backend
npm install
```
 
Create `.env` file:
```
GROQ_API_KEY=your_groq_key_here
TAVILY_API_KEY=your_tavily_key_here
PORT=5000
```
 
Start backend:
```bash
npm run dev
```
 
### Frontend Setup
```bash
cd frontend
npm install
```
 
Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
```
 
Start frontend:
```bash
npm start
```
 
Open `http://localhost:3000` 🎉
 
---
 
## 📊 Competitive Landscape
 
| Tool | Pricing | Audience | Open Source |
|---|---|---|---|
| Galileo | Enterprise ($$$) | Large companies | ❌ |
| Patronus AI | Enterprise ($$$) | Large companies | ❌ |
| Amazon RefChecker | Research only | Researchers | ✅ |
| Vectara HHEM | API pricing | Developers | ✅ |
| **HalluciCheck** | **~$0.002/check** | **Everyone** | **✅** |
 
---
 
## 🗺️ Roadmap
 
- [x] Core hallucination detection engine
- [x] Color-coded UI with accuracy score
- [x] Real-time web fact-checking
- [ ] API endpoint for developers
- [ ] Browser extension
- [ ] Support for Hindi/regional language AI outputs
- [ ] Hallucination leaderboard across major LLMs
- [ ] History log of past checks
---
 
## 👤 Built By
 
**Alok Kumar Gupta**
4th Year B.Tech CSE (Artificial Intelligence)
NIET Greater Noida · 2026
 
📧 alok41n42@gmail.com
🐙 [github.com/lokkcode](https://github.com/lokkcode)
 
> Open to Internships & Full-time Opportunities
 
---
 
## 📄 License
 
MIT License — free to use, modify, and distribute.
 
