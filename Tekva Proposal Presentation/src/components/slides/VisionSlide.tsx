export function VisionSlide() {
  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-4xl text-blue-600 mb-2">The Tekva Vision</h2>
        <p className="text-slate-500">The Big Why</p>
      </div>

      <p className="text-lg text-slate-700">
        Tekva exists to uplift and strengthen the Jewish community through three pillars:
      </p>

      <div className="grid grid-cols-3 gap-6 flex-1">
        <div className="bg-blue-50 rounded-lg p-6 flex flex-col">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="text-xl text-blue-700 mb-2">1. Financial Support</h3>
          <p className="text-slate-600">Stability and dignity for families</p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 flex flex-col">
          <div className="text-4xl mb-3">💼</div>
          <h3 className="text-xl text-green-700 mb-2">2. Work Pathways</h3>
          <p className="text-slate-600">Skills, employment, and independence</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 flex flex-col">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-xl text-purple-700 mb-2">3. Venture Support</h3>
          <p className="text-slate-600">Founders, ideas, and community innovation</p>
        </div>
      </div>

      <div className="bg-slate-100 rounded-lg p-6 border-l-4 border-blue-600">
        <p className="text-slate-700">
          <span className="text-blue-700">Long-term aspiration:</span><br />
          A unified community operating system – simple tools, smart workflows, and AI that help schools, 
          shuls, charities, families, and founders thrive.
        </p>
      </div>
    </div>
  );
}
