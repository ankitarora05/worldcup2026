// src/index.js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    
    if (!targetUrl) {
      return new Response('Missing ?url= parameter', { status: 400 });
    }
    
    if (!targetUrl.includes('worldcup26.ir')) {
      return new Response('Domain not allowed', { status: 403 });
    }
    
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Cloudflare-Worker',
        'Origin': 'https://worldcup26.ir'
      }
    });
    
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', '*');
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: newHeaders });
    }
    
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }
};