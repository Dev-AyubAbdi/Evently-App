import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded-lg focus:outline-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded-lg focus:outline-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Sign In
        </button>
        <p className="text-center text-sm mt-3">
          No account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 cursor-pointer font-medium"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
