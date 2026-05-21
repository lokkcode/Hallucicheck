const ScoreCard = ({ result }) => {
  const scoreColor =
    result.accuracyScore >= 70
      ? "text-green-400"
      : result.accuracyScore >= 40
      ? "text-yellow-400"
      : "text-red-400";

  const scoreRing =
    result.accuracyScore >= 70
      ? "border-green-500"
      : result.accuracyScore >= 40
      ? "border-yellow-500"
      : "border-red-500";

  const label =
    result.accuracyScore >= 70
      ? "Mostly Accurate ✅"
      : result.accuracyScore >= 40
      ? "Partially Accurate ⚠️"
      : "Highly Hallucinated ❌";

  return (
    <div className="bg-gray-900 border border-gray-800 
                    rounded-2xl p-6 mb-4">
      <p className="text-gray-500 text-xs uppercase 
                    tracking-widest mb-5">
        Analysis Complete
      </p>

      <div className="flex items-center gap-8 mb-6">
        <div
          className={`w-24 h-24 rounded-full border-4 
                      ${scoreRing} flex items-center 
                      justify-center flex-shrink-0`}
        >
          <span className={`text-3xl font-bold ${scoreColor}`}>
            {result.accuracyScore}%
          </span>
        </div>

        <div>
          <p className="text-white text-xl font-bold mb-2">
            {label}
          </p>
          <p className="text-gray-500 text-sm">
            {result.totalClaims} claims analyzed
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-900/20 border border-green-900 
                        rounded-xl p-3 text-center">
          <p className="text-green-400 text-2xl font-bold">
            {result.trueClaims}
          </p>
          <p className="text-green-700 text-xs mt-1">True</p>
        </div>
        <div className="bg-red-900/20 border border-red-900 
                        rounded-xl p-3 text-center">
          <p className="text-red-400 text-2xl font-bold">
            {result.falseClaims}
          </p>
          <p className="text-red-700 text-xs mt-1">False</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-900 
                        rounded-xl p-3 text-center">
          <p className="text-yellow-400 text-2xl font-bold">
            {result.uncertainClaims}
          </p>
          <p className="text-yellow-700 text-xs mt-1">Uncertain</p>
        </div>
      </div>
    </div>
  );
};

const ClaimCard = ({ item, index }) => {
  const config = {
    TRUE: {
      border: "border-green-900",
      bg: "bg-green-900/10",
      badge: "bg-green-900/40 text-green-400 border border-green-800",
      label: "✅ TRUE",
      number: "text-green-700",
    },
    FALSE: {
      border: "border-red-900",
      bg: "bg-red-900/10",
      badge: "bg-red-900/40 text-red-400 border border-red-800",
      label: "❌ FALSE",
      number: "text-red-700",
    },
    UNCERTAIN: {
      border: "border-yellow-900",
      bg: "bg-yellow-900/10",
      badge: "bg-yellow-900/40 text-yellow-400 border border-yellow-800",
      label: "⚠️ UNCERTAIN",
      number: "text-yellow-700",
    },
  };

  const style = config[item.verdict] || config["UNCERTAIN"];

  return (
    <div
      className={`${style.bg} border ${style.border} 
                  rounded-2xl p-5 mb-3`}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-start gap-3">
          <span className={`text-lg font-bold ${style.number} 
                            flex-shrink-0`}>
            {index + 1}.
          </span>
          <p className="text-white text-sm font-medium leading-relaxed">
            "{item.claim}"
          </p>
        </div>
        <span
          className={`${style.badge} text-xs font-bold 
                      px-3 py-1 rounded-full whitespace-nowrap`}
        >
          {style.label}
        </span>
      </div>

      {item.reason && (
        <p className="text-gray-400 text-xs ml-7 mb-3 leading-relaxed">
          {item.reason}
        </p>
      )}

      {item.sources && item.sources.length > 0 && (
        <div className="flex flex-wrap gap-2 ml-7">
          {item.sources.slice(0, 2).map((source, i) => (
            <a
              key={i}
              href={source}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 text-xs hover:text-blue-300 
                         bg-blue-900/20 border border-blue-900/40
                         px-2 py-1 rounded-lg transition-colors"
            >
              🔗{(()=>{
                try{
                  return new URL(source).hostname;
                }catch{
                  return "source"
                }
              })()}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const ResultSection = ({ result }) => {
  return (
    <div className="mt-2">
      <ScoreCard result={result} />

      <p className="text-gray-500 text-xs uppercase 
                    tracking-widest mb-3 mt-5">
        Claim Breakdown
      </p>

      {result.results.map((item, index) => (
        <ClaimCard key={index} item={item} index={index} />
      ))}

      <div className="text-center mt-6">
        <p className="text-gray-600 text-xs">
          Powered by Groq AI + Tavily Search
        </p>
      </div>
    </div>
  );
};

export default ResultSection;