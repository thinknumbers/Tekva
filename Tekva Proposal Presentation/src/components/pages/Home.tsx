import { DollarSign, Briefcase, Rocket, ArrowRight, Users, BarChart, Shield } from 'lucide-react';
import { Page } from '../../App';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const pillars = [
    {
      id: 'financial' as Page,
      icon: DollarSign,
      title: 'Financial Support',
      description: 'Stability and dignity for families in need',
      color: 'blue',
      features: ['Smart application forms', 'Secure document upload', 'Fast processing'],
    },
    {
      id: 'work' as Page,
      icon: Briefcase,
      title: 'Work Pathways',
      description: 'Skills, employment, and independence',
      color: 'green',
      features: ['Skills assessment', 'Job matching', 'Career development'],
    },
    {
      id: 'venture' as Page,
      icon: Rocket,
      title: 'Venture Support',
      description: 'Empowering founders and innovation',
      color: 'purple',
      features: ['Founder support', 'Business tools', 'Pitch assistance'],
    },
  ];

  const stats = [
    { icon: Users, label: 'Families Supported', value: '250+' },
    { icon: Briefcase, label: 'Job Placements', value: '89' },
    { icon: Rocket, label: 'Ventures Launched', value: '12' },
    { icon: BarChart, label: 'Success Rate', value: '94%' },
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl mb-6">
              Turning Vision Into Systems
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A unified platform supporting the Jewish community through financial assistance, 
              employment pathways, and venture innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('financial')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/30"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 px-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl text-slate-900 mb-4">Three Pillars of Support</h2>
            <p className="text-xl text-slate-600">
              Comprehensive solutions for community empowerment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className={`bg-gradient-to-br ${colorClasses[pillar.color]} p-6 text-white`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl mb-2">{pillar.title}</h3>
                    <p className="text-white/90">{pillar.description}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {pillar.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onNavigate(pillar.id)}
                      className={`w-full bg-gradient-to-r ${colorClasses[pillar.color]} text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2`}
                    >
                      Apply Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl text-slate-900 mb-4">Why Tekva?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-3">Dignity First</h3>
              <p className="text-slate-600">
                Respectful, streamlined processes that honor every individual's story
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <BarChart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-3">Data-Driven</h3>
              <p className="text-slate-600">
                Smart analytics and AI-powered insights for better outcomes
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-3">Community-Centered</h3>
              <p className="text-slate-600">
                Built for and by the community, with transparency at the core
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
