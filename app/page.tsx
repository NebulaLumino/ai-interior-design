'use client';
import { useState } from 'react';

export default function Home() {
const [RoomFunction, setRoomFunction] = useState('');
const [StylePreference, setStylePreference] = useState('');
const [SpatialConstraints, setSpatialConstraints] = useState('');
const [BudgetTier, setBudgetTier] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_function, style_preference, spatial_constraints, budget_tier }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch(e: any) { setOutput('Error: ' + e.message); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Interior Design Concept</h1>
          <p className="text-gray-400 mb-8">Generate interior design concepts with furniture selection.</p>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div><label className="block text-sm text-gray-400 mb-1">Room Function</label><input value={RoomFunction} onChange={e=>setRoomFunction(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter room function..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Style Preference</label><input value={StylePreference} onChange={e=>setStylePreference(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter style preference..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Spatial Constraints</label><input value={SpatialConstraints} onChange={e=>setSpatialConstraints(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter spatial constraints..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Budget Tier</label><input value={BudgetTier} onChange={e=>setBudgetTier(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter budget tier..." /></div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50 transition-opacity"
              style={backgroundColor: 'hsl(270,65%,55%)'}>
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          {output && (
            <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-200">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}