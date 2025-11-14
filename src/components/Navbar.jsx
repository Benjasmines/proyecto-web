import { Link } from "react-router-dom";

export default function Navbar({ onToggleTheme }) {
  return (
    <nav className="bg-white border-b-2 border-gray-400 dark:bg-gray-900">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto px-4 py-3">
        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
          Tickets ULA
        </span>

        <div className="flex items-center space-x-6">
          <Link to="/" className="content-center justify-end">
            Eventos
          </Link>
            <div className="flex items-center space-x-6 border-l-2 border-gray-500 pl-6">
              <Link
                to="/purchases"
                className="flex items-center justify-end border-gray-500"
              >
                Mis Compras
              </Link>
            </div>

          <button
            onClick={onToggleTheme}
            className="content-center px-2 py-1 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-50 ease-in-out hover:scale-105 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:transition-all before:z-[-1] before:rounded-xl hover:before:left-0 text-gray-900 dark:text-white bg-white hover:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black dark:bg-gray-900 border hover:scale-95"
          >
            Theme
          </button>
        </div>
      </div>
    </nav>
  );
}