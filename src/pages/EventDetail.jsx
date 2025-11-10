import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../api/api";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await getEvents();

        // ✅ Asegurarse de acceder correctamente al array de eventos
        const list = Array.isArray(response)
          ? response
          : response?.data || [];

        console.log("📦 Eventos (array real):", list);

        // ✅ Buscar el evento usando posibles variantes de ID
        const found = list.find((ev) => {
          const possibleIds = [
            ev.id,
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

  if (loading) return <h2 style={{ color: "#fff" }}>Cargando evento...</h2>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p style={{ color: "#fff" }}>Evento no encontrado.</p>;

  return (
    <main style={{ padding: "1rem", color: "#fff" }}>
      <h1>{event.name}</h1>

      <img
        src={
          event.image ||
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
        }
        alt={event.name}
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "12px",
          marginBottom: "1rem",
        }}
      />

      <p>
        <strong>Categoría:</strong> {event.category || "Sin categoría"}
      </p>
      <p>
        <strong>Fecha:</strong>{" "}
        {new Date(event.date).toLocaleString("es-CL")}
      </p>
      <p>
        <strong>Lugar:</strong> {event.location || "Por confirmar"}
      </p>
      {event.description && (
        <p style={{ marginTop: "1rem" }}>{event.description}</p>
      )}

      <button
        style={{
          marginTop: "1.5rem",
          background: "#646cff",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => alert(`Reservaste entrada para ${event.name}`)}
      >
        Reservar Entrada
      </button>
    </main>
  );
}

export default EventDetail;
