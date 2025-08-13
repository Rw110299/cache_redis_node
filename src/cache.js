const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', (err) => console.error('❌ Erro no Redis:', err));
client.connect();

async function setCache(key, value, expireSeconds = 60) {
    await client.set(key, JSON.stringify(value), { EX: expireSeconds });
}

async function getCache(key) {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
}

module.exports = { setCache, getCache };
