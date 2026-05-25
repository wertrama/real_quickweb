export function getStoredValue(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function setStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Some mobile/private browsers block storage. The UI should still work.
  }
}
