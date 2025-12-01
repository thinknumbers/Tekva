export function ArchitectureSlide() {
  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-4xl text-blue-600 mb-2">The Tekva Platform Architecture</h2>
        <p className="text-slate-500">Simple Visual</p>
      </div>

      <div className="flex-1 space-y-3">
        {/* Layer 1 */}
        <div className="bg-blue-600 text-white rounded-lg p-4">
          <h3 className="text-lg mb-2">Layer 1: Core Data + Identity</h3>
          <div className="flex gap-3 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded">User accounts</span>
            <span className="bg-white/20 px-3 py-1 rounded">Families</span>
            <span className="bg-white/20 px-3 py-1 rounded">Applications</span>
            <span className="bg-white/20 px-3 py-1 rounded">Ventures</span>
            <span className="bg-white/20 px-3 py-1 rounded">Roles</span>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="bg-purple-600 text-white rounded-lg p-4">
          <h3 className="text-lg mb-2">Layer 2: Shared Components</h3>
          <div className="flex gap-3 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded">Intake forms</span>
            <span className="bg-white/20 px-3 py-1 rounded">GPT agents</span>
            <span className="bg-white/20 px-3 py-1 rounded">Dashboards</span>
            <span className="bg-white/20 px-3 py-1 rounded">Notifications</span>
            <span className="bg-white/20 px-3 py-1 rounded">Document management</span>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="bg-green-600 text-white rounded-lg p-4">
          <h3 className="text-lg mb-2">Layer 3: Apps (Pillars)</h3>
          <div className="flex gap-3 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded">Financial Support</span>
            <span className="bg-white/20 px-3 py-1 rounded">Work Pathways</span>
            <span className="bg-white/20 px-3 py-1 rounded">Venture Support</span>
          </div>
        </div>

        {/* Layer 4 */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg p-4">
          <h3 className="text-lg mb-2">Layer 4: Tekva Labs</h3>
          <div className="flex gap-3 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded">Prototype engine</span>
            <span className="bg-white/20 px-3 py-1 rounded">Pilots</span>
            <span className="bg-white/20 px-3 py-1 rounded">Community tech</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-lg p-4 text-center">
        <p className="text-lg">A single ecosystem powering every part of Tekva.</p>
      </div>
    </div>
  );
}
