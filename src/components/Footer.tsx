import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-black/[0.06]">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-heading font-bold tracking-tight mb-4">
              ORI<span className="text-accent">KAWA</span>
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Specialist scaling chiller & chemical cleaning untuk sistem HVAC industri di seluruh Indonesia.
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "LinkedIn", "WhatsApp"].map((name) => (
                <span
                  key={name}
                  className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center text-text-muted text-xs hover:bg-surface-3 hover:text-accent transition-colors cursor-pointer"
                >
                  {name[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-text-muted mb-5 font-medium">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Beranda" },
                { href: "/services", label: "Layanan" },
                { href: "/products", label: "Produk" },
                { href: "/projects", label: "Project" },
                { href: "/about", label: "Tentang" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-text-muted mb-5 font-medium">
              Layanan
            </h4>
            <ul className="space-y-3">
              {["Scaling Chiller", "Cleaning Cooling Tower", "Chemical Cleaning AC & AHU", "Descaling Pipa Industri"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/services"
                      className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-text-muted mb-5 font-medium">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">→</span>
                Jakarta, Indonesia
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">→</span>
                info@orikawa.id
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">→</span>
                +62 812-xxxx-xxxx
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-black/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} Orikawa Indonesia. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Scaling Chiller · Cleaning · Chemical
          </p>
        </div>
      </div>
    </footer>
  );
}
