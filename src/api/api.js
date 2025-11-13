const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener todos los eventos, recorriendo todas las páginas
export async function getEvents() {
  const allEvents = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`${API_BASE_URL}/events?page=${page}`);
    if (!res.ok) throw new Error(`Error al obtener eventos (página ${page})`);

    const json = await res.json();

    // Algunos backends devuelven los datos dentro de 'data', otros directamente
    const events = Array.isArray(json.data)
      ? json.data
      : Array.isArray(json.events)
      ? json.events
      : [];

    allEvents.push(...events);

    if (events.length === 0 || json.next_page === null || json.page >= json.total_pages) {
      hasMore = false;
    } else {
      page++;
    }
  }

  console.log(`Eventos totales obtenidos: ${allEvents.length}`);
  return allEvents;
}

export async function createReservation(eventId, ticketType, quantity) {
  const res = await fetch(`${API_BASE_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_id: eventId, ticket_type: ticketType, quantity }),
  });
  if (!res.ok) throw new Error("Error al crear reserva");
  return res.json();
}

export async function confirmCheckout(reservationId) {
  const res = await fetch(`${API_BASE_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reservation_id: reservationId }),
  });
  if (!res.ok) throw new Error("Error en el checkout");
  return res.json();
}

export async function getPurchases() {
  const res = await fetch(`${API_BASE_URL}/purchases`);
  if (!res.ok) throw new Error("Error al obtener historial de compras");
  return res.json();
}

