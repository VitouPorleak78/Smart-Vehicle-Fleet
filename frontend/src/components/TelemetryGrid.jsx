import React, { useState, useEffect } from 'react';

export default function TelemetryGrid() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true); // FIXED: Capitalized L to match its setter calls

    useEffect(() => {
        fetch('http://localhost:5000/api/telemetry/driver/1')
            .then((res) => res.json())
            .then((data) => {
                setLogs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error landing DQL logs:", err);
                setLoading(false);
            })
    }, []);
    
    return (
        <div className="bg-white rounded-lg p-6 border border-[#e2e8f0] shadow-sm w-full">
            <h3 className="text-xl font-bold text-[#0f172a] mb-2">Fleet Operations Control Center</h3>
            <p className="text-sm text-[#64748b] mb-4">
                Streaming vehicle log tables and alert matrices loaded directly from the database.
            </p>

            {loading ? (
                <div className="text-sm text-[#64748b] animate-pulse">Loading records from MySQL...</div>
            ) : logs.length === 0 ? (
                <div className="text-sm text-[#64748b] italic">No telemetry logs found for this driver.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-[#e2e8f0] text-[#475569] font-semibold">
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Propulsion</th>
                                <th className="pb-3">Odometer</th>
                                <th className="pb-3">Fuel (L)</th>
                                <th className="pb-3">EV (kWh)</th>
                                <th className="pb-3">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                            {logs.map((log) => {
                                // Format SQL Date safely for display
                                const formattedDate = log.logDate 
                                    ? new Date(log.logDate).toLocaleDateString() 
                                    : 'N/A';

                                return (
                                    <tr key={log.logID || log.logDate} className="hover:bg-[#f8fafc]">
                                        <td className="py-3 font-medium text-[#0f172a]">{formattedDate}</td>
                                        <td className="py-3 uppercase text-xs font-semibold bg-slate-100 px-2 py-0.5 rounded w-max inline-block my-2">
                                            {log.propulsionType || 'ICE'}
                                        </td>
                                        <td className="py-3">{log.odometer ?? '0'} km</td>
                                        <td className="py-3">{log.fuelConsumption ?? '0.00'} L</td>
                                        
                                        {/* FIXED: Using exact database casing 'EVConsumption' */}
                                        <td className="py-3">
                                            {log.propulsionType !== 'ICE' ? `${log.EVConsumption ?? '0.00'} kWh` : '-'}
                                        </td>
                                        
                                        <td className="py-3 text-xs italic text-slate-500 max-w-xs truncate">
                                            {log.notes || 'No notes'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}