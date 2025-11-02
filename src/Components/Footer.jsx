export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} <span className="text-green-600 font-medium">Evently</span> — All Rights Reserved.
      </p>
    </footer>
  );
}
