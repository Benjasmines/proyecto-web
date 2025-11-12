import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx"
import Checkout from "./pages/Checkout";
function App() {
  const t=()=>document.documentElement.classList.toggle("dark");
  return (
    <Router>
      <Navbar onToggleTheme={t}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/checkout" element={<Checkout />} /> 
        <Route path="/purchases" element={<h2>Historial próximamente</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
