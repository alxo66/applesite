export async function createOrder(data) {
  await fetch("http://localhost:3000/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function getRates() {
  const res = await fetch("http://localhost:3000/api/rates");
  return await res.json();
}
