import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Globe, Share2, MessageCircle, Mail } from "lucide-react";

const links = {
  Explorar: [
    { label: "Feed", href: "/feed" },
    { label: "Categorías", href: "/feed" },
    { label: "Publicaciones destacadas", href: "/feed?destacadas=true" },
    { label: "Publicar", href: "/new-listing" },
  ],
  Cuenta: [
    { label: "Mi perfil", href: "/profile/u1" },
    { label: "Mis publicaciones", href: "/my-listings" },
    { label: "Favoritos", href: "/favorites" },
    { label: "Mensajes", href: "/messages" },
  ],
  Ayuda: [
    { label: "Cómo funciona", href: "/#como-funciona" },
    { label: "Universidades verificadas", href: "/#universidades" },
    { label: "Términos de uso", href: "#" },
    { label: "Privacidad", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" animated={false} />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              El marketplace exclusivo para estudiantes universitarios
              guatemaltecos verificados.
            </p>
            {/* Redes */}
            <div className="flex gap-3 mt-4">
              {[Globe, Share2, MessageCircle, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} UMarket. Hecho con ♥ para estudiantes guatemaltecos.</p>
          <p>Solo para emails .edu verificados</p>
        </div>
      </div>
    </footer>
  );
}
