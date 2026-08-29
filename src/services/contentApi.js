// Website content always comes from the shared ProJenius admin backend.
// Keep the explicit localhost fallback so the site does not accidentally
// request /api/* from the Vite server when the env file is missing/stale.
const API_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BACKEND_API_URL ||
  'http://localhost:5000'
).replace(/\/$/, '');

async function request(path) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });

  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error('Invalid response from ProJenius backend.');
  }

  if (!response.ok) {
    throw new Error(
      data.error || data.message || `Request failed (${response.status})`
    );
  }

  return data;
}

const unwrap = (data, keys) =>
  Array.isArray(data)
    ? data
    : keys.map((key) => data?.[key]).find(Array.isArray) || [];

export const getCourses = async (query = '') =>
  unwrap(await request(`/api/courses${query}`), ['items', 'courses']);

export const getCourse = async (id) =>
  request(`/api/courses/${encodeURIComponent(id)}`);

export const getNews = async (query = '') =>
  unwrap(await request(`/api/blogs${query}`), ['items', 'blogs', 'contents']);

export const getNewsItem = async (id) =>
  request(`/api/blogs/${encodeURIComponent(id)}`);

export const mediaUrl = (value) => {
  if (!value) return '';
  if (/^(data:|blob:|https?:\/\/)/i.test(value)) return value;
  if (value.startsWith('/')) return `${API_URL}${value}`;
  return value;
};
