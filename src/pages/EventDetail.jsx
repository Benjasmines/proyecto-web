import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../api/api";
import { Link } from "react-router-dom";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await getEvents();

        const list = Array.isArray(response)
          ? response
          : response?.data || [];

        console.log("Eventos :", list);

        const found = list.find((ev) => {
          const possibleIds = [
            ev._id,
            ev._id,
            ev._id?.$oid,
            ev._id?.toString?.(),
            ev.event_id,
            ev.uuid,
          ];
          return possibleIds.map(String).includes(String(id));
        });

        if (found) {
          setEvent(found);
        } else {
          throw new Error("Evento no encontrado");
        }
      } catch (err) {
        console.error("Error al cargar evento:", err);
        setError("No se pudo cargar el evento.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) return (
    <div class="flex flex-row gap-2 justify-center items-center h-screen">
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
  )

  if (error)
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        role="alert"
        className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 px-4 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105 shadow-lg max-w-md"
      >
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 flex-shrink-0 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        <p className="text-sm font-semibold">Error - {error}</p>
      </div>
    </div>
  );

  if (!event) return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        role="alert"
        className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 px-4 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105 shadow-lg max-w-md"
      >
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 flex-shrink-0 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        <p className="text-sm font-semibold">Error - Evento no encontrado.</p>
      </div>
    </div>
  )

  return (
    <div className="flex flex-row gap-15 justify-center items-center min-screen h-169 bg-white rounded-xl dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
      <div className="border-2 border-gray-600 rounded dark:bg-gray-900 p-8 max-w-3xl text-lg">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
          }
          alt={event.name}
          className="w-full max-w-md rounded mb-6 mx-auto"
        />

        <p className="font-sans text-2xl font-bold dark:text-gray-200">{event.name}</p>

        <div className="place-items-start p-4 dark:text-gray-200">
          <p>
            <b className="font-semibold">Categoría:</b> {event.category || "Sin categoría"}
          </p>
          <p>
            <b className="font-semibold">Fecha:</b>{" "}
            {new Date(event.date).toLocaleString("es-CL")}
          </p>
          <p>
            <b className="font-semibold">Lugar:</b> {event.location || "Por confirmar"}
          </p>
          {event.description && (
            <p className="mt-4">{event.description}</p>
          )}
        </div>
      </div>

      <div className="border-2 border-gray-600 rounded dark:bg-gray-900 p-8">
        <div className="flex flex-col items-start text-left dark:text-gray-200 w-full text-lg">
          <p className="font-bold text-4xl mb-8">Seleccione sus tickets:</p>

          <div className="w-full divide-y divide-gray-600">
            <div className="py-6">
              <p className="mb-3">
                <b className="font-semibold">General:</b>{" "}
                <span className="text-black">{event.tickets.map((ticket) => (
                  <div key={ticket.type}>
                    <p>{ticket.type}</p>
                    <p>${ticket.price.toLocaleString()} — Disponibles: {ticket.available}</p>
                  </div>
                ))}</span>
              </p>
              <form className="max-w-xs mx-auto">
                <div className="relative flex items-center gap-2 scale-110">
                  <button
                    type="button"
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded h-8 w-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-gray-900 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>

                  <input
                    type="text"
                    id="counter-input"
                    data-input-counter
                    className="text-gray-900 dark:text-white border-0 bg-transparent text-lg font-normal focus:outline-none focus:ring-0 max-w-[3rem] text-center"
                    placeholder="0"
                  />

                  <button
                    type="button"
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded h-8 w-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-gray-900 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <div className="py-6">
              <p className="mb-3">
                <b className="font-semibold">VIP:</b>{" "}
              <span>acá coloquen la lógica gracias :3</span>
              </p>
              <form className="max-w-xs mx-auto">
                <div className="relative flex items-center gap-2 scale-110">
                  <button
                    type="button"
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded h-8 w-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-gray-900 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>

                  <input
                    type="text"
                    id="counter-input"
                    data-input-counter
                    className="text-gray-900 dark:text-white border-0 bg-transparent text-lg font-normal focus:outline-none focus:ring-0 max-w-[3rem] text-center"
                    placeholder="0"
                  />

                  <button
                    type="button"
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded h-8 w-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-gray-900 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <div className="pt-6">
              <p className="mb-3">
                <b className="font-semibold">Total:</b>{" "}
                <span>acá coloquen la lógica gracias :3</span>
              </p>

              <Link
                to="/event/:id/checkout/:id"
                className="mt-4 inline-block bg-sky-500 hover:bg-sky-600 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Reserva
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default EventDetail;
