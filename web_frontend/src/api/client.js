//
// Thin API client for HTTP requests with optional base URL and safe JSON parsing
//

/**
 * Internal helper to build a full URL with base and query params.
 * @param {string} path - API path like '/recipes'
 * @param {object} [params] - Query params object
 * @returns {string} full URL
 */
function buildUrl(path, params = {}) {
  const base = process.env.REACT_APP_API_BASE || '';
  const url = new URL(path, base || window.location.origin);
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).length > 0) {
      url.searchParams.set(k, String(v));
    }
  });
  return url.toString();
}

/**
 * Internal helper to parse JSON safely
 * @param {Response} res
 * @returns {Promise<any>}
 */
async function parseJsonSafe(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text; // fallback raw payload
  }
}

/**
 * Internal helper to perform fetch with defaults and error normalization
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<{ok:boolean,status:number,headers:Headers,data:any}>}
 */
async function request(url, options) {
  try {
    const res = await fetch(url, {
      credentials: 'same-origin',
      ...options,
      headers: {
        'Accept': 'application/json',
        ...(options && options.headers),
      },
    });

    const data = await parseJsonSafe(res);

    if (!res.ok) {
      const err = new Error(`Request failed with status ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return { ok: true, status: res.status, headers: res.headers, data };
  } catch (error) {
    // Normalize network or parsing errors
    const err = error instanceof Error ? error : new Error('Network error');
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[api/client] request error:', err);
    }
    throw err;
  }
}

// PUBLIC_INTERFACE
export async function get(path, opts = {}) {
  /** Fetch JSON via GET with optional query params in opts.params */
  const url = buildUrl(path, opts.params || {});
  return request(url, { method: 'GET', ...opts }).then(r => r.data);
}

// PUBLIC_INTERFACE
export async function post(path, body, opts = {}) {
  /** Post JSON via POST; body will be JSON.stringified unless FormData provided */
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const headers = isFormData
    ? (opts.headers || {})
    : { 'Content-Type': 'application/json', ...(opts.headers || {}) };

  const payload = isFormData ? body : JSON.stringify(body ?? {});
  const url = buildUrl(path, opts.params || {});
  return request(url, { method: 'POST', headers, body: payload, ...opts }).then(r => r.data);
}
