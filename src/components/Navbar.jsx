import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "#222",
      borderBottom: "1px solid #333",
    }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bold" }}>
        🎟️ GryeTickets
      </Link>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>Eventos</Link>
        <Link to="/purchases" style={{ color: "#ccc", textDecoration: "none" }}>Mis Compras</Link>
      </div>
    </nav>
  );
}

export default Navbar;
