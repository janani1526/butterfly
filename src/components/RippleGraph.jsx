import React, { useState } from 'react';
import { ArrowRight, Activity, Bus, AlertCircle, Zap, DollarSign, HelpCircle, Layers } from 'lucide-react';

export default function RippleGraph({ simOutput, onNodeClick }) {
  const [activeNode, setActiveNode] = useState('event');
  const { scenario, results, inputs } = simOutput;
  const { traffic, busDelay, emergency, energy, aqi, economicCost } = results;

  const nodes = [
    {
      id: 'event',
      title: scenario.name,
      subtitle: `Hypothetical Event (${inputs.severity}% Severity)`,
      metric: `${inputs.severity}% Severity`,
      icon: AlertCircle,
      color: 'border-red-500 bg-red-950/40 text-red-400',
      activeColor: 'ring-2 ring-red-400 bg-red-900/60',
      formula: 'User Selected Input Trigger',
      explanation: scenario.description
    },
    {
      id: 'traffic',
      title: 'Traffic Congestion',
      subtitle: 'Feeder Road Saturation',
      metric: `${traffic.simulated}% (+${traffic.delta}%)`,
      icon: Activity,
      color: 'border-amber-500 bg-amber-950/40 text-amber-400',
      activeColor: 'ring-2 ring-amber-400 bg-amber-900/60',
      formula: `Traffic = Baseline(20) + (0.75 × Severity) = ${traffic.simulated}%`,
      explanation: 'Disrupted vehicles spill onto surrounding roads, creating vehicle queue bottlenecks that reduce average arterial speeds.'
    },
    {
      id: 'bus',
      title: 'Bus Transit Delay',
      subtitle: 'Public Route Detours',
      metric: `+${busDelay.simulated} min`,
      icon: Bus,
      color: 'border-blue-500 bg-blue-950/40 text-blue-400',
      activeColor: 'ring-2 ring-blue-400 bg-blue-900/60',
      formula: `Bus Delay = Baseline(15) + (0.55 × Severity) = ${busDelay.simulated} min`,
      explanation: 'Buses stuck in mixed traffic reroutes miss scheduled connections, compounding passenger dwell times at bus stops.'
    },
    {
      id: 'emergency',
      title: 'Emergency Pressure',
      subtitle: 'Dispatch Travel Lag',
      metric: `${emergency.simulated}% (+${emergency.delta}%)`,
      icon: AlertCircle,
      color: 'border-rose-500 bg-rose-950/40 text-rose-400',
      activeColor: 'ring-2 ring-rose-400 bg-rose-900/60',
      formula: `Emergency Load = Baseline(10) + (0.40 × Severity) = ${emergency.simulated}%`,
      explanation: 'Gridlocked corridors restrict emergency vehicle right-of-way, increasing response times for critical ambulance and fire calls.'
    },
    {
      id: 'energy_aqi',
      title: 'Energy & Emissions',
      subtitle: 'Grid & Air Toxicity',
      metric: `${energy.simulated}% Load | ${aqi.simulated} AQI`,
      icon: Zap,
      color: 'border-cyan-500 bg-cyan-950/40 text-cyan-400',
      activeColor: 'ring-2 ring-cyan-400 bg-cyan-900/60',
      formula: `Energy = Baseline(30) + (0.25 × Severity); AQI = Baseline(40) + (0.65 × Severity)`,
      explanation: 'Vehicle engine idling increases toxic tailpipe emissions while traffic signal control units pull additional power to manage congestion.'
    },
    {
      id: 'cost',
      title: 'Economic Loss',
      subtitle: 'Productivity Impact',
      metric: `$${economicCost.simulated.toLocaleString()}/hr`,
      icon: DollarSign,
      color: 'border-emerald-500 bg-emerald-950/40 text-emerald-400',
      activeColor: 'ring-2 ring-emerald-400 bg-emerald-900/60',
      formula: `Economic Loss = Severity × $1,850 × Time Modifier = $${economicCost.simulated.toLocaleString()}`,
      explanation: 'Delayed workforce arrivals, supply chain logistics friction, and wasted fuel lead to cumulative hourly financial productivity loss.'
    }
  ];

  const currentSelected = nodes.find(n => n.id === activeNode) || nodes[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-100 text-sm tracking-wide uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Causal Dependency Graph & Ripple Flow
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any node below to inspect its deterministic math equation & underlying urban model assumption.
          </p>
        </div>
        <span className="text-[11px] font-mono bg-cyan-950/60 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-800/60">
          6 System Nodes Connected
        </span>
      </div>

      {/* Ripple Nodes Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = activeNode === node.id;
          return (
            <div key={node.id} className="relative flex flex-col items-center">
              <button
                onClick={() => {
                  setActiveNode(node.id);
                  if (onNodeClick) onNodeClick(node);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${node.color} ${
                  isSelected ? node.activeColor + ' shadow-lg scale-[1.02]' : 'hover:border-slate-600 opacity-90 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900/60 border border-slate-700">
                    Step {index + 1}
                  </span>
                </div>
                <div className="font-semibold text-xs text-slate-100 truncate">{node.title}</div>
                <div className="text-[10px] text-slate-400 mb-2 truncate">{node.subtitle}</div>
                <div className="font-bold text-xs tracking-tight">{node.metric}</div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Node Details / Mathematical Logic Drawer */}
      <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200">Model Rule Details: <span className="text-cyan-400">{currentSelected.title}</span></span>
          </div>
          <span className="font-mono text-[11px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
            {currentSelected.formula}
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {currentSelected.explanation}
        </p>
      </div>
    </div>
  );
}
