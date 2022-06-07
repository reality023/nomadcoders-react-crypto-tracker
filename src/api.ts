const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
    const response = await fetch(`${BASE_URL}/coins`).then(response => 
        response.json()
    );
    return response;
}

export function fetchCoinInfo(coinId:string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => {
        return response.json();
    });
}

export function fetchCoinTickers(coinId:string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => {
        return response.json();
    });
}

export function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 6;
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response) => {
        return response.json();
    });
}