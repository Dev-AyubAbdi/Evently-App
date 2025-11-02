import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function EventDetail() {
  const { id } = useParams(); // hel event id-da URL-ka
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Event data soo saarid
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.log("Error loading event:", error);
      else setEvent(data);
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) alert("Failed to delete event");
    else {
      alert("Event deleted successfully!");
      navigate("/");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading event details...</p>
      </div>
    );

  if (!event)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Event not found.</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          {event.title}
        </h1>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <div className="text-sm text-gray-600 mb-4">
          📍 <span className="font-medium">{event.location}</span> <br />
          🗓️ {new Date(event.date).toLocaleDateString()}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(`/create?id=${id}`)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
        {/* add image  */}
        
      </div>
    </div>
  );
}
