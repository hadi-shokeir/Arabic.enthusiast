export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { type, context } = req.body;
    if (!type || !context) return res.status(400).json({ error: 'Missing type or context' });

    let model, systemPrompt, userMessage;

    switch (type) {
      case 'student_analysis':
        model = 'claude-sonnet-4-6';
        systemPrompt = 'You are an expert Arabic language teaching assistant. Analyze the student data and respond with a concise bulleted list (max 8 bullets). Focus on: current level assessment, strengths, areas needing work, and 2-3 specific teaching recommendations. Be direct and actionable.';
        userMessage = `Student: ${context.name}
Level: ${context.level} | Type: ${context.type}
Lessons taken: ${context.lessonsTaken} | Attendance: ${context.attendance}%
Skills (1-5): Reading ${context.skillReading}, Writing ${context.skillWriting}, Listening ${context.skillListening}, Speaking ${context.skillSpeaking}
Goals: ${context.goals || 'Not specified'}
Next steps: ${context.nextSteps || 'Not specified'}
Teacher notes: ${context.teacherNotes || 'None'}
Homework notes: ${context.homeworkNotes || 'None'}`;
        break;

      case 'homework_feedback':
        model = 'claude-haiku-4-5-20251001';
        systemPrompt = 'You are an Arabic language teacher giving feedback on student homework. Be encouraging, specific, and concise. Max 5 bullet points. Point out what is good, what needs correction, and one tip for improvement.';
        userMessage = `Homework task: ${context.title}
Instructions: ${context.description || 'N/A'}
Student submission: ${context.submission}`;
        break;

      case 'student_chat':
        model = 'claude-haiku-4-5-20251001';
        systemPrompt = `You are a friendly Arabic language learning assistant. The student is studying ${context.type || 'Arabic'} at ${context.level || 'beginner'} level. Their goals: ${context.goals || 'general Arabic learning'}. Keep answers short (2-4 sentences max). Be warm and encouraging.`;
        userMessage = context.message;
        break;

      case 'homework_hint':
        model = 'claude-haiku-4-5-20251001';
        systemPrompt = 'You are an Arabic language teacher giving a small hint to a stuck student. Give ONE hint only — do NOT give the full answer. Keep it to 1-2 sentences. Be encouraging.';
        userMessage = `Homework: ${context.title}\n${context.description || ''}`;
        break;

      case 'student_tasks':
        model = 'claude-haiku-4-5-20251001';
        systemPrompt = `You are an Arabic language tutor. Generate exactly 5 concrete, practical practice tasks for this student to do this week. Each task must be on its own line, starting with a checkbox emoji ☐. Be specific — not generic. Match the tasks to their level, weakest skills, and goals. No explanations, no headers, just 5 lines.`;
        userMessage = `Student: ${context.name}
Level: ${context.level} | Dialect: ${context.type}
Skills (1=weakest, 5=best): Reading ${context.skillReading}/5, Writing ${context.skillWriting}/5, Listening ${context.skillListening}/5, Speaking ${context.skillSpeaking}/5
Goals: ${context.goals || 'general improvement'}
Next focus: ${context.nextSteps || 'not specified'}
Lessons completed: ${context.lessonsTaken} | Attendance: ${context.attendance}%`;
        break;

      default:
        return res.status(400).json({ error: 'Unknown type: ' + type });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    return res.status(200).json({ result: data.content[0].text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
