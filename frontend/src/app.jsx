import React, { useState } from 'react';
import DriverHub from './components/DriverHub';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  if (currentPage === 'driver') {
    return (
      <div className="min-h-screen w-full bg-slate-100">
        <div className="px-4 py-4">
          <button
            onClick={() => setCurrentPage('login')}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Back to selection
          </button>
        </div>
        <DriverHub />
      </div>
    );
  }

  if (currentPage === 'fleet') {
    return (
      <div className="min-h-screen w-full bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <button
            onClick={() => setCurrentPage('login')}
            className="mb-6 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Back to selection
          </button>
          <h1 className="text-2xl font-semibold text-slate-900">Fleet Operator Page</h1>
          <p className="mt-3 text-sm text-slate-600">
            This placeholder page will be replaced with the fleet-operator view once the HTML is provided.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">Vehicle Fleet Portal</h1>
        <p className="mt-2 text-sm text-slate-600">Choose a dashboard to continue.</p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setCurrentPage('driver')}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Driver Page
          </button>
          <button
            onClick={() => {
              window.location.href = '/fleet_operator/FleetOperator.html';
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Go to Fleet Operator Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;