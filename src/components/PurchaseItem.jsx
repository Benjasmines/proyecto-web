export default function PurchaseItem({ purchase }) {
  return (
    <div style={styles.item}>
      <h3>{purchase.event_name}</h3>
      <p>Tipo de ticket: {purchase.ticket_type}</p>
      <p>Cantidad: {purchase.quantity}</p>
      <p>Total: ${purchase.total}</p>
      <p>Fecha: {new Date(purchase.date).toLocaleString()}</p>
    </div>
  );
}

const styles = {
  item: {
    padding: "15px",
    borderRadius: "8px",
    background: "#fafafa",
    marginBottom: "12px",
    border: "1px solid #ddd",
  },
};
