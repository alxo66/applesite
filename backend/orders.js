exports.create = (req, res) => {
  const { product, price } = req.body;

  if (req.user.balance < price) {
    return res.json({ success: false, error: "NO_FUNDS" });
  }

  req.user.balance -= price;

  const order = {
    product,
    price,
    date: Date.now()
  };

  req.user.orders.push(order);
  res.json({ success: true });
};

exports.list = (req, res) => {
  res.json(req.user.orders);
};
