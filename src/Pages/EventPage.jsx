import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setEvent(data);
    }
    fetchEvent();
  }, [id]);

  const handleRSVP = async () => {
    if (!user) return alert("Login first");
    const { error } = await supabase.from("rsvps").insert([
      { event_id: id, user_id: user.id, status: "going" },
    ]);
    if (error) alert("Error: " + error.message);
    else alert("You are marked as going ✅");
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-semibold text-green-600 mb-3">{event.title}</h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <div className="text-gray-500 mb-2">{event.location}</div>
      <div className="text-sm text-gray-400 mb-4">
        {new Date(event.start_time).toLocaleString()}
      </div>

      <button
        onClick={handleRSVP}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        RSVP Going
      </button>
    </div>
  );
}
