import React from 'react';
import { Map, BarChart2, Layers, Sparkles, BookOpen } from 'lucide-react';

export default function Header({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'simulation', label: 'Simulation Map', icon: Map },
    { id: 'metrics', label: 'Metrics & Analytics', icon: BarChart2 },
    { id: 'causal', label: 'Cause & Effect', icon: Layers },
    { id: 'runs', label: 'Runs & Formulas', icon: Sparkles },
    { id: 'about', label: 'About & SDG', icon: BookOpen }
  ];

  return (
    <header className="bg-slate-900/95 border border-slate-800 rounded-2xl px-6 py-4 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-extrabold text-lg shadow-inner">
            🦋
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                THE BUTTERFLY EFFECT
              </h1>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded-full">
                Urban Simulation
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              One Tiny Change. A Completely Different World.
            </p>
          </div>
        </div>

        <div className="text-right hidden md:block">
          <div className="text-[11px] font-mono text-cyan-400">Interactive Educational Platform</div>
          <div className="text-[10px] text-slate-500"> deterministic model engine v1.0</div>
        </div>
      </div>

      {/* Top Page Navigation Bar */}
      <nav className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800/90 overflow-x-auto text-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-md ring-1 ring-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
