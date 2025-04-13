// /api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, model = 'gpt-3.5-turbo' } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  const allowedModels = ['gpt-3.5-turbo', 'gpt-4'];
  if (!allowedModels.includes(model)) {
    return res.status(400).json({ error: 'Invalid model selected' });
  }

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages
      })
    });

    const data = await completion.json();

    if (completion.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(completion.status).json({ error: data });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to connect to OpenAI', detail: err.message });
  }
} 
