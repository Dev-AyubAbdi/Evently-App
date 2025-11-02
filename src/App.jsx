import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/navBar"
import Footer from "./Components/Footer"
import Home from "./Pages/Home"
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NotFound from './Pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
