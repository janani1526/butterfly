import React, { useRef, useEffect, useState } from 'react';
import { SCENARIOS } from '../simulation/engine';
import { Activity, Bus, ShieldAlert, Zap, Info } from 'lucide-react';

export default function CityCanvas({ simOutput, onDistrictSelect }) {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const { scenario, results, inputs, healthStressIndex } = simOutput;
  const { traffic, busDelay, emergency, energy } = results;
  const severity = inputs.severity;

  const districts = [
    { id: 'epicenter', name: scenario.epicenter || 'Bridge Epicenter', x: 0.35, y: 0.45, type: 'epicenter', icon: '⚡' },
    { id: 'downtown', name: 'Downtown Core', x: 0.65, y: 0.40, type: 'commercial', icon: '🏙️' },
    { id: 'hospital', name: 'North Hospital & Emergency HQ', x: 0.55, y: 0.18, type: 'medical', icon: '🏥' },
    { id: 'suburbs', name: 'West Suburbs', x: 0.15, y: 0.55, type: 'residential', icon: '🏡' },
    { id: 'depot', name: 'Central Bus Terminal', x: 0.40, y: 0.72, type: 'transit', icon: '🚌' },
    { id: 'substation', name: 'Substation Alpha Grid', x: 0.80, y: 0.70, type: 'energy', icon: '⚡' }
  ];

  const roads = [
    { from: 'suburbs', to: 'epicenter' },
    { from: 'epicenter', to: 'downtown' },
    { from: 'downtown', to: 'hospital' },
    { from: 'suburbs', to: 'depot' },
    { from: 'depot', to: 'epicenter' },
    { from: 'downtown', to: 'substation' },
    { from: 'depot', to: 'substation' },
    { from: 'hospital', to: 'epicenter' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particleOffset = 0;
    let rippleRadius = 0;

    const render = () => {
      const width = canvas.parentElement.clientWidth;
      const height = Math.max(360, Math.min(460, width * 0.45));
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Roads
      roads.forEach(road => {
        const startNode = districts.find(d => d.id === road.from);
        const endNode = districts.find(d => d.id === road.to);
        if (!startNode || !endNode) return;

        const x1 = startNode.x * width;
        const y1 = startNode.y * height;
        const x2 = endNode.x * width;
        const y2 = endNode.y * height;

        const isEpicenterRoad = road.from === 'epicenter' || road.to === 'epicenter';
        const congestionRatio = traffic.simulated / 100;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = isEpicenterRoad ? 7 : 4.5;
        
        if (isEpicenterRoad && scenario.id === 'road_closure') {
          ctx.strokeStyle = '#ef4444';
          ctx.setLineDash([7, 5]);
        } else {
          ctx.setLineDash([]);
          const r = Math.round(34 + congestionRatio * (239 - 34));
          const g = Math.round(197 - congestionRatio * (197 - 68));
          const b = Math.round(94 - congestionRatio * (94 - 68));
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
        }
        ctx.stroke();
        ctx.setLineDash([]);

        const distance = Math.hypot(x2 - x1, y2 - y1);
        const particleSpeed = Math.max(0.25, 2.2 * (1 - congestionRatio * 0.75));
        const particleCount = Math.floor(distance / 38);

        for (let i = 0; i < particleCount; i++) {
          const progress = ((particleOffset * particleSpeed + i * 38) % distance) / distance;
          const px = x1 + (x2 - x1) * progress;
          const py = y1 + (y2 - y1) * progress;

          ctx.beginPath();
          ctx.arc(px, py, isEpicenterRoad ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = congestionRatio > 0.6 ? '#f87171' : '#fde047';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 5;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Butterfly Ripple Waves
      const epicenterNode = districts.find(d => d.id === 'epicenter');
      if (epicenterNode) {
        const ex = epicenterNode.x * width;
        const ey = epicenterNode.y * height;

        rippleRadius = (rippleRadius + 0.8 * (severity / 50)) % 150;
        const rippleAlpha = Math.max(0, 1 - rippleRadius / 150);

        ctx.beginPath();
        ctx.arc(ex, ey, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = scenario.color || '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = rippleAlpha * 0.8;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1.0;
      }

      // Draw District Nodes
      districts.forEach(node => {
        const nx = node.x * width;
        const ny = node.y * height;
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        const isEpicenter = node.id === 'epicenter';

        ctx.beginPath();
        ctx.arc(nx, ny, isEpicenter ? 26 : 20, 0, Math.PI * 2);
        ctx.fillStyle = isEpicenter ? 'rgba(239, 68, 68, 0.25)' : 'rgba(56, 189, 248, 0.15)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, isHovered ? 18 : 14, 0, Math.PI * 2);
        ctx.fillStyle = isEpicenter ? '#991b1b' : '#1e293b';
        ctx.strokeStyle = isEpicenter ? '#f87171' : isHovered ? '#38bdf8' : '#64748b';
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.fill();
        ctx.stroke();

        ctx.font = '11px Inter, system-ui, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        ctx.fillText(node.icon + ' ' + node.name, nx, ny + 30);
      });

      particleOffset += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [simOutput, hoveredNode]);

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const hit = districts.find(d => Math.hypot(d.x - x, d.y - y) < 0.08);
    setHoveredNode(hit || null);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
      {/* Visual Header */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <h3 className="font-semibold text-slate-100 text-xs tracking-wide uppercase">
            Virtual City Mesh Map
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono">City Stress:</span>
          <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${
            healthStressIndex > 70 ? 'bg-red-950 text-red-400 border-red-800' : 'bg-amber-950 text-amber-400 border-amber-800'
          }`}>
            {healthStressIndex}/100 {healthStressIndex > 70 ? 'CRITICAL' : 'ELEVATED'}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full rounded-xl overflow-hidden border border-slate-800">
        <canvas
          ref={canvasRef}
          onMouseMove={handleCanvasMouseMove}
          className="w-full h-[360px] block cursor-pointer"
        />

        {hoveredNode && (
          <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 p-2.5 rounded-lg text-xs text-slate-200 shadow-xl pointer-events-none">
            <div className="font-bold text-cyan-400">{hoveredNode.icon} {hoveredNode.name}</div>
            <div className="text-[11px] text-slate-400">District: {hoveredNode.type}</div>
          </div>
        )}
      </div>

      {/* Live Core Indicator Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400">Traffic Congestion</div>
            <div className="font-bold text-amber-400 font-mono">{traffic.simulated}% (+{traffic.delta}%)</div>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <Bus className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400">Bus Transit Delay</div>
            <div className="font-bold text-blue-400 font-mono">+{busDelay.simulated} min</div>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400">Emergency Load</div>
            <div className="font-bold text-red-400 font-mono">{emergency.simulated}%</div>
          </div>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400">Energy Grid Load</div>
            <div className="font-bold text-yellow-400 font-mono">{energy.simulated}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
