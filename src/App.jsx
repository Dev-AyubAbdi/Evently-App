import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home"
import CreateEvent  from "./Pages/CreateEvent"
import EventPage  from "./Pages/EventPage"
import AuthPage from "./Pages/Authpage"
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4 bg-white shadow flex justify-between">
        <div className="flex gap-4">
          <Link to="/" className="font-semibold text-green-600">Evently</Link>
          <Link to="/create" className="hover:underline">Create</Link>
        </div>
        <div>
          {user ? (
            <button onClick={signOut} className="text-red-500">Logout</button>
          ) : (
            <Link to="/auth" className="text-green-600">Login</Link>
          )}
        </div>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </div>
  );
}


export default App