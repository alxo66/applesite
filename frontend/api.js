const API_URL = "https://applestore-backend-production.up.railway.app";

async function loadDeposit() {
  const container = document.getElementById("deposit");

  try {
    const res = await fetch(`${API_URL}/api/deposit`);
    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    container.innerHTML = "";

    for (const coin in data) {
      const item = data[coin];

      const div = document.createElement("div");
      div.style.marginBottom = "40px";

      div.innerHTML = `
        <h3>${coin}</h3>
        <p>${item.address}</p>
        <img src="${item.qr}" width="200" />
        <p>Курс: ${item.rateRub} ₽</p>
      `;

      container.appendChild(div);
    }

  } catch (e) {
    console.error(e);
    container.innerHTML =
      "<p style='color:red'>Ошибка загрузки данных. Проверь backend.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadDeposit);
