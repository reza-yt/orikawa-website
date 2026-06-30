import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-heading font-bold tracking-tight mb-3">
              ORI<span className="text-accent">KAWA</span>
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Specialist scaling chiller & chemical cleaning untuk sistem HVAC industri di seluruh Indonesia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-text-muted mb-4 font-medium">
              Navigasi
            </h4>
            <ul className="space-y-2.5">
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
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-text-muted mb-4 font-medium">
              Layanan
            </h4>
            <ul className="space-y-2.5">
              {["Scaling Chiller", "Cleaning Cooling Tower", "Chemical Cleaning", "Descaling Pipa"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/services"
                      className="text-text-secondary text-sm hover:text-text-primary transition-colors"
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
            <h4 className="text-xs tracking-[0.15em] uppercase text-text-muted mb-4 font-medium">
              Kontak
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>Jakarta, Indonesia</li>
              <li>info@orikawa.id</li>
              <li>+62 812-xxxx-xxxx</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3">
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
