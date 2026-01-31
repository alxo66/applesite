exports.deposit = (req, res) => {
  const { currency, amount, txid } = req.body;
  if (!currency || !amount || !txid) {
    return res.json({ success: false });
  }

  const deposit = {
    currency,
    amount: Number(amount),
    txid,
    status: "pending",
    date: Date.now()
  };

  req.user.deposits.push(deposit);

  // ❗️ПОКА вручную подтверждаем
  req.user.balance += deposit.amount;
  deposit.status = "done";

  res.json({ success: true });
};

exports.balance = (req, res) => {
  res.json({ balance: req.user.balance });
};

exports.deposits = (req, res) => {
  res.json(req.user.deposits);
};
