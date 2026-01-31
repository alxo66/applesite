import { sendTelegram } from "./telegram.js";

export async function createOrder(order) {
  await sendTelegram(
    `🛒 <b>Новый заказ</b>\n` +
    `Товар: ${order.product}\n` +
    `Сумма: ${order.amount} ₽\n` +
    `Оплата: ${order.currency}`
  );
}
