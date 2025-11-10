import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="app-container" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#1a1a1a",
      color: "#fff",
    }}>
      <Navbar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
