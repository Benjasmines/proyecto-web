import { useState } from "react";

export default function TicketSelector({ ticketTypes, onSelect }) {
  const [ticketType, setTicketType] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    onSelect(ticketType, quantity);
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <label>Tipo de Ticket</label>
      <select
        value={ticketType}
        onChange={(e) => setTicketType(e.target.value)}
        required
      >
        <option value="">Selecciona...</option>
        {ticketTypes?.map((t) => (
          <option key={t.type} value={t.type}>
            {t.type} - ${t.price}
          </option>
        ))}
      </select>

      <label>Cantidad</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />

      <button style={styles.button}>Reservar</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    background: "#00aa55",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
