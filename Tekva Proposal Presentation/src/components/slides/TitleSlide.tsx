export function TitleSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-6xl text-blue-600">TEKVA</h1>
        <div className="h-1 w-32 bg-blue-600 mx-auto" />
        <h2 className="text-3xl text-slate-800">Turning Vision Into Systems</h2>
      </div>
      
      <p className="text-xl text-slate-600 max-w-3xl">
        How we can build Financial Support, Work Pathways, and Venture Support<br />
        into a scalable, tech-enabled platform
      </p>
      
      <div className="mt-8 pt-8 border-t border-slate-200">
        <p className="text-slate-500">Prepared by: Justin Lake</p>
        <p className="text-sm text-slate-400 mt-2">
          Building the Tekva Platform & Tekva Labs
        </p>
      </div>
    </div>
  );
}
