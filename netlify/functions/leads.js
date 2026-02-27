const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, x-admin-token',
  'content-type': 'application/json; charset=utf-8'
};

const leadsCache = [];
const MAX_LEADS = 300;

function isAuthorized(event) {
  const requiredToken = process.env.ADMIN_TOKEN;
  if (!requiredToken) return true;

  const headerToken = event.headers['x-admin-token'] || event.headers['X-Admin-Token'];
  const queryToken = event.queryStringParameters?.token;
  return requiredToken === headerToken || requiredToken === queryToken;
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod === 'GET') {
    if (!isAuthorized(event)) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ ok: false, message: 'Unauthorized' })
      };
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true, leads: leadsCache })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, message: 'Method not allowed' })
    };
  }

  let payload = {};
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch (error) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: false, message: 'Invalid JSON body' })
    };
  }

  const lead = {
    section: String(payload.section || 'unknown'),
    label: String(payload.label || 'unknown'),
    linkUrl: String(payload.linkUrl || ''),
    grams: Number(payload.grams || 0),
    karat: Number(payload.karat || 0),
    estimate: Number(payload.estimate || 0),
    userAgent: event.headers['user-agent'] || '',
    createdAt: new Date().toISOString()
  };

  console.log('[LEAD_CAPTURED]', JSON.stringify(lead));
  leadsCache.unshift(lead);
  if (leadsCache.length > MAX_LEADS) leadsCache.length = MAX_LEADS;

  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(lead)
      });
    } catch (error) {
      console.error('Webhook forwarding failed:', error);
    }
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ ok: true })
  };
};
