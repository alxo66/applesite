const API_URL = "https://<applestore-backend-production.up.railway.app>";

export async function getDepositData() {
  const res = await fetch(`${API_URL}/api/deposit`);
  return await res.json();
}
