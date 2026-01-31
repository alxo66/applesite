import fetch from "node-fetch";
import { WALLETS } from "./config.js";
import { sendTelegram } from "./telegram.js";

export async function checkBTC(amount) {
  const res = await fetch(
    `https://blockstream.info/api/address/${WALLETS.BTC}`
  );
  const data = await res.json();

  // пример логики
  if (data.chain_stats.funded_txo_sum > amount) {
    await sendTelegram("✅ BTC платеж получен");
    return true;
  }
  return false;
}
