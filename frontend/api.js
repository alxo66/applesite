const API_URL = 'https://applestore-backend-production.up.railway.app';

async function getDepositInfo() {
  const res = await fetch(`${API_URL}/api/deposit`);
  if (!res.ok) throw new Error('Ошибка загрузки депозита');
  return res.json();
}

async function getProfile() {
  const res = await fetch(`${API_URL}/api/profile`);
  if (!res.ok) throw new Error('Ошибка загрузки профиля');
  return res.json();
}

// 👇 ДЕЛАЕМ ДОСТУПНЫМ ГЛОБАЛЬНО
window.API = {
  getDepositInfo,
  getProfile
};
