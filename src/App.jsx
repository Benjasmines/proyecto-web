import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout.jsx";
import Purchases from "./pages/Purchases.jsx";
import EventDetail from "./pages/EventDetail";
import Navbar from "./components/Navbar.jsx"
import "./components/Layout.jsx";

function App() {
  const t=()=>document.documentElement.classList.toggle("dark");

  return (
    <Router>
      <Navbar onToggleTheme={t}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/event/:id/checkout/:id" element={<Checkout />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </Router>
  );
}

export default App;
