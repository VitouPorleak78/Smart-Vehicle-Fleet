import React, { useState } from 'react';
import { Gauge, Thermometer, Disc, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FleetHealth() {
  const [selectedUnit, setSelectedUnit] = useState('TRK-08');

  const fleetUnits = [
    { id: 'TRK-08', name: 'Heavy Duty Truck 08', status: 'Fault Alert', oil: '24%', temp: '215°F', brake: '78%', volt: '13.8V' },
    { id: 'TRK-03', name: 'Logistics Hauler 03', status: 'Nominal', oil: '82%', temp: '185°F', brake: '42%', volt: '14.1V' },
    { id: 'VAN-22', name: 'Delivery Van 22', status: 'Nominal', oil: '64%', temp: '192°F', brake: '91%', volt: '12.4V' }
  ];

  const currentData = fleetUnits.find(u => u.id === selectedUnit) || fleetUnits[0];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Diagnostics & Health</h1>
        <p className="text-xs text-slate-500 mt-1">Deep diagnostics parameters streamed from onboard mechanical telematics modules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side Asset Lookup List Selector */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden lg:col-span-1">
          <div className="p-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Select Asset Transponder
          </div>
          <div className="divide-y divide-slate-100">
            {fleetUnits.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit.id)}
                className={`w-full text-left p-4 flex items-center justify-between transition-all ${
                  selectedUnit === unit.id ? 'bg-sky-50/50 border-l-4 border-l-sky-400' : 'hover:bg-slate-50/30'
                }`}
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{unit.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mt-0.5">{unit.id}</span>
                </div>
                <ArrowRight className={`h-3 w-3 transition-transform ${selectedUnit === unit.id ? 'text-sky-500 translate-x-0.5' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Real-time Telematics Gauge Readouts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h2 className="text-sm font-black text-slate-900 tracking-tight">{currentData.name} Readouts</h2>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${currentData.status === 'Nominal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                {currentData.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gauge Item 1 */}
              <div className="bg-slate-50/70 border border-slate-200/60 p-4 rounded-lg flex items-center gap-4">
                <div className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-md shadow-xs"><Gauge className="h-5 w-5" /></div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Oil Life Remaining</span>
                  <span className="text-lg font-black text-slate-900 tracking-tight">{currentData.oil}</span>
                </div>
              </div>

              {/* Gauge Item 2 */}
              <div className="bg-slate-50/70 border border-slate-200/60 p-4 rounded-lg flex items-center gap-4">
                <div className="p-2.5 bg-white border border-slate-200 text-rose-500 rounded-md shadow-xs"><Thermometer className="h-5 w-5" /></div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Engine Core Temp</span>
                  <span className="text-lg font-black text-slate-900 tracking-tight">{currentData.temp}</span>
                </div>
              </div>

              {/* Gauge Item 3 */}
              <div className="bg-slate-50/70 border border-slate-200/60 p-4 rounded-lg flex items-center gap-4">
                <div className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-md shadow-xs"><Disc className="h-5 w-5" /></div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Brake Pad Material Wear</span>
                  <span className="text-lg font-black text-slate-900 tracking-tight">{currentData.brake}</span>
                </div>
              </div>

              {/* Gauge Item 4 */}
              <div className="bg-slate-50/70 border border-slate-200/60 p-4 rounded-lg flex items-center gap-4">
                <div className="p-2.5 bg-white border border-slate-200 text-amber-500 rounded-md shadow-xs"><Zap className="h-5 w-5" /></div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Alternator Output Voltage</span>
                  <span className="text-lg font-black text-slate-900 tracking-tight">{currentData.volt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
