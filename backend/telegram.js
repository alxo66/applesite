import fetch from "node-fetch";
import { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } from "./config.js";

export async function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML"
    })
  });
}
