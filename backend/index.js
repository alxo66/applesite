const products = require("./products");
app.get("/api/products", products.list);

const express = require("express");
const cors = require("cors");

const payments = require("./payments");
const orders = require("./orders");

const app = express();
app.use(cors());
app.use(express.json());

const users = {}; 
// users[userId] = { balance: 0, deposits: [], orders: [] }

app.use((req, res, next) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(401).json({ error: "NO_USER" });

  if (!users[userId]) {
    users[userId] = {
      balance: 0,
      deposits: [],
      orders: []
    };
  }

  req.user = users[userId];
  req.userId = userId;
  next();
});

app.post("/api/deposit", payments.deposit);
app.get("/api/balance", payments.balance);
app.get("/api/deposits", payments.deposits);

app.post("/api/order", orders.create);
app.get("/api/orders", orders.list);

app.listen(process.env.PORT || 3000, () =>
  console.log("Backend running")
);
