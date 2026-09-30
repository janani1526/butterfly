import React, { useState } from 'react';
import { runSimulation, SCENARIOS } from './simulation/engine';
import Header from './components/Header';
import ControlsPanel from './components/ControlsPanel';
import MetricsDashboard from './components/MetricsDashboard';
import CityCanvas from './components/CityCanvas';
import RippleGraph from './components/RippleGraph';
import ExplanationPanel from './components/ExplanationPanel';
import FormulaModal from './components/FormulaModal';
import RunComparisonModal from './components/RunComparisonModal';
import EducationalFooter from './components/EducationalFooter';
import { Sparkles, Layers, Sliders, Play } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('simulation'); // 'simulation' | 'metrics' | 'causal' | 'runs' | 'about'
  const [scenarioId, setScenarioId] = useState('road_closure');
  const [severity, setSeverity] = useState(50);
  const [timeOfDayId] = useState('morning');
  const [weatherId] = useState('clear');
  const [currentStep] = useState(3);

  const [customCoefficients, setCustomCoefficients] = useState(null);
  const [savedRuns, setSavedRuns] = useState([]);

  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Run simulation engine
  const simOutput = runSimulation({
    scenarioId,
    severity,
    timeOfDayId,
    weatherId,
    currentStep,
    customCoefficients
  });

  const handleScenarioChange = (id) => {
    setScenarioId(id);
    const sc = SCENARIOS[id];
    if (sc) {
      setSeverity(sc.defaultSeverity || 50);
    }
  };

  const handleReset = () => {
    setScenarioId('road_closure');
    setSeverity(0);
  };

  const handleSaveRun = () => {
    const runToSave = {
      ...simOutput,
      id: Date.now()
    };
    setSavedRuns(prev => [runToSave, ...prev]);
    setActiveTab('runs');
  };

  const handleDeleteRun = (index) => {
    setSavedRuns(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAllRuns = () => {
    setSavedRuns([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 space-y-5 max-w-5xl mx-auto selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Page Navigation Header */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* PAGE 1: SIMULATION MAP STAGE */}
      {activeTab === 'simulation' && (
        <div className="space-y-5 animate-fadeIn">
          <ControlsPanel
            scenarioId={scenarioId}
            severity={severity}
            onScenarioChange={handleScenarioChange}
            onSeverityChange={setSeverity}
            onReset={handleReset}
            onSaveRun={handleSaveRun}
            onOpenFormulas={() => setIsFormulaModalOpen(true)}
            onOpenComparison={() => setIsComparisonModalOpen(true)}
          />

          <CityCanvas simOutput={simOutput} />

          {/* Quick Action Banner to explore narrative or metrics */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Simulation active. Explore the plain-language story or detailed metrics tabs above.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('causal')}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
              >
                Read Cause & Effect Story ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 2: METRICS & ANALYTICS */}
      {activeTab === 'metrics' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div>
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                Comparative Indicators & Stress Score
              </h2>
              <p className="text-xs text-slate-400">
                Baseline vs. Simulated metrics for scenario '{simOutput.scenario.name}' at {severity}% severity.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('simulation')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              ← Back to Map
            </button>
          </div>

          <MetricsDashboard simOutput={simOutput} />
        </div>
      )}

      {/* PAGE 3: CAUSE & EFFECT */}
      {activeTab === 'causal' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div>
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                Causal Sequence & AI Narrative
              </h2>
              <p className="text-xs text-slate-400">
                Connected ripple flow and plain-language explanation.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('simulation')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              ← Back to Map
            </button>
          </div>

          <ExplanationPanel simOutput={simOutput} />
          <RippleGraph simOutput={simOutput} />
        </div>
      )}

      {/* PAGE 4: RUNS & FORMULAS */}
      {activeTab === 'runs' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                  Saved Trial Runs & Model Formulas
                </h2>
                <p className="text-xs text-slate-400">
                  Compare saved simulation runs side-by-side or inspect linear formulas.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFormulaModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inspect & Edit Formulas</span>
                </button>
                <button
                  onClick={() => setIsComparisonModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full Screen Matrix</span>
                </button>
              </div>
            </div>

            {/* Inline Table of Saved Runs */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Saved Trial Run History ({savedRuns.length})
              </h3>
              {savedRuns.length === 0 ? (
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center text-slate-400 text-xs">
                  No runs saved yet. Go to the <strong className="text-cyan-400">Simulation Map</strong> page and click 'Save Run'!
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-mono">
                        <th className="p-3">Scenario & Severity</th>
                        <th className="p-3">Traffic</th>
                        <th className="p-3">Bus Delay</th>
                        <th className="p-3">Emergency</th>
                        <th className="p-3">Energy Load</th>
                        <th className="p-3">Hourly Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {savedRuns.map((run, i) => (
                        <tr key={i} className="hover:bg-slate-900/60">
                          <td className="p-3 font-bold text-slate-100">{run.scenario.name} ({run.inputs.severity}%)</td>
                          <td className="p-3 text-amber-400 font-mono">{run.results.traffic.simulated}%</td>
                          <td className="p-3 text-blue-400 font-mono">+{run.results.busDelay.simulated}m</td>
                          <td className="p-3 text-red-400 font-mono">{run.results.emergency.simulated}%</td>
                          <td className="p-3 text-yellow-400 font-mono">{run.results.energy.simulated}%</td>
                          <td className="p-3 text-purple-400 font-mono font-bold">${run.results.economicCost.simulated.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PAGE 5: ABOUT & SDG GUIDE */}
      {activeTab === 'about' && (
        <div className="space-y-5 animate-fadeIn">
          <EducationalFooter />
        </div>
      )}

      {/* Modals */}
      <FormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        scenarioId={scenarioId}
        customCoefficients={customCoefficients}
        onSaveCoefficients={setCustomCoefficients}
        onResetCoefficients={() => setCustomCoefficients(null)}
      />

      <RunComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        savedRuns={savedRuns}
        onDeleteRun={handleDeleteRun}
        onClearAll={handleClearAllRuns}
      />

    </div>
  );
}
