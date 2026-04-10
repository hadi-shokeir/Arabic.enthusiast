const KV = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function kv(cmd) {
  if (!KV || !KV_TOKEN) throw new Error('KV_NOT_CONFIGURED');
  const r = await fetch(KV, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd)
  });
  const d = await r.json();
  return d.result;
}

async function getSessions() {
  const raw = await kv(['GET', 'sessions']);
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { token, action, data } = req.body;

    const sessions = await getSessions();
    const session = sessions[token];
    if (!session) return res.status(403).json({ error: 'Unauthorized' });

    // Students can read the cloud data (needed for student portal on their own devices)
    if (action === 'studentRead') {
      const raw = await kv(['GET', 'student_data']);
      if (!raw) return res.json({ data: null });
      return res.json({ data: JSON.parse(raw) });
    }

    if (session.role !== 'tutor') return res.status(403).json({ error: 'Unauthorized' });

    if (action === 'backup') {
      // Strip file blobs to save space, keep everything else
      const stripped = { ...data };
      if (stripped.curriculum) {
        stripped.curriculum = stripped.curriculum.map(c => ({ ...c, fileData: '' }));
      }
      await kv(['SET', 'student_data', JSON.stringify(stripped)]);
      await kv(['SET', 'student_data_saved_at', new Date().toISOString()]);
      return res.json({ ok: true, savedAt: new Date().toISOString() });
    }

    if (action === 'restore') {
      const raw = await kv(['GET', 'student_data']);
      const savedAt = await kv(['GET', 'student_data_saved_at']);
      if (!raw) return res.json({ data: null });
      return res.json({ data: JSON.parse(raw), savedAt });
    }

    if (action === 'lastSaved') {
      const savedAt = await kv(['GET', 'student_data_saved_at']);
      return res.json({ savedAt });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
