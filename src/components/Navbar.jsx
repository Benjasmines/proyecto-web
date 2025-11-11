import { Link } from "react-router-dom";

export default function Navbar({onToggleTheme}){
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">Sistema de Tickets</span>
        <Link to="/" className="content-center">Eventos</Link>
        <Link to="/purchases" className="content-center">Mis Compras</Link>

        <button onClick={onToggleTheme} className="px-2 py-1 rounded border">Theme</button>
      </div>
    </nav>
  );
}