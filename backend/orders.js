const crypto = require("crypto");

const products = require("./products");

exports.create = (req, res) => {
  const { productId } = req.body;
  const product = products.getById(productId);

  if (!product) {
    return res.json({ success: false, error: "NOT_FOUND" });
  }

  if (req.user.balance < product.price) {
    return res.json({ success: false, error: "NO_FUNDS" });
  }

  req.user.balance -= product.price;

  const order = {
    id: crypto.randomUUID(),
    productId: product.id,
    name: product.name,
    price: product.price,
    date: Date.now(),
    status: "paid"
  };

  req.user.orders.push(order);
  res.json({ success: true, order });
};

exports.list = (req, res) => {
  res.json(req.user.orders);
};
