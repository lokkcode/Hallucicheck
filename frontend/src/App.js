import { useState, useEffect, useRef } from "react";
import axios from "axios";
import InputSection from "./components/InputSection";
import ResultSection from "./components/ResultSection";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  const handleCheck = async () => {
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/check`, {
        text: text,
      });
      setResult(response.data.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("Cannot connect to server. Make sure backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              Hallucin<span className="text-red-500">Check</span>
            </span>
            <span className="bg-red-900/40 text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-800">
              BETA
            </span>
          </div>
          <a href="https://github.com/lokkcode/hallucicheck" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
            GitHub ↗
          </a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Detect AI
            <span className="text-red-500"> Hallucinations</span>
            <br />
            in Seconds
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Paste any AI-generated text. We break it into claims,
            search the internet, and tell you exactly what's true,
            false, or uncertain.
          </p>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-green-400">●</span>
              Real-time fact checking
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-blue-400">●</span>
              Powered by Groq + Tavily
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-purple-400">●</span>
              Free to use
            </div>
          </div>
        </div>

        <InputSection
          text={text}
          setText={setText}
          handleCheck={handleCheck}
          handleReset={handleReset}
          loading={loading}
          error={error}
        />

        {loading && (
          <div className="bg-gray-900 border border-gray-800
                          rounded-2xl p-8 text-center mb-6">
            <div className="flex flex-col items-center gap-4">
              <svg
                className="animate-spin h-8 w-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <div>
                <p className="text-white font-medium mb-1">
                  Analyzing your text...
                </p>
                <p className="text-gray-500 text-sm">
                  Extracting claims → Searching web → Scoring
                </p>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div ref={resultRef}>
            <ResultSection result={result} />
          </div>
        )}

        <p className="text-center text-gray-700 text-xs mt-8">
          Built by Alok Kumar Gupta · Open to Internships & Jobs · 2026
        </p>
      </div>
    </div>
  );
}

export default App;