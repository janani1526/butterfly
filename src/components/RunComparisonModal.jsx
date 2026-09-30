import React from 'react';
import { X, Layers, Trash2, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function RunComparisonModal({ isOpen, onClose, savedRuns, onDeleteRun, onClearAll }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-5 text-slate-200 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Saved Simulation Trial Runs Comparison
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedRuns.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Activity className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm">No saved simulation trial runs yet.</p>
            <p className="text-xs text-slate-500">
              Run a simulation on the main dashboard and click <span className="text-cyan-400 font-semibold">'Save Trial Run'</span> to compare multiple input severities side-by-side!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono">Comparing {savedRuns.length} Saved Trial Runs</span>
              <button
                onClick={onClearAll}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Saved Runs</span>
              </button>
            </div>

            {/* Side-by-side comparative table */}
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900 text-slate-300 font-mono">
                    <th className="p-3">Scenario & Severity</th>
                    <th className="p-3">Traffic (%)</th>
                    <th className="p-3">Bus Delay (min)</th>
                    <th className="p-3">Emergency (%)</th>
                    <th className="p-3">Energy Load (%)</th>
                    <th className="p-3">AQI Impact</th>
                    <th className="p-3">Hourly Cost</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {savedRuns.map((run, idx) => (
                    <tr key={run.id || idx} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3 font-medium">
                        <div className="text-slate-100 font-bold">{run.scenario.name}</div>
                        <div className="text-[10px] text-cyan-400 font-mono">
                          {run.inputs.severity}% Severity | {run.timestamp}
                        </div>
                      </td>
                      <td className="p-3 font-mono text-amber-400">
                        {run.results.traffic.simulated}%
                        <span className="text-[10px] text-slate-400 ml-1">(+{run.results.traffic.delta}%)</span>
                      </td>
                      <td className="p-3 font-mono text-blue-400">
                        +{run.results.busDelay.simulated}m
                      </td>
                      <td className="p-3 font-mono text-red-400">
                        {run.results.emergency.simulated}%
                      </td>
                      <td className="p-3 font-mono text-yellow-400">
                        {run.results.energy.simulated}%
                      </td>
                      <td className="p-3 font-mono text-emerald-400">
                        {run.results.aqi.simulated}
                      </td>
                      <td className="p-3 font-mono text-purple-400 font-bold">
                        ${run.results.economicCost.simulated.toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onDeleteRun(idx)}
                          className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                          title="Delete run"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="border-t border-slate-800 pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
