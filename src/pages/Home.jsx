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
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleSearch =({category, query}) => {
    let results = [...events];

    if(category) {
      results = results.filter(
        (Event) => event.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (query && query.trim() !== "") {
      results = results.filter (
        (event) => event.name?.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredEvents(results);
  };

  if (loading) return (
    <div className="flex flex-row gap-2 justify-center items-center h-screen">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
  )

  return (
    <main className="bg-gray-200 dark:bg-gray-900">
      <section className="w-full flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 py-24 px-6">
        <div className="max-w-md mx-auto ">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl mb-4">
            Eventos Disponibles
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 mt-3 text-center">
            Descubre los próximos eventos y consigue tus entradas fácilmente.
          </p>

          <SearchBar onSearch={handleSearch}/>

        </div>
      </section>

      {error && (
        <p>{error}</p>
      )}
      <div className="grid grid-cols-3 gap-6 content-center justify-center mx-auto max-w-6xl px-14 mt-10">
        {(filteredEvents.length >0 ? filteredEvents : events).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}

export default Home;
