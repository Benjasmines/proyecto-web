import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchBar = ({ onSearch }) => {
  const [categories, setCategories] = useState(["todas"]);
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [query, setQuery] = useState("");

  // Cargar todas las categorias desde todas las paginas
  useEffect(() => {
    async function loadCategories() {
      try {
        let allEvents = [];
        let page = 1;
        let keepFetching = true;

        while (keepFetching) {
          const res = await fetch(`${API_BASE_URL}/events?page=${page}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const json = await res.json();
          const events = json.data || [];
          allEvents = allEvents.concat(events);

          // Si la pagina esta vacia o tiene menos de 20 elementos, asumimos que es la ultima
          if (events.length < 20) keepFetching = false;
          else page++;
        }

        // Extraer categorias unicas y normalizadas
        const uniqueCategories = [
          "todas",
          ...new Set(
            allEvents
              .map((e) => e.category?.trim().toLowerCase())
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setCategories(["todas"]);
      }
    }

    loadCategories();
  }, []);

  // Filtrado en tiempo real con debounce (300 ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onSearch) onSearch({ category: selectedCategory, query });
    }, 300);
    return () => clearTimeout(timeout);
  }, [selectedCategory, query]);

  // Boton Buscar
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ category: selectedCategory, query });
  };

  return (
    <form className="w-120 flex justify-center mt-6" onSubmit={handleSearchClick}>
      <div className="flex w-full max-w-6xl shadow rounded overflow-hidden border">
        {/* Dropdown de categorías */}
        <select
          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-2 border-r outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "todas"
                ? "Todas las categorías"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-0 p-2 outline-none bg-white text-gray-800 dark:text-gray-100 dark:bg-gray-900"
          placeholder="Buscar nombre del evento..."
        />

        <button
          type="submit"
          className="bg-sky-500 text-white px-4 hover:bg-sky-600 transition"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
