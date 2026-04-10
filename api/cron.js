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

async function sendToEmail(email, payload) {
  const raw = await kv(['GET', `push_sub_${email}`]);
  if (!raw) return;
  try {
    await webpush.sendNotification(JSON.parse(raw), JSON.stringify(payload));
  } catch (err) {
    if (err.statusCode === 410) await kv(['DEL', `push_sub_${email}`]);
  }
}

export default async function handler(req, res) {
  // Vercel cron sends GET with Authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const raw = await kv(['GET', 'student_data']);
    if (!raw) return res.json({ ok: true, sent: 0 });

    const data = JSON.parse(raw);
    const students = data.students || [];
    const homework = data.homework || [];
    const today = new Date().toISOString().split('T')[0];
    let sent = 0;

    for (const s of students) {
      if (!s.email || !s.active) continue;

      const pendingTasks = (s.weeklyTasks || []).filter(t => !t.doneAt);
      const pendingHw = homework.filter(hw => hw.studentId === s.id && hw.status === 'assigned');
      const overdueHw = pendingHw.filter(hw => hw.dueDate && hw.dueDate < today);

      const parts = [];
      if (pendingTasks.length > 0) parts.push(`${pendingTasks.length} task${pendingTasks.length > 1 ? 's' : ''} to complete`);
      if (overdueHw.length > 0) parts.push(`${overdueHw.length} overdue homework`);
      if (pendingHw.length > 0 && overdueHw.length === 0) parts.push(`${pendingHw.length} homework due`);

      if (parts.length === 0) continue;

      const firstName = s.name.split(' ')[0];
      await sendToEmail(s.email, {
        title: `Hey ${firstName}! 📚`,
        body: `Don't forget: ${parts.join(' & ')}. Open the app to check.`,
        tag: 'daily-reminder'
      });
      sent++;
    }

    return res.json({ ok: true, sent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
