const API_URL = "https://applestore-backend-production.up.railway.app";

async function loadDeposit() {
  const container = document.getElementById("deposit");

  try {
    const res = await fetch(API_URL + "/api/deposit");
    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    container.innerHTML = "";

    Object.keys(data).forEach((coin) => {
      const item = data[coin];

      const block = document.createElement("div");
      block.style.marginBottom = "40px";

      block.innerHTML = `
        <h3>${coin}</h3>
        <p>${item.address}</p>
        <img src="${item.qr}" width="200" />
        <p>Курс: ${item.rateRub} ₽</p>
      `;

      container.appendChild(block);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML =
      "<p style='color:red'>Ошибка загрузки данных. Проверь backend.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadDeposit);
