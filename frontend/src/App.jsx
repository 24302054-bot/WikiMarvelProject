import React, { useState, useEffect } from 'react';
import axios from 'axios';
// 1. Importamos tu CSS original
import './Style.css'; 

function App() {
  // 2. Estado para guardar los personajes que vienen de tu back-end
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. useEffect se ejecuta cuando el componente carga
  useEffect(() => {
    const cargarPersonajes = async () => {
      try {
        // Llamamos a TU PROPIO back-end (el que corre en puerto 4000)
        const response = await axios.get('http://localhost:4000/api/personajes');

        // Guardamos los datos recibidos en el estado
        setPersonajes(response.data);
        setLoading(false); // Terminamos de cargar
      } catch (error) {
        console.error('Error al cargar personajes:', error);
        setLoading(false);
      }
    };

    cargarPersonajes();
  }, []); // El [] vacío asegura que solo se ejecute una vez

  // 4. Este es tu HTML (ahora en formato JSX)
  return (
    <>
      {/* ----- HEADER (Tomado de tu HTML) ----- */}
      <header>
        <div className="container">
          <div className="logo">
            <h1>Wiki<span>Marvel</span></h1>
          </div>
          <nav>
            <ul>
              <li><a href="#">Personajes</a></li>
              <li><a href="Peliculas.html">Películas</a></li>
              <li><a href="Equipos.html">Equipos</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ----- SECCIÓN DE PERSONAJES ----- */}
      <div className="container">
        <section className="hero">
          <h2>Explora el Universo Marvel</h2>
          <p>Descubre la historia, poderes y datos fascinantes de tus personajes favoritos...</p>
        </section>

        <section className="characters-section">
          <h2 className="section-title">Personajes Destacados</h2>

          <div className="characters-grid">

            {/* 5. AQUÍ ESTÁ LA MAGIA (El bucle dinámico) */}
            {loading ? (
              <p style={{ color: 'white', textAlign: 'center' }}>Cargando personajes...</p>
            ) : (
              personajes.map((personaje) => (

                <div className="character-card" key={personaje.id}>
                  <div className="character-image">
                    <img 
                      // La API de Comic Vine nos da la imagen así
                      src={personaje.image.medium_url} 
                      alt={personaje.name} 
                    />
                  </div>
                  <div className="character-info">
                    <h3>{personaje.name}</h3>
                    {/* 'deck' es la descripción corta en Comic Vine */}
                    <p>
                      {personaje.deck || 'Sin descripción disponible.'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* ----- FOOTER (Tomado de tu HTML) ----- */}
      <footer>
        <div className="container">
          <p>Marvel Universe Fan Page - Todos los derechos reservados a Marvel Comics</p>
          <p>2023 - Sitio creado con fines educativos</p>
        </div>
      </footer>
    </>
  );
}

export default App;