'use client';
import { useState } from 'react';

export default function Home() {
  const [roomFunction, setRoomFunction] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [spatialConstraints, setSpatialConstraints] = useState('');
  const [budgetTier, setBudgetTier] = useState('');
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
        body: JSON.stringify({ room_function: roomFunction, style_preference: stylePreference, spatial_constraints: spatialConstraints, budget_tier: budgetTier }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response generated.');
    } catch (e: any) { setOutput('Error: ' + e.message); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 mb-6">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AI Interior Designer
          </h1>
          <p className="text-gray-400 text-lg">Generate room layouts, mood boards & furniture plans</p>
        </header>

        <form onSubmit={handleGenerate} className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Room Function</label>
            <input value={roomFunction} onChange={e => setRoomFunction(e.target.value)} placeholder="e.g. Open-plan living room, Home office, Master bedroom..." required
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Style Preference</label>
              <select value={stylePreference} onChange={e => setStylePreference(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
                {['Modern Minimalist', 'Mid-Century Modern', 'Scandinavian', 'Industrial', 'Bohemian', 'Japandi', 'Coastal/Nautical', 'Art Deco', 'Farmhouse', 'Contemporary', 'Traditional', 'Mediterranean'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Budget Tier</label>
              <select value={budgetTier} onChange={e => setBudgetTier(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
                {['Budget ($)', 'Mid-Range ($$)', 'Premium ($$$)', 'Luxury ($$$$)'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Spatial Constraints</label>
            <textarea value={spatialConstraints} onChange={e => setSpatialConstraints(e.target.value)} rows={2}
              placeholder="e.g. 12x15 ft, limited natural light, load-bearing wall at north end, needs home office corner..."
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.01] active:scale-[0.99]">
            {loading ? '🏠 Designing Room...' : '🏠 Generate Room Design'}
          </button>
        </form>

        {output && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">Interior Design Concept</h3>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
