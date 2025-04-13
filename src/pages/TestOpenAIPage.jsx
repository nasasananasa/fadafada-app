import React, { useState } from 'react';

export default function TestOpenAIPage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAnalyze = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, mode: 'analyze' })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">اختبار تحليل الرسائل - فضفضة</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="اكتب رسالة نفسية هنا لتجرب التحليل..."
        className="w-full border rounded p-2"
        rows={4}
      />
      <button
        onClick={testAnalyze}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'جاري التحليل...' : 'تحليل'}
      </button>
      {response && (
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {typeof response === 'string'
            ? response
            : JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}