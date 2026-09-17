import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/analyze", label: "Analyze" },
    { href: "/history", label: "History" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="font-bold text-xl text-indigo-700">NewsGuard</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50"
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
