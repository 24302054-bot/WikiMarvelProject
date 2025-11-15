// 1. Cargar las herramientas
require('dotenv').config(); // Carga las variables del .env
const express = require('express');
const axios = require('axios');
// const md5 = require('md5'); // Ya no necesitamos MD5
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

// 3. Definir la ruta de API (la dejamos con el mismo nombre)
app.get('/api/personajes', async (req, res) => {
  try {
    console.log("Recibida petición a /api/personajes");

    // Obtenemos la clave de API de Comic Vine desde .env
    const apiKey = process.env.COMICVINE_API_KEY;

    // Construimos la URL de la API de Comic Vine
    // Les pedimos que nos den los datos en formato JSON
    // y que nos traiga 10 personajes (limit=10)
    const url = `https://www.comicvine.com/api/characters/?api_key=${apiKey}&format=json&limit=10`;

    console.log("Llamando a la API de Comic Vine...");

    // 4. Llamar a la API de Comic Vine usando Axios
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mi-Proyecto-Wiki (proyecto escolar)'
      }
    });

    console.log("Éxito! Enviando datos al front-end.");

    // 5. Enviar los resultados (los personajes están en 'results')
    res.json(response.data.results);

  } catch (error) {
    console.error("Error al contactar la API de Comic Vine:", error.message);
    res.status(500).json({ message: 'Error al contactar la API de Comic Vine' });
  }
});

// 6. Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de Back-end corriendo en http://localhost:${port}`);
});