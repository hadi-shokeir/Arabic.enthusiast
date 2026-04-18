export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body || {};
  if (!url) return res.status(400).json({ error: 'Missing url' });

  let parsed;
  try {
    parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // YouTube — use oEmbed (no API key needed) + guaranteed thumbnail
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) {
      const videoId = ytMatch[1];
      try {
        const oUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`;
        const r = await fetch(oUrl, { signal: AbortSignal.timeout(8000) });
        if (r.ok) {
          const d = await r.json();
          return res.json({
            title: d.title || '',
            image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            description: d.author_name ? `by ${d.author_name}` : '',
            type: 'youtube',
            videoId,
            domain: 'youtube.com'
          });
        }
      } catch {}
      // Fallback: just return thumbnail without title
      return res.json({
        title: '', image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        description: '', type: 'youtube', videoId, domain: 'youtube.com'
      });
    }

    // Generic page — fetch HTML and extract OG meta tags
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(10000),
      redirect: 'follow'
    });

    if (!r.ok && r.status !== 403 && r.status !== 429) {
      // Site unreachable — return hostname as minimal result
      return res.json({ title: parsed.hostname, image: '', description: '', type: 'link', domain: parsed.hostname.replace(/^www\./, '') });
    }

    const html = await r.text();

    const getTag = (...names) => {
      for (const name of names) {
        const patterns = [
          new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']{1,500})["']`, 'i'),
          new RegExp(`<meta[^>]+content=["']([^"']{1,500})["'][^>]+(?:property|name)=["']${name}["']`, 'i'),
        ];
        for (const p of patterns) {
          const m = html.match(p);
          if (m) return m[1].replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim();
        }
      }
      return '';
    };

    const titleMatch = html.match(/<title[^>]*>([^<]{1,200})<\/title>/i);
    const rawTitle = getTag('og:title', 'twitter:title') || (titleMatch ? titleMatch[1].trim() : '') || parsed.hostname;
    const rawImage = getTag('og:image', 'twitter:image');
    const rawDesc = getTag('og:description', 'twitter:description', 'description');
    const domain = parsed.hostname.replace(/^www\./, '');

    // Make image URL absolute
    let image = rawImage;
    if (image && image.startsWith('//')) image = parsed.protocol + image;
    else if (image && image.startsWith('/')) image = `${parsed.protocol}//${parsed.host}${image}`;

    return res.json({ title: rawTitle, image, description: rawDesc, type: 'link', domain });
  } catch (err) {
    // Return minimal data rather than erroring completely
    return res.json({
      title: parsed.hostname,
      image: '',
      description: '',
      type: 'link',
      domain: parsed.hostname.replace(/^www\./, '')
    });
  }
}
