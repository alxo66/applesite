const API_BASE = "https://applestore-backend-production.up.railway.app/api";

function getUserId() {
  let id = localStorage.getItem("userId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("userId", id);
  }
  return id;
}

async function api(path, options = {}) {
  const userId = getUserId();

  const res = await fetch(API_BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
      ...(options.headers || {})
    }
  });

  return res.json();
}
