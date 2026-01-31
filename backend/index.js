import express from "express";
import cors from "cors";

import { getRates } from "./rates.js";
import { createOrder, markPaid, getOrders } from "./orders.js";
import { generateQR } from "./qr.js";
import { WALLETS } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Курсы валют
 */
app.get("/api/rates", async (_, res) => {
  res.json(await getRates());
});

/**
 * Создать заказ
 */
app.post("/api/order", async (req, res) => {
  const order = createOrder(req.body);
  res.json(order);
});

/**
 * Получить QR для оплаты
 */
app.get("/api/qr/:currency", async (req, res) => {
  const wallet = WALLETS[req.params.currency];
  if (!wallet) return res.status(404).end();

  const qr = await generateQR(wallet);
  res.json({ wallet, qr });
});

/**
 * Заказы (для кабинета)
 */
app.get("/api/orders", (_, res) => {
  res.json(getOrders());
});

app.listen(3000, () =>
  console.log("🚀 Backend: http://localhost:3000")
);
