import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <Link to={`/event/${event._id}`}>
      <div className="flex flex-col gap-1 bg-gray-800 rounded border-2 border-gray-900 shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-48 object-cover"
        />

        <div className="p-4 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-white mb-2">
            {event.name}
          </h2>

          {/* Ubicación */}
          <p className="text-gray-200 text-sm flex items-center gap-2 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11a3 3 0 100-6 3 3 0 000 6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 10c0 7-7 12-7 12s-7-5-7-12a7 7 0 1114 0z"
              />
            </svg>
            {event.location}
          </p>

          {/* Fecha */}
          <p className="text-gray-200 text-sm flex items-center gap-2 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 2m6-6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0H3m5-4v4m8-4v4"
              />
            </svg>
            {new Date(event.date).toLocaleString()}
          </p>

          {/* Categoría */}
          <p className="text-gray-200 text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {event.category}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
