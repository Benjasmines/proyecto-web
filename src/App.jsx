import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout.jsx";
import Purchases from "./pages/Purchases.jsx";
import EventDetail from "./pages/EventDetail";
import Layout from "./components/Layout";
import "./components/Layout.jsx";

function App() {
  const t=()=>document.documentElement.classList.toggle("dark");

  return (
    <Router>
      <Routes>

        <Route element={<Layout onToggleTheme={t} />}>
          <Route path="/" element={<Home />} />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/checkout/:reservationId" element={<Checkout />} />
          <Route path="/purchases/:id" element={<Purchases />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
