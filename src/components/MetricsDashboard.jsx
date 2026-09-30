import React from 'react';
import { Activity, Bus, ShieldAlert, Zap, Wind, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function MetricsDashboard({ simOutput }) {
  const { results, healthStressIndex } = simOutput;
  const { traffic, busDelay, emergency, energy, aqi, economicCost } = results;

  const cards = [
    {
      key: 'traffic',
      title: traffic.name,
      baseline: `${traffic.baseline}%`,
      simulated: `${traffic.simulated}%`,
      delta: `+${traffic.delta}%`,
      status: traffic.status,
      unit: '%',
      val: traffic.simulated,
      max: 100,
      icon: Activity,
      color: 'from-amber-500 to-red-500',
      statusBg: traffic.status === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      key: 'busDelay',
      title: busDelay.name,
      baseline: `${busDelay.baseline} min`,
      simulated: `${busDelay.simulated} min`,
      delta: `+${busDelay.delta} min`,
      status: busDelay.status,
      unit: 'min',
      val: busDelay.simulated,
      max: 120,
      icon: Bus,
      color: 'from-blue-500 to-cyan-500',
      statusBg: busDelay.status === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
    },
    {
      key: 'emergency',
      title: emergency.name,
      baseline: `${emergency.baseline}%`,
      simulated: `${emergency.simulated}%`,
      delta: `+${emergency.delta}%`,
      status: emergency.status,
      unit: '%',
      val: emergency.simulated,
      max: 100,
      icon: ShieldAlert,
      color: 'from-rose-500 to-pink-500',
      statusBg: emergency.status === 'Critical' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-orange-500/20 text-orange-400 border-orange-500/40'
    },
    {
      key: 'energy',
      title: energy.name,
      baseline: `${energy.baseline}%`,
      simulated: `${energy.simulated}%`,
      delta: `+${energy.delta}%`,
      status: energy.status,
      unit: '%',
      val: energy.simulated,
      max: 100,
      icon: Zap,
      color: 'from-yellow-500 to-amber-500',
      statusBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      key: 'aqi',
      title: aqi.name,
      baseline: `${aqi.baseline} AQI`,
      simulated: `${aqi.simulated} AQI`,
      delta: `+${aqi.delta} pts`,
      status: aqi.status,
      unit: 'AQI',
      val: aqi.simulated,
      max: 250,
      icon: Wind,
      color: 'from-emerald-500 to-teal-500',
      statusBg: aqi.status === 'Unhealthy' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    {
      key: 'economicCost',
      title: economicCost.name,
      baseline: `$0/hr`,
      simulated: `$${economicCost.simulated.toLocaleString()}/hr`,
      delta: `+$${economicCost.simulated.toLocaleString()}`,
      status: economicCost.status,
      unit: '$/hr',
      val: Math.min(100, (economicCost.simulated / 300000) * 100),
      max: 100,
      icon: DollarSign,
      color: 'from-purple-500 to-indigo-500',
      statusBg: 'bg-purple-500/20 text-purple-400 border-purple-500/40'
    }
  ];

  return (
    <div className="space-y-4">
      {/* City System Stress Index Header Meter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-4 border-slate-800 bg-slate-950 shadow-inner">
            <span className={`text-xl font-bold font-mono ${
              healthStressIndex > 70 ? 'text-red-400' : healthStressIndex > 45 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {healthStressIndex}
            </span>
            <span className="absolute text-[9px] text-slate-400 -bottom-1">/100</span>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Metro System Stress Score
            </div>
            <div className="text-lg font-bold text-slate-100 flex items-center gap-2">
              {healthStressIndex > 70 ? 'High Infrastructure Strain' : healthStressIndex > 45 ? 'Elevated Network Stress' : 'Stable Urban Equilibrium'}
              <span className={`text-xs px-2 py-0.5 rounded border ${
                healthStressIndex > 70 ? 'bg-red-950 text-red-400 border-red-800' : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                {healthStressIndex > 70 ? 'CRITICAL' : 'MODERATE'}
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Stress Bar */}
        <div className="w-full md:w-1/2 space-y-1">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>0 (Optimal)</span>
            <span>Cumulative Stress Load</span>
            <span>100 (Paralyzed)</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                healthStressIndex > 70 ? 'from-amber-500 to-red-500' : 'from-emerald-500 to-amber-500'
              }`}
              style={{ width: `${healthStressIndex}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => {
          const Icon = card.icon;
          const percentOfMax = Math.min(100, Math.max(0, (card.val / card.max) * 100));

          return (
            <div
              key={card.key}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 shadow-lg transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-200">{card.title}</h4>
                      <span className="text-[11px] text-slate-400">Baseline: {card.baseline}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${card.statusBg}`}>
                    {card.status}
                  </span>
                </div>

                <div className="my-3 flex items-baseline justify-between">
                  <div className="text-2xl font-extrabold text-slate-100 font-mono">
                    {card.simulated}
                  </div>
                  <div className="flex items-center text-xs font-semibold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    {card.delta}
                  </div>
                </div>
              </div>

              {/* Progress Meter */}
              <div className="space-y-1 mt-2">
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                  <div
                    className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${card.color}`}
                    style={{ width: `${percentOfMax}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Scale Min: 0</span>
                  <span>Max: {card.max}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
