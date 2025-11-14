const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getEvents() {
  const res = await fetch(`${API_BASE_URL}/events`);
  if (!res.ok) throw new Error("Error al obtener eventos");
  return res.json();
}

export async function createReservation(eventId, items) {
  const res = await fetch(`${API_BASE_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id: eventId,
      items: items
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error(JSON.stringify(data, null, 2));
    throw new Error("Error al crear reserva");
  }

  return data;
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