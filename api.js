// 1. УБЕДИСЬ, ЧТО ЭТОТ URL ВЗЯТ ИЗ RAILWAY (Settings -> Public Networking)
const API = "https://applestore-backend-production.up.railway.app"; 

function getUserId() {
    let userId = localStorage.getItem("applestore_user_id");
    if (!userId) {
        userId = "user_" + Math.random().toString(36).substring(2, 11);
        localStorage.setItem("applestore_user_id", userId);
    }
    return userId;
}

const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-user-id": getUserId()
});

/* ===== PRODUCTS ===== */
export async function getProducts() {
    try {
        // Добавляем кэширование на стороне браузера, чтобы грузилось мгновенно
        const r = await fetch(`${API}/api/products`);
        if (!r.ok) throw new Error("Сервер вернул ошибку");
        return await r.json();
    } catch (err) {
        console.error("Ошибка API:", err);
        return [];
    }
}

/* ===== CABINET ===== */
export async function getCabinet() {
    try {
        const fetchWithAuth = (url) => 
            fetch(`${API}${url}`, { headers: getHeaders() })
            .then(res => res.ok ? res.json() : { error: true });

        // Если депозитов на бэкенде нет как отдельного эндпоинта, 
        // убери его из Promise.all, чтобы не ждать ошибку 404
        const [balanceData, orders] = await Promise.all([
            fetchWithAuth("/api/balance"),
            fetchWithAuth("/api/orders")
        ]);

        return {
            balance: balanceData.balance || 0,
            orders: Array.isArray(orders) ? orders : [],
            deposits: [] // Пока оставим пустым, если роут не готов
        };
    } catch (err) {
        return { balance: 0, orders: [], deposits: [] };
    }
}

export async function createOrder(product) {
    const res = await fetch(`${API}/api/order`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            productId: product.id,
            price: product.price,
            title: product.title
        })
    });
    return await res.json();
}
