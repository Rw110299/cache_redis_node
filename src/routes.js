const express = require('express');
const { setCache, getCache } = require('./cache');

const router = express.Router();

// Exemplo: busca de dados simulada
router.get('/dados', async (req, res) => {
    const cacheKey = 'meus_dados';

    // Verifica se já está no cache
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        return res.json({ fonte: 'cache', dados: cachedData });
    }

    // Simula busca no "banco"
    const dados = { id: 1, nome: "Produto X", preco: 99.9 };

    // Armazena no cache por 30 segundos
    await setCache(cacheKey, dados, 30);

    res.json({ fonte: 'api', dados });
});

module.exports = router;
