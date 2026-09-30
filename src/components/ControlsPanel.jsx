import React from 'react';
import { SCENARIOS } from '../simulation/engine';
import { RotateCcw, Play, ChevronDown, Sliders } from 'lucide-react';

export default function ControlsPanel({
  scenarioId,
  severity,
  onScenarioChange,
  onSeverityChange,
  onReset,
  onSaveRun,
  onOpenFormulas,
  onOpenComparison
}) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Step 1: Scenario Selector */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-300 uppercase tracking-wider">
            1. Choose Event Scenario
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Selected: <strong className="text-cyan-400">{SCENARIOS[scenarioId]?.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {Object.values(SCENARIOS).map((sc) => {
            const isSelected = scenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => onScenarioChange(sc.id)}
                className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer font-medium text-xs ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-md ring-1 ring-cyan-400/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">{sc.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{sc.epicenter}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Severity Slider */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            2. Set Disruption Severity
          </label>
          <span className="font-mono text-base font-extrabold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-lg border border-cyan-800 shadow">
            {severity}%
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={severity}
          onChange={(e) => onSeverityChange(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>0% (Normal Operations)</span>
          <span>50% (Moderate Disruption)</span>
          <span>100% (Maximum Gridlock)</span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset City Baseline</span>
          </button>
          
          <button
            onClick={onSaveRun}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
          >
            Save Run
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFormulas}
            className="text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Formulas
          </button>
          <button
            onClick={onOpenComparison}
            className="text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Saved Runs
          </button>
        </div>
      </div>
    </div>
  );
}
