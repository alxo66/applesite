const API = "https://applestore-backend-production.up.railway.app";

/**
 * Получение или генерация уникального ID пользователя для работы с бэкендом.
 * Сохраняется в localStorage, чтобы корзина и баланс не пропадали.
 */
function getUserId() {
    let userId = localStorage.getItem("applestore_user_id");
    if (!userId) {
        userId = "user_" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("applestore_user_id", userId);
    }
    return userId;
}

/**
 * Базовые заголовки для всех запросов к API
 */
const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-user-id": getUserId()
});

/* ===== PRODUCTS ===== */

/**
 * Теперь мы получаем товары с сервера, а не из статического массива.
 */
export async function getProducts() {
    try {
        const r = await fetch(`${API}/api/products`);
        if (!r.ok) throw new Error("Ошибка загрузки товаров");
        return await r.json();
    } catch (err) {
        console.error(err);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}

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

/* ===== USER CABINET & PAYMENTS ===== */

/**
 * Собирает данные для личного кабинета из разных эндпоинтов бэкенда
 */
export async function getCabinet() {
    try {
        const [balanceRes, ordersRes, depositsRes] = await Promise.all([
            fetch(`${API}/api/balance`, { headers: getHeaders() }),
            fetch(`${API}/api/orders`, { headers: getHeaders() }),
            fetch(`${API}/api/deposits`, { headers: getHeaders() })
        ]);

        return {
            balance: (await balanceRes.json()).balance || 0,
            orders: await ordersRes.json(),
            deposits: await depositsRes.json()
        };
    } catch (err) {
        console.error("Ошибка получения данных кабинета:", err);
        return { balance: 0, orders: [], deposits: [] };
    }
}

/**
 * Создание запроса на пополнение баланса (депозит)
 */
export async function createDeposit(amount, currency = "USDT") {
    const r = await fetch(`${API}/api/deposit`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ amount, currency })
    });
    return r.json();
}

/* ===== ORDERS ===== */

export async function createOrder(product) {
    const r = await fetch(`${API}/api/order`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            productId: product.id,
            price: product.price,
            title: product.title
        })
    });
    return r.json();
}
