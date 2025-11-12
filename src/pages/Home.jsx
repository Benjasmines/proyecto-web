import { useEffect, useState } from "react";
import { getEvents } from "../api/api";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        console.log("Respuesta del backend:", data);

        const list = Array.isArray(data)
          ? data
          : data?.data || data?.events || [];

        if (!Array.isArray(list) || list.length === 0) {
          console.warn("No se recibieron eventos, usando mock.");
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
          setEvents(list);
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

  if (loading) return (
    <div class="flex flex-row gap-2 justify-center items-center h-screen">
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
  )

  return (
    <main style={{ padding: "1rem", color: "#000000ff" }}>
      <h1>Eventos Disponibles</h1>
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
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}

export default Home;
