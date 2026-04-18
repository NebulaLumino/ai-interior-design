'use client';
import React, { useState } from 'react';

export default function Home() {
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const btnLabel = loading ? 'Generating...' : 'Generate';

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ f1, f2, f3, f4 })
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch(e: any) {
      setOutput('Error: ' + e.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">AI Interior Design</h1>
          <p className="text-gray-400 mb-8">Generate interior design concepts for rooms with function, style, and budget.</p>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Room Function</label>
              <input value={f1} onChange={(e) => setF1(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Type here..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Style Preference</label>
              <input value={f2} onChange={(e) => setF2(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Type here..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Spatial Constraints</label>
              <input value={f3} onChange={(e) => setF3(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Type here..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Budget Tier</label>
              <input value={f4} onChange={(e) => setF4(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Type here..." />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50 bg-violet-600">
              {btnLabel}
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