import { Link } from "react-router-dom";

// lo ideal es cambiar los valores por datos de la api, ir a consultarle la logica che
// const MOCK_PURCHASES = []; para vacio
/*
[
{
    id: "1",
    event_name: "Festival de Navidad 2025",
    event_date: "2025-12-25",
    location: "Ulagos",
    tickets: "1x VIP",
    purchased_at: "2025-12-24",
    total: 10000,
},
{
    id: "2",
    event_name: "Demo Day 2025",
    event_date: "2025-06-20",
    location: "Aula Magna(la cambiaron), Ulagos",
    tickets: "Ver a benja",
    purchased_at: "2025-11-04",
    total: 0,
},
];
para rellenar
*/
const MOCK_PURCHASES = [];
export default function Purchases() {
    const purchases = MOCK_PURCHASES;
return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
    <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-8">Mis Tickets</h1>

        {/* Estado vacío */}
        {purchases.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
            <div className="text-4xl mb-3">🎟️</div>
            <h2 className="text-xl font-semibold">sin tickets </h2>
            <p className="text-gray-400 mb-6">
            No hay Ticket comprados aun.
            </p>
            <Link
            to="/"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition"
            >
            Browse Events
            </Link>
        </div>
        )}
        {/* Lista de compras */}
        <div className="space-y-6">
        {purchases.map((p) => (
            <div
            key={p.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex justify-between items-start gap-6 hover:border-gray-700 transition"
            >
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">{p.event_name}</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                <li>📅 {format(p.event_date)}</li>
                <li>📍 {p.location}</li>
                <li>🎟️ {p.tickets}</li>
                </ul>
                <p className="text-gray-500 text-sm">
                Comprado el {format(p.purchased_at)}
                </p>
            </div>
            <div className="text-right whitespace-nowrap">
                <div className="text-2xl font-bold text-white">
                ${p.total.toFixed(2)}
                </div>
                    <button className="mt-3 text-sm px-3 py-1.5 rounded-md border border-gray-700 hover:bg-gray-800 transition">
                    Ver Tickets
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}

function format(dateStr) {
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
    });
    } catch (err) {
    return dateStr;
    }
}
