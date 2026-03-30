const KEYS = {
  STATE: 'birgework_state_v2',
  SESSION: 'birgework_session_v1',
}

export function loadJSON(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const storageKeys = KEYS
