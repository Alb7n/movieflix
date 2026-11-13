// Vercel serverless function: keep the TMDB credential on the server.
const ALLOWED_PATHS = [
  /^trending\/movie\/(day|week)$/,
  /^search\/movie$/,
  /^discover\/movie$/,
  /^movie\/\d+$/,
  /^genre\/movie\/list$/
];
const ALLOWED_PARAMS = new Set(["language","page","query","include_adult","with_genres","sort_by","year","primary_release_year"]);

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const token = process.env.TMDB_BEARER_TOKEN;
  if (!token) return res.status(503).json({ error: "TMDB is not configured on the server" });

  const path = String(req.query.path || "").replace(/^\/+|\/+$/g, "");
  if (!ALLOWED_PATHS.some(pattern => pattern.test(path))) {
    return res.status(400).json({ error: "Unsupported TMDB endpoint" });
  }

  const params = new URLSearchParams();
  for (const [key, raw] of Object.entries(req.query)) {
    if (key === "path" || !ALLOWED_PARAMS.has(key)) continue;
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (typeof value === "string" && value.length <= 200) params.set(key, value);
  }
  if (!params.has("language")) params.set("language", "en-US");
  if (!params.has("page")) params.set("page", "1");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const upstream = await fetch("https://api.themoviedb.org/3/" + path + "?" + params.toString(), {
      headers: { Authorization: "Bearer " + token, Accept: "application/json" },
      signal: controller.signal
    });
    const body = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return res.status(upstream.status === 401 ? 502 : upstream.status).json({
        error: upstream.status === 401 ? "TMDB rejected the server token. Check TMDB_BEARER_TOKEN." : "TMDB request failed."
      });
    }
    return res.status(200).json(body);
  } catch (error) {
    return res.status(502).json({ error: error.name === "AbortError" ? "TMDB request timed out. Please try again." : "Could not reach TMDB." });
  } finally {
    clearTimeout(timeout);
  }
}
