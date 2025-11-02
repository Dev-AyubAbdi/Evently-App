import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
