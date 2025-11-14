import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout({ onToggleTheme }) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out
        bg-white text-black 
        dark:bg-gray-900 dark:text-white">
      <Navbar onToggleTheme={onToggleTheme} />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
