import webpush from 'web-push';

const KV = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

webpush.setVapidDetails(
  'mailto:hadishokeir@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

async function kv(cmd) {
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

async function sendToEmail(email, payload) {
  const raw = await kv(['GET', `push_sub_${email}`]);
  if (!raw) return { sent: false, reason: 'no_subscription' };
  const subscription = JSON.parse(raw);
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { sent: true };
  } catch (err) {
    // Remove stale subscription
    if (err.statusCode === 410) await kv(['DEL', `push_sub_${email}`]);
    return { sent: false, reason: err.message };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { token, email, title, body, tag } = req.body;

    const sessions = await getSessions();
    const session = sessions[token];
    if (!session || session.role !== 'tutor') return res.status(403).json({ error: 'Unauthorized' });

    const result = await sendToEmail(email, { title, body, tag: tag || 'arabic-notif' });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
