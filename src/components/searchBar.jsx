const API_CATEGORY = import.meta.env.VITE_API_BASE_URL
import { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");

  // 🔹 Cargar categorías desde tu API
  useEffect(() => {
    fetch("API_CATEGORY")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error al obtener categorías:", err));
  }, []);

  // 🔹 Ejecutar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ category: selectedCategory, query });
    }
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
          {categories.map((ev) => (
            <option key={ev.category} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Input de búsqueda */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 outline-none"
          placeholder="Buscar por nombre de evento..."
        />

        {/* Botón de búsqueda */}
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
