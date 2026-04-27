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

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const raw = await kv(['GET', 'site_content']);
      const savedAt = await kv(['GET', 'site_content_saved_at']);
      return res.json({ content: raw ? JSON.parse(raw) : null, savedAt });
    }

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { token, content } = req.body || {};
    if (!token) return res.status(403).json({ error: 'Unauthorized' });

    const sessions = await getSessions();
    const session = sessions[token];
    if (!session || session.role !== 'tutor') return res.status(403).json({ error: 'Unauthorized' });
    if (!content || typeof content !== 'object') return res.status(400).json({ error: 'No content' });

    const json = JSON.stringify(content);
    if (json.length > 350000) {
      return res.status(400).json({ error: 'Website content is too large. Remove large pasted data or images.' });
    }

    const savedAt = new Date().toISOString();
    await kv(['SET', 'site_content', json]);
    await kv(['SET', 'site_content_saved_at', savedAt]);
    return res.json({ ok: true, savedAt });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
