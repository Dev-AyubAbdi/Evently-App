import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!user) return alert("Please log in first");

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

    if (error) {
      alert("Error creating event: " + error.message);
    } else {
      reset();
      navigate("/");
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
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("is_public")} />
          <span>Make event public</span>
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
