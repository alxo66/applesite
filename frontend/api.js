const API_URL = 'https://applestore-backend-production.up.railway.app';

export async function getDepositInfo() {
  const res = await fetch(`${API_URL}/api/deposit`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки депозита');
  }

  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${API_URL}/api/profile`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки профиля');
  }

  return res.json();
}
