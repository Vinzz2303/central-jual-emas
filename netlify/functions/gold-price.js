const OUNCE_TO_GRAM = 31.1034768;
const FALLBACK_PRICE = 1150000;
const CACHE_TTL_MS = 120000;
const REQUEST_TIMEOUT_MS = 7000;

let cachedResponse = null;
let cachedAt = 0;

const toPositiveNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const fetchJson = async (url, timeoutMs = REQUEST_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

const getLiveWorldGoldPrice = async () => {
  const [goldData, fxData] = await Promise.all([
    fetchJson('https://api.gold-api.com/price/XAU'),
    fetchJson('https://open.er-api.com/v6/latest/USD')
  ]);

  const xauUsdPerOunce = toPositiveNumber(goldData?.price);
  const usdIdrRate = toPositiveNumber(fxData?.rates?.IDR);

  if (!xauUsdPerOunce || !usdIdrRate) {
    throw new Error('Invalid payload from upstream price feeds');
  }

  const pricePerGram = Math.round((xauUsdPerOunce * usdIdrRate) / OUNCE_TO_GRAM);

  return {
    source: 'gold-api-xau + er-api-usd-idr',
    currency: 'IDR',
    unit: 'gram',
    pricePerGram,
    updatedAt: new Date().toISOString(),
    market: {
      xauUsdPerOunce,
      usdIdrRate
    }
  };
};

export const handler = async () => {
  const now = Date.now();
  if (cachedResponse && now - cachedAt < CACHE_TTL_MS) {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=60'
      },
      body: JSON.stringify(cachedResponse)
    };
  }

  try {
    const liveData = await getLiveWorldGoldPrice();
    cachedResponse = liveData;
    cachedAt = now;

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=60'
      },
      body: JSON.stringify(liveData)
    };
  } catch (error) {
    const envFallback = toPositiveNumber(process.env.GOLD_PRICE_PER_GRAM);
    const pricePerGram = envFallback || FALLBACK_PRICE;

    const fallback = {
      source: process.env.GOLD_PRICE_SOURCE || 'manual-fallback',
      currency: 'IDR',
      unit: 'gram',
      pricePerGram,
      updatedAt: new Date().toISOString(),
      fallback: true
    };

    cachedResponse = fallback;
    cachedAt = now;

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=60'
      },
      body: JSON.stringify(fallback)
    };
  }
};
