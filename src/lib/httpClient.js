const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

let accessToken = localStorage.getItem('bw_access_token') || ''
let refreshToken = localStorage.getItem('bw_refresh_token') || ''

function setTokens(access, refresh) {
  accessToken = access || ''
  refreshToken = refresh || refreshToken
  if (access) localStorage.setItem('bw_access_token', access)
  if (refresh) localStorage.setItem('bw_refresh_token', refresh)
}

export function clearTokens() {
  accessToken = ''
  refreshToken = ''
  localStorage.removeItem('bw_access_token')
  localStorage.removeItem('bw_refresh_token')
}

async function request(path, options = {}, retry = true) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (res.status === 401 && refreshToken && retry) {
    const rr = await fetch(`${API_URL}/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken }) })
    if (rr.ok) {
      const data = await rr.json()
      setTokens(data.accessToken)
      return request(path, options, false)
    }
    clearTokens()
  }

  if (!res.ok) {
    const e = await res.json().catch(() => ({ message: 'Network error' }))
    throw new Error(e.message || 'Request failed')
  }
  return res.json()
}

export const http = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  setTokens,
}
