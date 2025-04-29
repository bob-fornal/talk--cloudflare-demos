const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
};

export default {
  async fetch(request, env, ctx) {
    const X_API_KEY = env.AUTH_KEY;

    if (request.method.toUpperCase() === 'OPTIONS') {
      return new Response('Options', { headers });
    }

    const authHeader = request.headers.get('x-api-key');
    if (authHeader !== X_API_KEY) {
      return new Response("Unauthorized", { status: 401 });
    }

    const urlObject = new URL(request.url);
    const pathname = urlObject.pathname.toLowerCase();
    const params = urlObject.searchParams;

    switch (request.method.toUpperCase()) {
      case 'GET':
        return await handleGetRequest(env.DB, pathname, params);
      case 'POST':
        return await handlePostRequest(env.DB, request, ctx, pathname, this.trackEvent.bind(this));
      default:
        return new Response('Api call not found', {
          status: 404,
        });
    }
  },

  async trackEvent(database, username, email, city, state, zipcode, ip) {
    const datetimestamp = (new Date()).toUTCString();

    try {
      await database
        .prepare('INSERT INTO "user-data" (username, datetimestamp, email, city, state, zipcode, ip) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)')
        .bind(username, datetimestamp, email, city, state, zipcode, ip)
        .run();
    } catch (error) {
      return new Response(error, {
        headers: headers,
        status: 500
      });
    }
  }
};

async function handleGetRequest(database, path, params) {
  switch (true) {
    case path === '/api/get-users-registered-today':
      const today = new Date();
      const data = await database
        .prepare('SELECT * FROM "user-data"')
        .run();
      const result = data.results.filter((item) => {
        const date = new Date(item.datetimestamp);
        return today.setHours(0,0,0,0) === date.setHours(0,0,0,0);
      });
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: headers,
        statusText: 'Success',
      });
    default:
      return new Response('Invalid Request', {
        status: 400,
      });
  }
}

async function handlePostRequest(database, request, ctx, path, trackEvent) {
  const { value: bodyIntArray } = await request.body.getReader().read();
  const bodyString = new TextDecoder().decode(bodyIntArray);
  const body = JSON.parse(bodyString);
  
  switch (true) {
    case path === '/api/post-user-data':
      const city = request.cf.city || 'not captured';
      const state = request.cf.region || request.cf.regionCode || 'not captured';
      const zipcode = request.cf.postalCode || 'not captured';
      const ip = request.headers.get('cf-connecting-ip') || 'not captured';
    
      if (!!body.username && !!body.email) {
        const username = body.username;
        const email = body.email;
    
        // await trackEvent(database, username, email, city, state, zipcode, ip);
        ctx.waitUntil(trackEvent(database, username, email, city, state, zipcode, ip));
        return new Response('Success', {
          headers: headers,
          status: 200,
        });
      } else {
        return new Response('Invalid Request - Inner', {
          status: 400,
        });  
      }
    default:
      return new Response('Invalid Request - Outer', {
        status: 400,
      });
  }
}