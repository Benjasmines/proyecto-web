import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="flex flex-col gap-15 bg-gray-800 rounded-xl border-2 border-gray-900 shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">{event.name}</h2>
          <p className="text-xl text-gray-400 text-sm mb-1">📍 {event.location}</p>
          <p className="text-xl text-gray-500 text-sm mb-1">
            🗓️ {new Date(event.date).toLocaleString()}
          </p>
          <p className="text-xl text-gray-500 text-sm">🎫 {event.category}</p>
        </div>
        <Link
          to={`/event/${event._id}`}
          className="mt-4 inline-block bg-sky-500 hover:bg-sky-600 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Ver Detalle
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
