import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-around p-4">
     
          <Link to="/" className="text-4xl font-bold text-green-600">Evently</Link>
         
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700  hover:text-green-600">Home</Link>
            <Link to="/Events" className="text-gray-700  hover:text-green-600">Events</Link>
          {user && (
            <Link to="/create" className="text-gray-700  hover:text-green-600">Create</Link>
          )}
          {user ? (
            <>
              <Link to="/profile" className="text-gray-700  hover:text-green-600">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700  py-3 hover:text-green-600">Login</Link>
              <Link to="/signup" className="text-gray-700  hover:text-green-600">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
