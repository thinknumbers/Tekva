export function ExecutionPlanSlide() {
  const months = [
    {
      num: 1,
      title: 'Discover & Design',
      color: 'blue',
      items: [
        'Validate needs for all 3 pillars',
        'Define data model',
        'Map workflows',
        'Confirm quick wins',
      ],
    },
    {
      num: 2,
      title: 'Build Fast & Prototype',
      color: 'purple',
      items: [
        'Financial Support app v1',
        'WorkPath intake + GPT',
        'Venture intake + Founder GPT',
        'Shared component library',
        'Tekva Labs setup',
      ],
    },
    {
      num: 3,
      title: 'Pilot & Scale',
      color: 'green',
      items: [
        'Pilot with 5–10 families + 2–3 employers + 2 ventures',
        'Collect data + feedback',
        'Improve UX',
        'Publish analytics dashboard',
        'Prepare v2 roadmap',
      ],
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-600',
    purple: 'bg-purple-50 border-purple-600',
    green: 'bg-green-50 border-green-600',
  };

  const badgeClasses = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-4xl text-blue-600 mb-2">The 90-Day Execution Plan</h2>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-4">
        {months.map((month) => (
          <div key={month.num} className={`${colorClasses[month.color]} rounded-lg p-5 border-l-4 flex flex-col`}>
            <div className={`${badgeClasses[month.color]} text-white rounded-full w-10 h-10 flex items-center justify-center mb-3`}>
              {month.num}
            </div>
            <h3 className="text-xl text-slate-800 mb-3">{month.title}</h3>
            <ul className="space-y-2 flex-1">
              {month.items.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-4 text-center">
        <p>Month 1 → Month 2 → Month 3 = Fully Functional Platform</p>
      </div>
    </div>
  );
}
