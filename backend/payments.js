import fetch from "node-fetch";
import { WALLETS } from "./config.js";
import { sendTelegram } from "./telegram.js";

/**
 * Проверка BTC через Blockstream
 */
export async function checkBTC(expectedAmount) {
  const res = await fetch(
    `https://blockstream.info/api/address/${WALLETS.BTC}`
  );
  const data = await res.json();

  const received =
    data.chain_stats.funded_txo_sum / 100000000;

  if (received >= expectedAmount) {
    await sendTelegram(`✅ BTC оплата получена\nСумма: ${received} BTC`);
    return true;
  }
  return false;
}

/**
 * Проверка ETH / USDT (ERC20) через Etherscan
 */
export async function checkETH(expectedAmount) {
  const res = await fetch(
    `https://api.etherscan.io/api?module=account&action=balance&address=${WALLETS.ETH}&tag=latest`
  );
  const data = await res.json();

  const received = Number(data.result) / 1e18;

  if (received >= expectedAmount) {
    await sendTelegram(`✅ ETH оплата получена\nСумма: ${received} ETH`);
    return true;
  }
  return false;
}

/**
 * TON (упрощённо, без API-ключей)
 */
export async function checkTON(expectedAmount) {
  const res = await fetch(
    `https://tonapi.io/v2/accounts/${WALLETS.TON}`
  );
  const data = await res.json();

  const received = data.balance / 1e9;

  if (received >= expectedAmount) {
    await sendTelegram(`✅ TON оплата получена\nСумма: ${received} TON`);
    return true;
  }
  return false;
}
