function Footer() {
  return (
    <footer style={{
      textAlign: "center",
      padding: "1rem",
      background: "#111",
      borderTop: "1px solid #333",
      color: "#888",
      fontSize: "0.9rem",
    }}>
      © {new Date().getFullYear()} GryeTickets — Síguenos en 
      <a href="#" style={{ color: "#646cff", textDecoration: "none", marginLeft: "6px" }}>Instagram</a>
    </footer>
  );
}

export default Footer;
