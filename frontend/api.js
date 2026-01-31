const API_BASE = "https://applestore-backend-production.up.railway.app/api";

async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(API_BASE + path, {
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    });

    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }

    return await res.json();
  } catch (err) {
    console.error("API FETCH ERROR:", err);
    throw err;
  }
}
