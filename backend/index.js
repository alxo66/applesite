import express from "express";
import cors from "cors";
import { getRates } from "./rates.js";
import { createOrder } from "./orders.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/rates", async (_, res) => {
  res.json(await getRates());
});

app.post("/api/order", async (req, res) => {
  await createOrder(req.body);
  res.json({ ok: true });
});

app.listen(3000, () =>
  console.log("Backend запущен http://localhost:3000")
);
