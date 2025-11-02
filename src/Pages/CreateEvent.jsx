import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateEvent() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!user) return alert("Please log in first");

    setLoading(true);

    try {
      // 🟢 Insert event data into Supabase table (NO image)
      const { error } = await supabase.from("events").insert([
        {
          owner: user.id,
          title: data.title,
          description: data.description,
          location: data.location,
          start_time: data.start_time,
          end_time: data.end_time,
          capacity: data.capacity ? parseInt(data.capacity) : null,
          is_public: data.is_public || false,
        },
      ]);

      if (error) throw error;

      reset();
      navigate("/");
    } catch (err) {
      alert("Error creating event: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-4 text-center text-green-600">
        Create a New Event
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("title")}
          placeholder="Event Title"
          required
          className="w-full border p-2 rounded-md"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2 rounded-md"
        />
        <input
          {...register("location")}
          placeholder="Location"
          className="w-full border p-2 rounded-md"
        />
        <input
          type="datetime-local"
          {...register("start_time")}
          className="w-full border p-2 rounded-md"
        />
        <input
          type="datetime-local"
          {...register("end_time")}
          className="w-full border p-2 rounded-md"
        />
        <input
          type="number"
          {...register("capacity")}
          placeholder="Capacity (optional)"
          className="w-full border p-2 rounded-md"
        />

        {/* ❌ Sawirka waa laga reebay */}

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("is_public")} />
          <span>Make event public</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-2 rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
