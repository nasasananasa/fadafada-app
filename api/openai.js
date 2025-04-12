export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { message, mode, model = 'gpt-3.5-turbo' } = req.body;
  
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Missing OpenAI API key' });
    }
  
    if (!message || !mode) {
      return res.status(400).json({ error: 'Missing message or mode' });
    }
  
    try {
      // إعداد الرسائل بناءً على نوع العملية
      const messages =
        mode === 'analyze'
          ? [
              {
                role: 'system',
                content:
                  'أنت مساعد ذكي متخصص في تحليل الرسائل. أجب فقط بـ "yes" إذا كانت الرسالة تحتوي على إشارات نفسية مثل القلق، الاكتئاب، الوحدة، أو مشاكل شخصية. أجب بـ "no" إذا لم تكن كذلك.',
              },
              { role: 'user', content: message },
            ]
          : [
              {
                role: 'system',
                content:
                  'أنت مستشار نفسي حساس ومتفهم. اجعل ردك داعمًا، دافئًا، وملائمًا للموقف.',
              },
              { role: 'user', content: message },
            ];
  
      const completion = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      });
  
      const data = await completion.json();
  
      if (!completion.ok) {
        return res.status(completion.status).json({ error: data });
      }
  
      const reply = data.choices[0].message.content.trim();
  
      if (mode === 'analyze') {
        const isTherapy = reply.toLowerCase().includes('yes');
        return res.status(200).json({ therapy: isTherapy });
      }
  
      return res.status(200).json({ reply });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to connect to OpenAI', detail: err.message });
    }
  }
  