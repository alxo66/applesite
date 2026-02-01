const API = "https://applestore-backend-production.up.railway.app";

export const PRODUCTS = [
  {
    id: "iphone16",
    title: "iPhone 16",
    price: 79990,
    description: "Новый iPhone 16 с OLED-дисплеем и A18",
    image: "/images/iphone16.png"
  },
  {
    id: "iphone16pro",
    title: "iPhone 16 Pro",
    price: 99990,
    description: "Титановый корпус, Pro-камера",
    image: "/images/iphone16pro.png"
  }
];

/* ===== CART ===== */
export function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Товар добавлен в корзину");
}

export function clearCart() {
  localStorage.removeItem("cart");
}

/* ===== API ===== */
export async function getCabinet() {
  const r = await fetch(`${API}/api/cabinet`);
  return r.json();
}

export async function createOrder(product) {
  const r = await fetch(`${API}/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  return r.json();
}
