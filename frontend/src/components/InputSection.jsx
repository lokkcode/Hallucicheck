const InputSection = ({
  text,
  setText,
  handleCheck,
  handleReset,
  loading,
  error,
}) => {
  const examples = [
    "Einstein invented the telephone in 1876.",
    "The Eiffel Tower is made of wood and stands in London.",
    "Python was created by Guido van Rossum in 1991.",
  ];

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-6 
                    border border-gray-800">

      <div className="flex items-center justify-between mb-3">
        <label className="text-gray-400 text-sm">
          Paste AI-generated text
        </label>
        {text && (
          <button
            onClick={handleReset}
            className="text-gray-600 text-xs hover:text-gray-400 
                       transition-colors"
          >
            Clear ✕
          </button>
        )}
      </div>

      <textarea
        className="w-full bg-gray-800 text-white rounded-xl p-4
                   text-sm resize-none border border-gray-700
                   focus:outline-none focus:border-red-500
                   transition-colors placeholder-gray-600"
        rows={7}
        placeholder="e.g. Einstein was born in 1879 in Germany. He invented the telephone..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />

      <div className="flex justify-between items-center mt-2 mb-5">
        <span
          className={`text-xs ${
            text.length > 1800
              ? "text-red-400"
              : "text-gray-600"
          }`}
        >
          {text.length} / 2000
        </span>
        <span className="text-gray-700 text-xs">
          ~10-15 seconds per check
        </span>
      </div>

      {!text && (
        <div className="mb-5">
          <p className="text-gray-600 text-xs mb-2">
            Try an example:
          </p>
          <div className="flex flex-col gap-2">
            {examples.map((example, i) => (
              <button
                key={i}
                onClick={() => setText(example)}
                className="text-left text-gray-500 text-xs 
                           hover:text-gray-300 bg-gray-800/50 
                           hover:bg-gray-800 rounded-lg px-3 py-2 
                           transition-all border border-gray-800
                           hover:border-gray-700"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-800 
                        rounded-xl p-3 mb-4 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={handleCheck}
        disabled={loading || !text.trim()}
        className="w-full bg-red-600 hover:bg-red-700
                   disabled:bg-gray-800 disabled:text-gray-600
                   disabled:cursor-not-allowed text-white 
                   font-semibold py-3.5 rounded-xl transition-all
                   text-sm tracking-wide"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
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
            Analyzing claims... please wait
          </span>
        ) : (
          "Check for Hallucinations →"
        )}
      </button>
    </div>
  );
};

export default InputSection;