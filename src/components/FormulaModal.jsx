import React, { useState } from 'react';
import { SCENARIOS } from '../simulation/engine';
import { X, Sparkles, AlertCircle, RotateCcw, Save } from 'lucide-react';

export default function FormulaModal({ isOpen, onClose, scenarioId, customCoefficients, onSaveCoefficients, onResetCoefficients }) {
  if (!isOpen) return null;

  const scenario = SCENARIOS[scenarioId] || SCENARIOS.road_closure;
  const defaults = scenario.baseRules;

  const [rules, setRules] = useState(customCoefficients || defaults);

  const handleChange = (key, val) => {
    setRules(prev => ({
      ...prev,
      [key]: Number(val)
    }));
  };

  const handleSave = () => {
    onSaveCoefficients(rules);
    onClose();
  };

  const handleReset = () => {
    setRules(defaults);
    onResetCoefficients();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-slate-200">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Transparent Model Formula Inspector & Sandbox
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
          <div className="font-bold text-cyan-400 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span>Deterministic Math Model Rules ({scenario.name})</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            The simulation calculates outputs deterministically using linear equations clamped by upper bound limits [0, 100]. You can adjust coefficients below to test different sensitivity models.
          </p>
        </div>

        {/* Math Equations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200">Traffic Congestion Index (%)</div>
            <div className="font-mono text-cyan-400 text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
              Traffic = min(100, 20 + {rules.trafficCoef} × Severity × TimeMod × WeatherMod)
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Traffic Sensitivity Coefficient:</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="2.0"
                value={rules.trafficCoef}
                onChange={(e) => handleChange('trafficCoef', e.target.value)}
                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-cyan-400 text-right"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200">Public Transport Delay (min)</div>
            <div className="font-mono text-cyan-400 text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
              Bus Delay = min(120, 15 + {rules.busDelayCoef} × Severity × WeatherMod)
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Transit Delay Coefficient:</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="2.0"
                value={rules.busDelayCoef}
                onChange={(e) => handleChange('busDelayCoef', e.target.value)}
                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-cyan-400 text-right"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200">Emergency Response Pressure (%)</div>
            <div className="font-mono text-cyan-400 text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
              Emergency = min(100, 10 + {rules.emergencyCoef} × Severity × TimeFactor)
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Emergency Sensitivity Coefficient:</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="2.0"
                value={rules.emergencyCoef}
                onChange={(e) => handleChange('emergencyCoef', e.target.value)}
                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-cyan-400 text-right"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200">Energy Grid Load (%)</div>
            <div className="font-mono text-cyan-400 text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
              Energy Load = min(100, 30 + {rules.energyCoef} × Severity)
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Energy Grid Coefficient:</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="2.0"
                value={rules.energyCoef}
                onChange={(e) => handleChange('energyCoef', e.target.value)}
                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-cyan-400 text-right"
              />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center border-t border-slate-800 pt-3 text-xs">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Formulas</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center gap-1"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Custom Model</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
