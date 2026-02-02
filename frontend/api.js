const API = "https://applestore-backend-production.up.railway.app";

function getUserId() {
    let userId = localStorage.getItem("applestore_user_id");
    if (!userId) {
        // substring надежнее для генерации ID
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
        const r = await fetch(`${API}/api/products`);
        if (!r.ok) throw new Error("Ошибка загрузки товаров");
        return await r.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

/* ===== CABINET ===== */
export async function getCabinet() {
    try {
        // Добавляем обработку ошибок для каждого запроса отдельно, чтобы один упавший не ломал всё
        const fetchWithAuth = (url) => fetch(`${API}${url}`, { headers: getHeaders() }).then(res => res.json());

        const [balanceData, orders, deposits] = await Promise.all([
            fetchWithAuth("/api/balance"),
            fetchWithAuth("/api/orders"),
            fetchWithAuth("/api/deposits")
        ]);

        return {
            balance: balanceData.balance || 0,
            orders: orders || [],
            deposits: deposits || []
        };
    } catch (err) {
        console.error("Ошибка получения данных кабинета:", err);
        return { balance: 0, orders: [], deposits: [] };
    }
}

// ... остальное (createDeposit, createOrder) оставляем как есть, они написаны верно
