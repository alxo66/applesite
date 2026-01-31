async function convert() {
    const amount = document.getElementById('amount').value
    const currency = document.getElementById('currency').value

    const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,toncoin&vs_currencies=rub"
    )
    const data = await res.json()

    const rates = {
        btc: data.bitcoin.rub,
        eth: data.ethereum.rub,
        usdt: data.tether.rub,
        ton: data.toncoin.rub,
        rub: 1
    }

    let result = amount * rates[currency]
    document.getElementById('result').innerText =
        `≈ ${result.toLocaleString()} ₽`
}
