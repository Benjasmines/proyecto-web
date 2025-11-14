import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvents, createReservation } from "../api/api";
import { Link } from "react-router-dom";

function EventDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [qtyByType, setQtyByType] = useState({});

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await getEvents();
        const list = Array.isArray(response)
          ? response
          : response?.data || [];

        console.log("Eventos :", list);

        const found = list.find((ev) => {
          const ids = [
            ev._id,
            ev._id?.$oid,
            ev._id?.toString?.(),
            ev.id,
            ev.uuid,
            ev.event_id,
          ];
          return ids.map(String).includes(String(id));
        });

        if (!found) throw new Error("Evento no encontrado");

        setEvent(found);

        const init = {};
        (found.tickets || []).forEach((t) => (init[t.type] = 0));
        setQtyByType(init);

      } catch (err) {
        console.error("Error al cargar evento:", err);
        setError(err.message || "No se pudo cargar el evento.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  const setQty = (type, next) => {
    const ticket = event.tickets.find((t) => t.type === type);
    const max = Math.min(110, ticket.available ?? 0);
    const val = Math.max(0, Math.min(max, Number(next) || 0));
    setQtyByType((prev) => ({ ...prev, [type]: val }));
  };

  const inc = (type) => setQty(type, (qtyByType[type] || 0) + 1);
  const dec = (type) => setQty(type, (qtyByType[type] || 0) - 1);

  const totalCLP = useMemo(() => {
    if (!event?.tickets) return 0;
    return event.tickets.reduce(
      (acc, t) => acc + (qtyByType[t.type] || 0) * (t.price || 0),
      0
    );
  }, [qtyByType, event]);

  const totalItems = useMemo(
    () => Object.values(qtyByType).reduce((a, b) => a + (b || 0), 0),
    [qtyByType]
  );

  // 🚀 RESERVAR
  const reservar = async () => {
    const items = Object.entries(qtyByType)
      .filter(([, q]) => q > 0)
      .map(([type, quantity]) => ({ type, quantity }));

    if (items.length === 0) {
      alert("Selecciona al menos 1 entrada.");
      return;
    }

    try {
      // 👉 nueva forma correcta: createReservation(eventId, items)
      const res = await createReservation(event._id, items);

      const reservationId =
        res?.reservation_id ||
        res?.id ||
        res?._id ||
        Object.values(res)[0];

      nav(`/checkout/${reservationId}`);
    } catch (e) {
      alert(e.message || "No se pudo crear la reserva");
    }
  };

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
    <div
      className="flex flex-row gap-10 justify-center items-stretch
        bg-white dark:bg-gray-800 p-6 rounded-xl 
        shadow-lg dark:shadow-none w-full max-w-6xl mx-auto"
    >
      {/* LADO IZQUIERDO */}
      <div className="border-2 border-gray-600 rounded dark:bg-gray-900 p-8 w-1/2 flex flex-col">
        <img
          src={
            event.image ||
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
          }   
          alt={event.name}
          className="w-full rounded mb-6"
        />

        <p className="font-sans text-2xl font-bold dark:text-gray-200">
          {event.name}
        </p>

        <div className="mt-4 space-y-3 dark:text-gray-200">
        {/* Categoría */}
          <p className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <b className="font-semibold">Categoría:</b> {event.category || 'Sin categoría'}
          </p>

        {/* Fecha */}
        <p className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 2m6-6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0H3m5-4v4m8-4v4"
            />
          </svg>
          
          <b>Fecha:</b>{" "}
            {new Date(event.date).toLocaleString("es-CL")}
        </p>

        {/* Lugar */}
        <p className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11a3 3 0 100-6 3 3 0 000 6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 10c0 7-7 12-7 12s-7-5-7-12a7 7 0 1114 0z"
            />
          </svg>

          <b className="font-semibold">Lugar:</b> {event.location || 'Por confirmar'}
          {event.description && <p className="mt-4">{event.description}</p>}
        </p>
      </div>
    </div>

    {/* LADO DERECHO */}
    <div className="border-2 border-gray-600 rounded dark:bg-gray-900 p-8 w-1/2 flex flex-col">
      <div className="flex flex-col items-start text-left dark:text-gray-200 w-full">
        <p className="font-bold text-4xl mb-8">Seleccione sus tickets:</p>

        <div className="w-full divide-y divide-gray-600 flex-1">
          
          <div className="divide-y divide-gray-600">
          {event.tickets.map((t) => {
            const q = qtyByType[t.type] || 0;
            const max = Math.min(110, t.available);

            return (
              <div key={t.type} className="py-6 dark:text-gray-200">
                <p className="font-semibold text-lg">{t.type}</p>
                <p className="mb-3">
                  ${t.price.toLocaleString()} — Disponibles: {t.available}
                </p>

                {/* Selector cantidad */}
                <div className="relative flex items-center justify-center gap-2 scale-110">
                  <button
                    type="button"
                    onClick={() => dec(t.type)}
                    disabled={q <= 0}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 h-8 w-8 rounded flex justify-center items-center"
                  >
                    -
                  </button>

                  <input
                    type="text"
                    className="w-10 text-center bg-transparent border-0 text-lg dark:text-white"
                    value={q}
                    onChange={(e) =>
                      setQty(t.type, parseInt(e.target.value || "0", 10))
                    }
                  />

                  <button
                    type="button"
                    onClick={() => inc(t.type)}
                    disabled={q >= max}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 h-8 w-8 rounded flex justify-center items-center"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}

          {/* TOTAL */}
          <div className="pt-6 dark:text-gray-200">
            <p className="text-xl font-semibold">
              Total: ${totalCLP.toLocaleString("es-CL")}
            </p>

            <button
              onClick={reservar}
              disabled={totalItems === 0}
              className="mt-4 w-full bg-sky-500 hover:bg-sky-600 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Reservar
            </button>
          </div>

        </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default EventDetail;
