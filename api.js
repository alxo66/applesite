const API = "https://applestore-backend.onrender.com"; 

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

        const [balanceData, orders] = await Promise.all([
            fetchWithAuth("/api/balance"),
            fetchWithAuth("/api/orders")
        ]);

        return {
            balance: balanceData.balance || 0,
            orders: Array.isArray(orders) ? orders : [],
            deposits: [] 
        };
    } catch (err) {
        return { balance: 0, orders: [], deposits: [] };
    }
}

/* ===== CREATE ORDER ===== */
export async function createOrder(product) {
    // В объекте product теперь лежат и выбранные опции (color, storage)
    // которые мы подготовили в index.html
    const res = await fetch(`${API}/api/order`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            productId: product.id,
            price: product.price,
            title: product.title,
            // Добавляем инфо о выборе в заказ
            selectedColor: product.selectedOptions?.color || 'Стандартный',
            selectedStorage: product.selectedOptions?.storage || 'Базовый'
        })
    });
    return await res.json();
}
