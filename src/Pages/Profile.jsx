import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUserEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("owner", user.id)
        .order("start_time", { ascending: true });

      if (error) console.log("Error fetching events:", error);
      else setEvents(data);
      setLoading(false);
    };

    fetchUserEvents();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please login first.</p>;
  if (loading) return <p className="text-center mt-10">Loading your events...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-green-600 mb-2">Profile</h1>
        <p className="text-gray-700">Email: {user.email}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Your Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-500">You haven't created any events yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((e) => (
              <div
                key={e.id}
                className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{e.title}</h3>
                <p className="text-gray-600">{e.location}</p>
                <p className="text-sm text-gray-400">
                  {new Date(e.start_time).toLocaleString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <Link
                    to={`/event/${e.id}`}
                    className="text-green-600 hover:underline text-sm"
                  >
                    View
                  </Link>
                  <Link
                    to={`/create?id=${e.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
