import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_public", true)
        .order("start_time", { ascending: true });

      if (!error) setEvents(data);
    }
    loadEvents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((e) => (
          <Link
            to={`/event/${e.id}`}
            key={e.id}
            className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">{e.title}</h2>
            <p className="text-gray-600">{e.location}</p>
            <p className="text-sm text-gray-400">
              {new Date(e.start_time).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
