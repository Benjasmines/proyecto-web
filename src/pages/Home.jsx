import { useEffect, useState } from "react";
import { getEvents } from "../api/api";
import { Link } from "react-router-dom";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        // Validar que realmente llega un array
        if (!Array.isArray(data) || data.length === 0) {
          console.warn("No se recibieron eventos del backend, usando datos mock.");
          setEvents([
            {
              id: "1",
              name: "Festival de Música Andina",
              category: "Música",
              date: "2025-12-15T20:00:00Z",
              image:
                "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800",
              location: "Teatro Municipal de Santiago",
            },
            {
              id: "2",
              name: "Conferencia de Tecnología 2025",
              category: "Educación",
              date: "2025-11-25T09:00:00Z",
              image:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
              location: "Centro de Eventos Espacio Riesco",
            },
          ]);
        } else {
          setEvents(data);
        }
      } catch (err) {
        console.error("Error al obtener eventos:", err);
        setError("No se pudo conectar al servidor. Mostrando datos de ejemplo.");
        setEvents([
          {
            id: "1",
            name: "Festival de Música Andina",
            category: "Música",
            date: "2025-12-15T20:00:00Z",
            image:
              "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800",
            location: "Teatro Municipal de Santiago",
          },
          {
            id: "2",
            name: "Conferencia de Tecnología 2025",
            category: "Educación",
            date: "2025-11-25T09:00:00Z",
            image:
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
            location: "Centro de Eventos Espacio Riesco",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <h2 style={{ color: "#fff" }}>Cargando eventos...</h2>;

  return (
    <main style={{ padding: "1rem", color: "#fff" }}>
      <h1>🎟️ Eventos Disponibles</h1>
      {error && (
        <p style={{ color: "orange", fontWeight: "bold" }}>{error}</p>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              background: "#2a2a2a",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={event.image}
              alt={event.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h2>{event.name}</h2>
            <p>📍 {event.location}</p>
            <p>🗓️ {new Date(event.date).toLocaleString()}</p>
            <Link
              to={`/event/${event.id}`}
              style={{
                display: "inline-block",
                marginTop: "1rem",
                color: "#fff",
                background: "#646cff",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Ver Detalle
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
