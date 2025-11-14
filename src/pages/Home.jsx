import { useEffect, useState } from "react";
import { getEvents } from "../api/api";
import EventCard from "../components/EventCard";
import SearchBar from "../components/searchBar";

function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
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

          const mock = [
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
          ];

          setEvents(mock);
          setFilteredEvents(mock);
        } else {
          setEvents(list);
          setFilteredEvents(list);
        }
      } catch (err) {
        console.error("Error al obtener eventos:", err);
        setError("No se pudo conectar al servidor. Mostrando datos de ejemplo.");

        const fallback = [
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
        ];

        setEvents(fallback);
        setFilteredEvents(fallback);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Filtrado
  const handleSearch = ({ category, query }) => {
    let results = [...events];

    // Filtrar por categoria
    if (category && category.toLowerCase() !== "todas") {
      results = results.filter(
        (e) =>
          e &&
          e.category &&
          e.category.trim().toLowerCase() === category.toLowerCase()
      );
    }

    // Filtrar por texto
    if (query && query.trim() !== "") {
      results = results.filter((event) =>
        event.name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredEvents(results);
  };

  if (loading)
    return (
      <div className="flex flex-row gap-2 justify-center items-center h-screen">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );

  return (
    <main className="bg-gray-50 dark:bg-gray-900 w-full">
      <section className="w-full flex flex-col items-center justify-center text-center
        bg-[url('https://images.pexels.com/photos/18160511/pexels-photo-18160511.jpeg')] bg-cover bg-center 
        dark:bg-gray-800 h-80 py-24 px-6">

        <div className="max-w-xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl font-bold tracking-tight text-white text-shadow-lg dark:text-white sm:text-4xl mb-4">
            Eventos Disponibles
          </h1>

          <p className="text-white text-xl mb-8 mt-3 text-shadow-lg text-center max-w-lg">
            Descubre los próximos eventos y consigue tus entradas fácilmente.
          </p>

        </div>

        <SearchBar onSearch={handleSearch} />
      </section>

      {error && <p className="text-center text-red-600">{error}</p>}

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 mt-10">
          No se encontraron eventos para esta búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl px-6 mt-10">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
