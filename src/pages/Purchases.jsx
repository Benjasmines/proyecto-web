import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Purchases() {
  const { id } = useParams(); // purchase_id
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPurchase() {
      if (!id) return;

      try {
        const res = await fetch(`${API_BASE_URL}/purchases/${id}`);
        console.log("Fetch response status:", res.status);
        const data = await res.json();
        console.log("Fetch data:", data);
        setPurchase(data);
      } catch (err) {
        console.error("Error fetch purchase:", err);
        setPurchase(null);
      } finally {
        setLoading(false);
      }
    }

    loadPurchase();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-300 mt-20">Cargando compra...</p>;

  if (!purchase)
    return (
      <div className="dark:bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
        <h2 className="text-xl font-semibold">Sin tickets</h2>
        <p className="dark:text-gray-400 mb-6">No se encontró la compra.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition"
        >
          Buscar eventos
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Mi Compra</h1>

        <div className="dark:bg-gray-900 border border-gray-800 rounded-xl p-6 flex justify-between items-start gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{purchase.event_name}</h3>

            <ul className="dark:text-gray-300 text-sm space-y-2">
              <li>Día: {formatDate(purchase.event_date)}</li>
              <li>Ubicación: {purchase.location}</li>
              <li>
                Tickets:
                <ul className="dark:text-gray-300 text-sm mt-1">
                  {purchase.items.map((it, idx) => (
                    <li key={idx}>
                      {it.quantity} × {it.type}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <p className="dark:text-gray-500 text-sm mt-2">
              Comprado el {formatDate(purchase.purchased_at)}
            </p>
          </div>

          <div className="text-right whitespace-nowrap">
            <div className="text-2xl font-bold dark:text-white">
              ${purchase.total_price.toLocaleString("es-CL")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("es-CL", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
