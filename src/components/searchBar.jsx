import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const SearchBar = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data : [];

        // Extraemos las categorías únicas y las normalizamos
        const unique = [
          ...new Set(
            list
              .map((e) => e.category?.trim().toLowerCase())
              .filter(Boolean)
          ),
        ];

        setCategories(unique);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setCategories([]); // fallback vacío
      }
    }

    loadCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ category: selectedCategory, query });
  };

  return (
    <form className="max-w-2xl mx-auto mt-6" onSubmit={handleSearch}>
      <div className="flex shadow rounded overflow-hidden border">
        {/* Dropdown de categorías */}
        <select
          className="bg-gray-100 text-gray-700 p-2 border-r outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 outline-none"
          placeholder="Buscar por nombre de evento..."
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
