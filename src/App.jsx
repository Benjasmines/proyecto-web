import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <header style={{ marginBottom: "2rem" }}>
        <h1>🎫 Sistema de Tickets</h1>
        <nav>
          <Link to="/" style={{ margin: "0 10px" }}>
            Eventos
          </Link>
          <Link to="/purchases" style={{ margin: "0 10px" }}>
            Mis Compras
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Dejar rutas futuras como placeholders */}
        <Route path="/event/:id" element={<h2>Detalle del evento próximamente</h2>} />
        <Route path="/checkout/:id" element={<h2>Checkout próximamente</h2>} />
        <Route path="/purchases" element={<h2>Historial próximamente</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
