import { Link } from "react-router-dom";

export default function Navbar({ onToggleTheme }) {
  return (
    <nav className="bg-white border-b-2 border-gray-400 dark:bg-gray-900">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          Sistema de Tickets
        </span>

        <div className="flex items-center space-x-6">
          <Link to="/" className="content-center justify-end">
            Eventos
          </Link>
          <Link to="/purchases" className="flex items-center justify-end p-3 block h-4 border-l-2 border-gray-500 mr-3">
            Mis Compras
          </Link>
          <button
            onClick={onToggleTheme}
            className="content-center px-2 py-1 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-50 ease-in-out hover:scale-105 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:transition-all before:z-[-1] before:rounded-xl hover:before:left-0 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border hover:scale-95"
          >
            Theme
          </button>
        </div>
      </div>
    </nav>
  );
}