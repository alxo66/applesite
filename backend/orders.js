import { sendTelegram } from "./telegram.js";

const orders = [];

export function createOrder(order) {
  const newOrder = {
    id: Date.now(),
    product: order.product,
    amount: order.amount,
    currency: order.currency,
    status: "pending"
  };

  orders.push(newOrder);

  sendTelegram(
    `🛒 Новый заказ\n` +
    `Товар: ${order.product}\n` +
    `Сумма: ${order.amount}\n` +
    `Валюта: ${order.currency}\n` +
    `Статус: Ожидает оплату`
  );

  return newOrder;
}

export function markPaid(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return null;

  order.status = "paid";

  sendTelegram(
    `✅ Заказ #${order.id} оплачен\n` +
    `Товар: ${order.product}`
  );

  return order;
}

export function getOrders() {
  return orders;
}
