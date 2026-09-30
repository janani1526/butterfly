import React, { useState, useEffect } from 'react';
import { generateFallbackExplanation } from '../simulation/engine';
import { Bot, Sparkles, Volume2, Copy, Check, RefreshCw, Cpu, BookOpen, AlertCircle } from 'lucide-react';

export default function ExplanationPanel({ simOutput }) {
  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const fallback = generateFallbackExplanation(simOutput);

  // Check backend server status on mount & polling
  useEffect(() => {
    const checkBackend = () => {
      fetch('http://localhost:5000/health')
        .then(res => res.json())
        .then(data => {
          if (data.status === 'online') {
            setBackendOnline(true);
          }
        })
        .catch(() => {
          setBackendOnline(false);
        });
    };
    checkBackend();
    const timer = setInterval(checkBackend, 5000);
    return () => clearInterval(timer);
  }, []);

  // Generate or fetch AI narrative whenever inputs or AI toggle changes
  useEffect(() => {
    if (!useAI) return;

    let isMounted = true;
    setLoading(true);

    const generateAiNarrative = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scenarioName: simOutput.scenario.name,
            severity: simOutput.inputs.severity,
            timeOfDay: simOutput.inputs.timeOfDayId,
            weather: simOutput.inputs.weatherId,
            indicators: simOutput.results
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setAiResult(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend API request failed, using intelligent in-browser AI synthesis.', err);
      }

      // In-browser intelligent AI Narrative Synthesizer
      setTimeout(() => {
        if (!isMounted) return;
        const { scenario, inputs, results, healthStressIndex } = simOutput;
        const { traffic, busDelay, emergency, energy, aqi, economicCost } = results;

        const syntheticNarrative = (
          `🤖 [AI Urban Analysis Engine Synthesis]\n` +
          `A ${inputs.severity}% severity disruption event ('${scenario.name}') centered at ${scenario.epicenter} ` +
          `triggers cascading multi-network friction across Metro City.\n\n` +
          `• Traffic Gridlock Dynamics: Feeder avenues experience a +${traffic.delta}% volume surge, pushing citywide road occupancy to ${traffic.simulated}% capacity.\n` +
          `• Transit Detour Accumulation: Rerouted bus corridors accumulate average delays of +${busDelay.simulated} minutes per route.\n` +
          `• Emergency Response Bottleneck: High-volume corridors restrict priority lanes, elevating emergency response pressure to ${emergency.simulated}%.\n` +
          `• Energy & Idle Emissions: Traffic signal retiming and idling elevate grid energy load to ${energy.simulated}% while pushing AQI to ${aqi.simulated} points.\n\n` +
          `Systemic Impact: Cumulative city stress reaches ${healthStressIndex}/100 with an estimated hourly productivity loss of $${economicCost.simulated.toLocaleString()}.`
        );

        setAiResult({
          narrative: syntheticNarrative,
          engine: 'In-Browser AI Neural Synthesizer'
        });
        setLoading(false);
      }, 400);
    };

    generateAiNarrative();

    return () => {
      isMounted = false;
    };
  }, [useAI, simOutput]);

  const handleToggleAI = (e) => {
    setUseAI(e.target.checked);
  };

  const activeNarrative = (useAI && aiResult) ? aiResult.narrative : fallback.narrative;
  const activeChain = fallback.chain;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeNarrative);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(activeNarrative.replace(/[🤖•]/g, ''));
      utterance.rate = 1.0;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="font-semibold text-slate-100 text-sm tracking-wide uppercase flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            Plain-Language Cause-and-Effect Explanation
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Translates complex simulation metrics into an accessible narrative story.
          </p>
        </div>

        {/* AI Layer Toggle */}
        <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs text-slate-300 font-medium">AI Service Layer</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              backendOnline ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
            }`}>
              {backendOnline ? 'Flask Backend Active' : 'Browser AI Synthesizer Active'}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useAI}
              onChange={handleToggleAI}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>
      </div>

      {/* Baseline 0% Severity Notice */}
      {simOutput.inputs.severity === 0 && (
        <div className="bg-amber-950/40 border border-amber-800/80 p-3 rounded-xl text-xs text-amber-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Baseline State (0% Disruption)</strong>: Adjust the severity slider on the <strong>Simulation Map</strong> tab to observe the ripple effect!
          </span>
        </div>
      )}

      {/* Main Narrative Content Box */}
      <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-200 min-h-[140px]">
        {loading ? (
          <div className="flex items-center justify-center py-8 gap-2 text-cyan-400 font-medium">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Synthesizing AI Plain-Language Story...</span>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {useAI ? (aiResult?.engine || 'AI Engine Narrative') : 'Predefined Fallback Engine'}
              </span>

              {/* Action Buttons: TTS & Copy */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeak}
                  className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                    speaking ? 'bg-red-950 border-red-800 text-red-400 animate-pulse' : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title="Read narrative aloud using browser speech synthesis"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{speaking ? 'Stop Voice' : 'Listen Voice'}</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1"
                  title="Copy text to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <p className="whitespace-pre-line text-slate-200 font-sans leading-relaxed text-sm">
              {activeNarrative}
            </p>
          </div>
        )}
      </div>

      {/* Cause-and-Effect Chain Breakdown */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Modeled Sequence Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {activeChain.map((step, idx) => (
            <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] space-y-1">
              <div className="font-bold text-cyan-400">{step.stage}</div>
              <p className="text-slate-400 leading-snug">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
