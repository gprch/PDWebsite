// Netlify Function: penyimpanan data Work Tracker (Netlify Blobs).
// Endpoint: /api/tracker
//   GET                      -> { items: [...] }
//   POST { action: "upsert", item }   -> simpan / update satu pekerjaan
//   POST { action: "delete", id }     -> hapus satu pekerjaan
//   POST { action: "replace", items } -> timpa semua data (dipakai untuk import backup)
// Semua request wajib membawa header "x-tracker-key" = env TRACKER_PASSWORD.
import { getStore } from '@netlify/blobs';

const KEY = 'items';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });

export default async (req) => {
  const password = process.env.TRACKER_PASSWORD;
  if (!password) {
    return json({ error: 'TRACKER_PASSWORD belum di-set di Netlify (Site configuration → Environment variables).' }, 500);
  }
  if (req.headers.get('x-tracker-key') !== password) {
    return json({ error: 'Password salah.' }, 401);
  }

  const store = getStore({ name: 'work-tracker', consistency: 'strong' });
  const load = async () => (await store.get(KEY, { type: 'json' })) || [];

  if (req.method === 'GET') {
    return json({ items: await load() });
  }

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Body harus JSON.' }, 400);
  }

  let items = await load();

  if (body.action === 'upsert' && body.item && body.item.id) {
    const i = items.findIndex((x) => x.id === body.item.id);
    if (i >= 0) items[i] = body.item;
    else items.push(body.item);
  } else if (body.action === 'delete' && body.id) {
    items = items.filter((x) => x.id !== body.id);
  } else if (body.action === 'replace' && Array.isArray(body.items)) {
    items = body.items;
  } else {
    return json({ error: 'Action tidak dikenal.' }, 400);
  }

  await store.setJSON(KEY, items);
  return json({ items });
};

export const config = { path: '/api/tracker' };
