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

          <div className="flex items-center border w-80 pr-3 gap-2 bg-white dark:bg-gray-800 border-gray-500 h-[46px] rounded-[5px] overflow-hidden mx-auto">
            <input
              className="w-full h-full pl-5 outline-none placeholder-gray-500 text-sm bg-gray-100 text-gray-900 dark:text-white dark:bg-gray-200"
              placeholder="Buscar eventos..."
              type="text"
            />
            <svg
              fill="#6B7280"
              viewBox="0 0 30 30"
              height="22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M 13 3 C 7.489 3 3 7.489 3 13 C 3 18.511 7.489 23 13 23 C 15.397 23 17.597 22.149 19.322 20.736 L 25.293 26.707 A 1.0001 1.0001 0 1 0 26.707 25.293 L 20.736 19.322 C 22.149 17.597 23 15.397 23 13 C 23 7.489 18.511 3 13 3 z M 13 5 C 17.43 5 21 8.57 21 13 C 21 17.43 17.43 21 13 21 C 8.57 21 5 17.43 5 13 C 5 8.57 8.57 5 13 5 z"></path>
          </svg>
        </div>

        </div>
      </section>

      {error && (
        <p>{error}</p>
      )}
      <div className="grid grid-cols-3 gap-6 content-center justify-center mx-auto max-w-6xl px-14 mt-10">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}

export default Home;
