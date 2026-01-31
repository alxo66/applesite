import fetch from "node-fetch";

export async function getRates() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,toncoin&vs_currencies=rub"
  );
  return await res.json();
}
