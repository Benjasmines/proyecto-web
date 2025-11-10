import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div
      className="event-card"
      style={{
        background: "#2a2a2a",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s, box-shadow 0.2s",
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
          marginBottom: "1rem",
        }}
      />
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: "0.5rem 0", color: "#fff" }}>{event.name}</h2>
        <p style={{ margin: "0.3rem 0", color: "#ccc" }}>📍 {event.location}</p>
        <p style={{ margin: "0.3rem 0", color: "#aaa" }}>
          🗓️ {new Date(event.date).toLocaleString()}
        </p>
        <p style={{
          margin: "0.3rem 0",
          color: "#999",
          fontSize: "0.9rem"
        }}>
          🎫 {event.category}
        </p>
      </div>
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
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#535bf2")}
        onMouseOut={(e) => (e.target.style.background = "#646cff")}
      >
        Ver Detalle
      </Link>
    </div>
  );
}

export default EventCard;
